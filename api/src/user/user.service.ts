import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  RateUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserSelfDto,
} from './dtos/user.dto';
import { Language, UserStatus } from '@prisma/client';
import { File } from 'src/toys/toys.service';
import { v2 } from 'cloudinary';
import { round } from 'lodash';
import { encodeETag } from 'src/shared/encodeETag';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        return await this.prisma.$transaction(async (tx) => {
          const createdUser = await tx.user.create({
            data: {
              ...data,
              password: hashedPassword,
            },
            include: {
              toys: true,
            },
          });

          if (!createdUser)
            throw new NotFoundException('Error while creating user');

          const payload = { username: createdUser.email, sub: createdUser.id };

          const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
          });

          try {
            await this.mailService.sendUserConfirmation(createdUser, token);
          } catch (e) {
            throw e;
          }

          return createdUser;
        });
      } catch (error) {
        if (error.code === 'P2034') {
          retries++;
          continue;
        }
        throw error;
      }
    }
  }

  async changePassword(email: string, newPassword: string) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (!email) throw new BadRequestException('No email provided');

    try {
      await this.prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
        },
      });
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getUserById(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        toys: true,
      },
    });

    const userRating = await this.getUserRating(userId);

    return {
      ...user,
      rating: {
        value: userRating._avg.value,
        count: userRating._count.value,
      },
    };
  }

  async editUserById(userData: UpdateUserSelfDto, ifMatch: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userData.id,
      },
    });

    const currentEtag = encodeETag(user.version, user.id);

    if (currentEtag !== ifMatch) {
      throw new ConflictException(
        'The data is expired. Please refresh the page',
      );
    }

    try {
      const user = await this.prisma.user.update({
        where: {
          id: userData.id,
        },
        data: {
          ...userData,
          version: {
            increment: 1,
          },
        },
        include: {
          toys: true,
        },
      });

      const userRating = await this.getUserRating(user.id);

      return {
        ...user,
        rating: {
          value: userRating._avg.value,
          count: userRating._count.value,
        },
      };
    } catch (e) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async adminEditUserById(userData: UpdateUserDto, ifMatch: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userData.id,
      },
    });

    const currentEtag = encodeETag(user.version, user.id);

    if (currentEtag !== ifMatch) {
      throw new ConflictException(
        'The data is expired. Please refresh the page',
      );
    }

    try {
      return this.prisma.user.update({
        where: {
          id: userData.id,
        },
        data: {
          ...userData,
          version: {
            increment: 1,
          },
        },
        include: {
          toys: true,
        },
      });
    } catch (e) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        toys: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    const usersWithRatings = await Promise.all(
      users.map(async (user) => {
        const userRating = await this.getUserRating(user.id);

        return {
          ...user,
          rating: {
            value: userRating._avg.value,
            count: userRating._count.value,
          },
        };
      }),
    );

    return usersWithRatings;
  }

  async changeUserStatus(userId: string, status: UserStatus) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { status, version: { increment: 1 } },
    });
  }

  async rateUser({ value, userId, offerId, sentBy }: RateUserDto) {
    if (value === 0) {
      throw new BadRequestException('Value has to be greater than 0');
    }
    if (sentBy === 'receiver') {
      await this.prisma.rating.create({
        data: {
          userId,
          value,
          receiverOfferId: offerId,
        },
      });
    } else if (sentBy === 'sender') {
      await this.prisma.rating.create({
        data: {
          userId,
          value,
          senderOfferId: offerId,
        },
      });
    }
  }

  async getUserRating(userId: string) {
    const rating = await this.prisma.rating.aggregate({
      _avg: {
        value: true,
      },
      _count: {
        value: true,
      },
      where: {
        userId,
      },
    });

    return {
      ...rating,
      _avg: {
        ...rating._avg,
        value: round(rating._avg.value, 2),
      },
    };
  }

  async changeUserImage(image: File, userId: string) {
    const fileBase64 = image.buffer.toString('base64');

    const uploadResponse = await v2.uploader.upload(
      'data:image/jpeg;base64,' + fileBase64,
      {
        folder: 'users',
      },
    );

    if (!uploadResponse.url) {
      throw new BadRequestException("The file couldn't be uploaded");
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        imgUrl: uploadResponse.url,
        version: {
          increment: 1,
        },
      },
    });
  }

  async confirmUserAccount(email: string) {
    try {
      await this.prisma.user.update({
        where: {
          email,
        },
        data: {
          confirmed: true,
        },
      });
    } catch (e) {
      throw new Error('Something went wrong');
    }
  }

  async changeLanguage(id: string, language: Language) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          language,
        },
        include: {
          toys: true,
        },
      });

      const userRating = await this.getUserRating(user.id);

      return {
        ...user,
        rating: {
          value: userRating._avg.value,
          count: userRating._count.value,
        },
      };
    } catch (e) {
      throw new Error('Something went wrong');
    }
  }
}
