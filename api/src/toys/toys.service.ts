import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToyDto, EditToyDto } from './dtos/toys.dto';
import { v2 } from 'cloudinary';
import { UserService } from 'src/user/user.service';
import { ToyStatus } from '@prisma/client';

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

  async changeToyStatus(toyId: string, status: ToyStatus) {
    await this.prisma.toy.update({
      where: { id: toyId },
      data: { status },
    });
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

  async getToy(toyId: string) {
    return await this.prisma.toy.findFirst({
      where: {
        id: toyId,
      },
      include: {
        owner: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async editToy(toyData: EditToyDto) {
    await this.prisma.toy.update({
      where: {
        id: toyData.id,
      },
      data: {
        ...toyData,
      },
    });
  }

  async getToysByUserId(ownerId: string) {
    const toys = await this.prisma.toy.findMany({
      where: {
        ownerId,
      },
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
}
