import { Body, Controller, Get, Post } from '@nestjs/common';
import { Toy } from '@prisma/client';
import { ToysService } from './toys.service';

@Controller('toy')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post('create-toy')
  async createToy(@Body() toyData: Toy): Promise<Toy> {
    return this.toysService.createToy(toyData);
  }

  @Get('toys')
  async getToys(): Promise<Toy[]> {
    return this.toysService.getToys();
  }
}
