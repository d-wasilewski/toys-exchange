import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signupUser(@Body() userData: UserDto): Promise<UserDto> {
    return this.userService.register(userData);
  }

  @Get('users')
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }
}
