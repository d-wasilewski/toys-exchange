import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserStatus } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

const userRoles = Object.values(UserRole);
const userStatuses = Object.values(UserStatus);

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UserPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
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
  phoneNumber: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @ApiPropertyOptional({ enum: [...userRoles] })
  role: UserRole;

  @ApiProperty({ enum: [...userStatuses] })
  status: UserStatus;
}

export class AccessTokenDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
