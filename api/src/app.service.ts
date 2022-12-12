import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_9PM)
  async handleCron() {
    await this.prisma.user.deleteMany({
      where: {
        confirmed: false,
      },
    });
  }
}
