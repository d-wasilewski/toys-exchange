import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:5173/auth/confirmAccount?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: `Noreply <support@example.com>`,
        subject: 'Welcome to Toylink App! Confirm your Email',
        template: './confirmation',
        context: {
          name: user.name,
          url,
        },
      });
    } catch (e) {
      throw new Error('Error while sending email');
    }
  }

  async sendUserResetPassword(user: User, token: string) {
    const url = `http://localhost:5173/auth/resetPassword?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: `Noreply <support@example.com>`,
        subject: 'Password reset',
        template: './resetPassword',
        context: {
          name: user.name,
          url,
        },
      });
    } catch (e) {
      throw new Error('Error while sending email');
    }
  }
}
