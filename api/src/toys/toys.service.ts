import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Toy } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ToysService {
  constructor(private prisma: PrismaService) {}

  async createToy(toyData: Toy) {
    try {
      const createdToy = await this.prisma.toy.create({
        data: toyData,
      });
      return createdToy;
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getToys() {
    return this.prisma.toy.findMany({});
  }
}
