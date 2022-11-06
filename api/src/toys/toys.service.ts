import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Toy } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateToyDto } from './dtos/toys.dto';

@Injectable()
export class ToysService {
  constructor(private prisma: PrismaService) {}

  async createToy(toyData: CreateToyDto) {
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

  async getToysByUserId(ownerId: number) {
    return this.prisma.toy.findMany({
      where: {
        ownerId,
      },
    });
  }
}
