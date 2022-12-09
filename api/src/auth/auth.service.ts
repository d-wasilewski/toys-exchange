import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/auth.dto';
import { MailService } from 'src/mail/mail.service';
import { User } from '@prisma/client';

interface GenerateTokenPayload {
  username: string;
  sub: string;
}

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

  generateToken(payload: GenerateTokenPayload) {
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return token;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };

    if (!user.confirmed)
      throw new UnauthorizedException('Please confirm your email first');
    if (user.status === 'BLOCKED')
      throw new UnauthorizedException('Your account has been suspended');

    const token = this.generateToken(payload);

    await this.mailService.sendUserConfirmation(user, token);

    return {
      access_token: token,
    };
  }

  async confirmUser(token: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken) {
      throw new UnauthorizedException('We cannot confirm your account');
    }
    try {
      await this.userService.confirmUserAccount(decodedToken['username']);
    } catch (e) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async sendResetPasswordLink(email: string) {
    const user = await this.userService.findOne(email);

    if (!user) return;

    const token = this.generateToken({ username: user.email, sub: user.id });

    await this.mailService.sendUserResetPassword(user, token);
  }

  async resetPassword(token: string, newPassword: string) {
    const decodedToken = this.jwtService.decode(token);
    if (!decodedToken) {
      throw new UnauthorizedException('We cannot change your password');
    }

    try {
      await this.userService.changePassword(
        decodedToken['username'],
        newPassword,
      );
    } catch (e) {
      throw e;
    }
  }
}
