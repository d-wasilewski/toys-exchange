import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToyDto, EditToyDto } from './dtos/toys.dto';
import { v2 } from 'cloudinary';
import { UserService } from 'src/user/user.service';
import { ToyStatus } from '@prisma/client';
import { encodeETag } from 'src/shared/encodeETag';

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

  async changeToyStatus(toyId: string, status: ToyStatus, ifMatch: string) {
    const toy = await this.prisma.toy.findFirst({
      where: { id: toyId },
    });

    if (!toy) {
      throw new NotFoundException('Toy not found. Please refresh the page');
    }

    const currentEtag = encodeETag(toy.version, toy.id);

    if (currentEtag !== ifMatch) {
      throw new ConflictException(
        'The data is expired. Please refresh the page',
      );
    }

    await this.prisma.toy.update({
      where: { id: toyId },
      data: { status, version: { increment: 1 } },
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

  async editToy(toyData: EditToyDto, ifMatch: string) {
    const toy = await this.prisma.toy.findFirst({
      where: { id: toyData.id },
    });

    if (!toy) {
      throw new NotFoundException('Toy not found. Please refresh the page');
    }

    const currentEtag = encodeETag(toy.version, toy.id);

    if (currentEtag !== ifMatch) {
      throw new ConflictException(
        'The data is expired. Please refresh the page',
      );
    }

    await this.prisma.toy.update({
      where: {
        id: toyData.id,
      },
      data: {
        ...toyData,
        version: {
          increment: 1,
        },
      },
    });
  }

  async deleteToy(toyId: string) {
    const toy = await this.prisma.toy.findFirst({
      where: { id: toyId },
    });

    if (!toy) {
      throw new ConflictException(
        'The data is expired. Please refresh the page',
      );
    }

    await this.prisma.toy.delete({
      where: {
        id: toyId,
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
