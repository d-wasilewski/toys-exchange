import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, PrismaService, AuthService, JwtService],
})
export class AppModule {}
