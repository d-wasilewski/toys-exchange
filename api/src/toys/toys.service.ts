import {
  BadRequestException,
  ConsoleLogger,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToyDto, OwnerIdDto } from './dtos/toys.dto';
import { v2 } from 'cloudinary';
import { UserService } from 'src/user/user.service';

export interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Injectable()
export class ToysService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createToy(imgFile: File[], toyData: CreateToyDto) {
    const fileBase64 = imgFile[0].buffer.toString('base64');

    const uploadResponse = await v2.uploader.upload(
      'data:image/jpeg;base64,' + fileBase64,
      {
        folder: 'toys',
      },
    );

    if (!uploadResponse.url) {
      throw new BadRequestException("The file couldn't be uploaded");
    }

    try {
      const createdToy = await this.prisma.toy.create({
        data: { ...toyData, imgUrl: uploadResponse.url },
      });
      return createdToy;
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async getToys() {
    const toys = await this.prisma.toy.findMany({
      include: {
        owner: {
          select: {
            name: true,
            imgUrl: true,
          },
        },
      },
    });

    const toysWithUsersRatings = await Promise.all(
      toys.map(async (toy) => {
        const userRating = await this.userService.getUserRating(toy.ownerId);

        return {
          ...toy,
          owner: {
            ...toy.owner,
            rating: {
              value: userRating._avg.value,
              count: userRating._count.value,
            },
          },
        };
      }),
    );

    return toysWithUsersRatings;
  }

  async getToysByUserId(ownerId: string) {
    return this.prisma.toy.findMany({
      where: {
        ownerId,
      },
    });
  }
}
