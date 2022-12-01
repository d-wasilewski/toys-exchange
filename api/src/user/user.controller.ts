import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminPermissionGuard } from 'src/shared/guards/permission.guard';
import { File } from 'src/toys/toys.service';
import {
  BasicUserDto,
  RateUserDto,
  RegisterUserDto,
  UpdateUserDto,
  UpdateUserSelfDto,
  UserDto,
  UserIdDto,
} from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signupUser(@Body() userData: RegisterUserDto): Promise<BasicUserDto> {
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

  @UseInterceptors(FileInterceptor('file'))
  @Post('image/:userId')
  async changeUserImage(
    @UploadedFile() file: File,
    @Param() param: { userId: string },
  ) {
    return this.userService.changeUserImage(file, param.userId);
  }

  @Post('rate')
  async rateUser(@Body() payload: RateUserDto) {
    return this.userService.rateUser(payload);
  }

  @Post('/editByAdmin')
  async editUserById(@Body() data: UpdateUserDto): Promise<BasicUserDto> {
    return this.userService.adminEditUserById(data);
  }

  @Post('/edit')
  async editUserByID(@Body() data: UpdateUserSelfDto): Promise<BasicUserDto> {
    return this.userService.editUserById(data);
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
