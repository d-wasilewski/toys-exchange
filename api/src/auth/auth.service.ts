import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto, UserLoginDto, UserPayloadDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    console.log({ email, password });

    const user = await this.userService.findOne(email);

    console.log({ user });

    const equalPasswords = await bcrypt.compare(password, user.password);

    if (user && equalPasswords) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserPayloadDto) {
    console.log('aa');

    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
