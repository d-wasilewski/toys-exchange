import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminPermissionGuard } from 'src/shared/guards/permission.guard';
import { RegisterUserDto, UserDto, UserIdDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signupUser(@Body() userData: RegisterUserDto): Promise<UserDto> {
    return this.userService.register(userData);
  }

  @UseGuards(AdminPermissionGuard)
  @Post('users')
  async getUsers(): Promise<UserDto[]> {
    return this.userService.getUsers();
  }

  @Post('user')
  async getUserById(@Body() data: UserIdDto): Promise<UserDto> {
    return this.userService.getUserById(data.id);
  }

  @UseGuards(AdminPermissionGuard)
  @Post('block')
  async blockClient(@Body() data: UserIdDto): Promise<any> {
    return this.userService.changeUserStatus(data.id, 'BLOCKED');
  }

  @UseGuards(AdminPermissionGuard)
  @Post('activate')
  async activateClient(@Body() data: UserIdDto): Promise<any> {
    return this.userService.changeUserStatus(data.id, 'ACTIVE');
  }
}
