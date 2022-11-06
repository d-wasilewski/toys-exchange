import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDto, UserDto, UserIdDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signupUser(@Body() userData: RegisterUserDto): Promise<UserDto> {
    return this.userService.register(userData);
  }

  @Post('users')
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Post('/user')
  async getUserById(@Body() payload: UserIdDto): Promise<UserDto> {
    return this.userService.getUserById(payload.id);
  }
}
