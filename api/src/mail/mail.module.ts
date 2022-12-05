import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      // transport: process.env.MAIL_TRANSPORT,
      transport: {
        host: 'smtp.sendgrid.net',
        secure: false,
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
      defaults: {
        from: `"No Reply" <${process.env.MAIL_FROM}>`,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule {}
