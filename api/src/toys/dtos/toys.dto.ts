import { ApiProperty } from '@nestjs/swagger';
import { ToyCategories, ToyStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Rating } from 'src/user/dtos/user.dto';

const toyCategories = Object.values(ToyCategories);
const toyStatuses = Object.values(ToyStatus);

export class BasicToyDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: [...toyCategories] })
  category: ToyCategories;

  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  ownerId: string;

  @ApiProperty({ enum: [...toyStatuses] })
  status: ToyStatus;
}

class Owner {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  imgUrl: string | null;

  @ValidateNested()
  @Type(() => Rating)
  rating: Rating;
}

export class ToyDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: [...toyCategories] })
  category: ToyCategories;

  @IsNotEmpty()
  @IsString()
  imgUrl: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  ownerId: string;

  @ValidateNested()
  @Type(() => Owner)
  owner: Owner;

  @ApiProperty({ enum: [...toyStatuses] })
  status: ToyStatus;
}

export class CreateToyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: [...toyCategories] })
  category: ToyCategories;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUUID()
  ownerId: string;
}

export class EditToyDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: [...toyCategories] })
  category: ToyCategories;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class OwnerIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class ToyIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
