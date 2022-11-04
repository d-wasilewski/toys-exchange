import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserLoginDto> {
    const user = await this.userService.findOne(username);

    const equalPasswords = await bcrypt.compare(pass, user.password);

    if (user && equalPasswords) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserLoginDto) {
    const payload = { username: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
