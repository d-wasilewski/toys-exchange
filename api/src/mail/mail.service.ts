import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserPayloadDto } from 'src/auth/dto/auth.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: UserPayloadDto, token: string) {
    const url = `example.com/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      // to: user.email,
      to: 'd.wasilewski@interia.eu',
      from: 'd.wasilewski@samorzad.p.lodz.pl',
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: 'user name ',
        url,
      },
    });
    console.log('Email sent');
  }
}
