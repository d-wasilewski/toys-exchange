import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
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
  async login(
    @Request() req: { user: UserPayloadDto },
  ): Promise<AccessTokenDto> {
    console.log('aa');

    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async protectedRoute() {
    return 'Contgratulations';
  }

  // this is here because Swagger can see the DTO type only if its a return type somewhere
  @Post('test')
  async getTest(data: UserLoginDto): Promise<UserLoginDto> {
    return data;
  }
}
