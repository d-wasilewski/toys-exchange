import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { ToysService } from './toys.service';

@Module({
  imports: [PrismaModule],
  providers: [ToysService, PrismaService, UserService, JwtService],
})
export class ToysModule {}
