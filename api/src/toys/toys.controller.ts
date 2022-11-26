import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { BasicToyDto, OwnerIdDto, ToyDto } from './dtos/toys.dto';
import { ToysService } from './toys.service';

@Controller('toy')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post('create-toy')
  @UseInterceptors(FilesInterceptor('toyImage'))
  async createToy(
    @Body() toyData,
    @UploadedFiles() file,
  ): Promise<BasicToyDto> {
    return this.toysService.createToy(file, JSON.parse(toyData.values));
  }

  @Post('toys')
  async getToys(): Promise<ToyDto[]> {
    return this.toysService.getToys();
  }

  @Post('/user-toys')
  async getUserToys(@Body() ownerId: OwnerIdDto): Promise<BasicToyDto[]> {
    return this.toysService.getToysByUserId(ownerId.id);
  }
}
