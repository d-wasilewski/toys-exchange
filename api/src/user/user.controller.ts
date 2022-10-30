import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signupUser(@Body() userData: User): Promise<User> {
    return this.userService.register(userData);
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
}
