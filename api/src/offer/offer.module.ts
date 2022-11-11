import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { OfferService } from './offer.service';

@Module({
  imports: [PrismaModule],
  providers: [OfferService, PrismaService, UserService],
})
export class OfferModule {}
