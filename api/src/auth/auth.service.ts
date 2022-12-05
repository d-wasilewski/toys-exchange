import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto, UserLoginDto, UserPayloadDto } from './dto/auth.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user = await this.userService.findOne(email);

    const equalPasswords = await bcrypt.compare(password, user.password);

    if (user && equalPasswords) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserPayloadDto) {
    const payload = { username: user.email, sub: user.id };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });

    await this.mailService.sendUserConfirmation(user, token);

    return {
      access_token: token,
    };
  }
}
