import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Toy, UserRole } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ToyDto } from 'src/toys/dtos/toys.dto';

const userRoles = Object.values(UserRole);

export class RegisterUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({ enum: [...userRoles] })
  role: UserRole;
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: [ToyDto] })
  toys: Toy[];
}

export class UserIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
