import { ApiProperty } from '@nestjs/swagger';

export class ToyDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  category: string;

  @ApiProperty({ type: String })
  imgUrl: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: Number })
  ownerId: number;
}

export class CreateToyDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  category: string;

  @ApiProperty({ type: String })
  imgUrl: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  address: string;

  @ApiProperty({ type: Number })
  ownerId: number;
}

export class OwnerIdDto {
  @ApiProperty()
  id!: number;
}
