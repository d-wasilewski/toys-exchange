import {
  Body,
  Controller,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Language, User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { encodeETag } from 'src/shared/encodeETag';
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
  async getUserById(@Body() data: UserIdDto, @Res() res): Promise<UserDto> {
    const user = await this.userService.getUserById(data.id);
    const tag = encodeETag(user.version, user.id);

    return res
      .set({
        ETag: tag,
        'Access-Control-Expose-Headers': 'ETag',
      })
      .json(user);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('image/:userId')
  async changeUserImage(
    @UploadedFile() file: File,
    @Param() param: { userId: string },
  ) {
    return this.userService.changeUserImage(file, param.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('rate')
  async rateUser(@Body() payload: RateUserDto) {
    return this.userService.rateUser(payload);
  }

  @Post('/editByAdmin')
  async editUserById(
    @Body() data: UpdateUserDto,
    @Headers('If-Match') ifMatch,
  ): Promise<BasicUserDto> {
    return this.userService.adminEditUserById(data, ifMatch);
  }

  @Post('/edit')
  async editUserByID(
    @Body() data: UpdateUserSelfDto,
    @Headers('If-Match') ifMatch,
  ): Promise<UserDto> {
    return this.userService.editUserById(data, ifMatch);
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

  @Post('/changeLanguage')
  async changeLanguage(
    @Body() data: { id: User['id']; lang: Language },
  ): Promise<UserDto> {
    return this.userService.changeLanguage(data.id, data.lang);
  }
}
