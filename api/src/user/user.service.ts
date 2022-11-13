import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dtos/user.dto';
import { UserStatus } from '@prisma/client';

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
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(username: string) {
    return this.prisma.user.findFirst({
      where: {
        name: username,
      },
    });
  }

  async getUserById(userId: number) {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        toys: true,
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      include: {
        toys: true,
        offersReceived: true,
        offersSend: true,
      },
    });
  }

  async changeUserStatus(userId: number, status: UserStatus) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: status,
    });
  }
}
