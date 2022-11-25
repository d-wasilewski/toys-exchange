import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToyDto } from './dtos/toys.dto';
import { v2 } from 'cloudinary';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Injectable()
export class ToysService {
  constructor(private prisma: PrismaService) {}

  async createToy(imgFile: File[], toyData: CreateToyDto) {
    const fileBase64 = imgFile[0].buffer.toString('base64');

    const uploadResponse = await v2.uploader.upload(
      'data:image/jpeg;base64,' + fileBase64,
      {
        folder: 'toys',
      },
    );

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
    return this.prisma.toy.findMany({
      include: {
        owner: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getToysByUserId(ownerId: string) {
    return this.prisma.toy.findMany({
      where: {
        ownerId,
      },
    });
  }
}
