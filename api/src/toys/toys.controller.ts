import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Headers,
  Res,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { encodeETag } from 'src/shared/encodeETag';
import {
  BasicToyDto,
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
  async editToy(@Body() values: EditToyDto, @Headers('If-Match') ifMatch) {
    return this.toysService.editToy(values, ifMatch);
  }

  @Post('delete')
  async deleteToy(@Body() payload: ToyIdDto) {
    return this.toysService.deleteToy(payload.id);
  }

  @Post('toy')
  async getToy(@Body() toyId: ToyIdDto, @Res() res): Promise<BasicToyDto> {
    const toy = await this.toysService.getToy(toyId.id);
    const tag = encodeETag(toy.version, toy.id);

    return res
      .set({
        ETag: tag,
        'Access-Control-Expose-Headers': 'ETag',
      })
      .json(toy);
  }

  @Post('confirm')
  async confirmToy(
    @Body() toyId: ToyIdDto,
    @Headers('If-Match') ifMatch,
  ): Promise<void> {
    return this.toysService.changeToyStatus(toyId.id, 'ACTIVE', ifMatch);
  }

  @Post('block')
  async blockToy(
    @Body() toyId: ToyIdDto,
    @Headers('If-Match') ifMatch,
  ): Promise<void> {
    return this.toysService.changeToyStatus(toyId.id, 'UNCONFIRMED', ifMatch);
  }

  @Post('user-toys')
  async getUserToys(@Body() ownerId: OwnerIdDto): Promise<ToyDto[]> {
    return this.toysService.getToysByUserId(ownerId.id);
  }
}
