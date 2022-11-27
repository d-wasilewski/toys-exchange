import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserSelfDto,
} from './dtos/user.dto';
import { UserStatus } from '@prisma/client';
import { File } from 'src/toys/toys.service';
import { v2 } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async register(data: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        include: {
          toys: true,
        },
      });

      return createdUser;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
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

  async editUserById(userData: UpdateUserSelfDto) {
    try {
      return this.prisma.user.update({
        where: {
          id: userData.id,
        },
        data: {
          ...userData,
        },
        include: {
          toys: true,
        },
      });
    } catch (e) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async adminEditUserById(userData: UpdateUserDto) {
    try {
      return this.prisma.user.update({
        where: {
          id: userData.id,
        },
        data: {
          ...userData,
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
      data: { status },
    });
  }

  async rateUser(rating: number, userId: string) {
    await this.prisma.rating.create({
      data: {
        userId,
        value: rating,
      },
    });
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
    return rating;
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
      },
    });
  }
}
