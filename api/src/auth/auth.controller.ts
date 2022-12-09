import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AccessTokenDto, UserLoginDto, UserPayloadDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ description: '', type: UserLoginDto })
  @Post('login')
  async login(@Request() req: { user: User }): Promise<AccessTokenDto> {
    return this.authService.login(req.user);
  }

  @Post('confirmAccount')
  async confirmAccount(@Query('token') token: string) {
    return this.authService.confirmUser(token);
  }

  @Post('/sendResetPasswordLink')
  async resetPasswordLink(@Body() payload: { email: string }) {
    return this.authService.sendResetPasswordLink(payload.email);
  }

  @Post('/resetPassword')
  async resetPassword(
    @Query('token') token: string,
    @Body() payload: { newPassword: string },
  ) {
    return this.authService.resetPassword(token, payload.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protectedRoute() {
    return 'Contgratulations';
  }
}
