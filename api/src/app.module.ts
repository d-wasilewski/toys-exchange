import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { ToysService } from './toys/toys.service';
import { ToysController } from './toys/toys.controller';
import { ToysModule } from './toys/toys.module';
import { OfferController } from './offer/offer.controller';
import { OfferService } from './offer/offer.service';
import { OfferModule } from './offer/offer.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ToysModule,
    OfferModule,
    MailModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    ToysController,
    OfferController,
  ],
  providers: [
    AppService,
    UserService,
    PrismaService,
    AuthService,
    JwtService,
    ToysService,
    OfferService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
