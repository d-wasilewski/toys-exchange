import { Body, Controller, Get, Post } from '@nestjs/common';
import { ToyDto } from './dtos/toys.dto';
import { ToysService } from './toys.service';

@Controller('toy')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post('create-toy')
  async createToy(@Body() toyData: ToyDto): Promise<ToyDto> {
    return this.toysService.createToy(toyData);
  }

  @Get('toys')
  async getToys(): Promise<ToyDto[]> {
    return this.toysService.getToys();
  }
}
