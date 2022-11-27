import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  BasicToyDto,
  CreateToyDto,
  EditToyDto,
  OwnerIdDto,
  ToyDto,
  ToyIdDto,
} from './dtos/toys.dto';
import { File, ToysService } from './toys.service';

@Controller('toy')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post('create-toy')
  @UseInterceptors(FilesInterceptor('toyImage'))
  async createToy(
    @Body() toyData,
    @UploadedFiles() file: File[],
  ): Promise<BasicToyDto> {
    return this.toysService.createToy(file, JSON.parse(toyData.values));
  }

  @Post('toys')
  async getToys(): Promise<ToyDto[]> {
    return this.toysService.getToys();
  }

  @Post('edit')
  async editToy(@Body() values: EditToyDto) {
    return this.toysService.editToy(values);
  }

  @Post('toy')
  async getToy(@Body() toyId: ToyIdDto): Promise<BasicToyDto> {
    return this.toysService.getToy(toyId.id);
  }

  @Post('user-toys')
  async getUserToys(@Body() ownerId: OwnerIdDto): Promise<ToyDto[]> {
    return this.toysService.getToysByUserId(ownerId.id);
  }
}
