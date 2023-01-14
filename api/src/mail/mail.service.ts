import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  getConfirmationSubject,
  getResetPasswordSubject,
} from 'src/shared/isEnglishLang';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${process.env.CLIENT_URL}/auth/confirmAccount?token=${token}`;
    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: `${process.env.MAIL_FROM}`,
        subject: getConfirmationSubject(user),
        template: `./${user.language.toLowerCase()}/confirmation`,
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
    const url = `${process.env.CLIENT_URL}/auth/resetPassword?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        from: `${process.env.MAIL_FROM}`,
        subject: getResetPasswordSubject(user),
        template: `./${user.language.toLowerCase()}/resetPassword`,
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
