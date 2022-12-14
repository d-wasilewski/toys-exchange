import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Toy, UserRole, UserStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ToyDto } from 'src/toys/dtos/toys.dto';

const userRoles = Object.values(UserRole);
const userStatuses = Object.values(UserStatus);

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiPropertyOptional({ enum: [...userRoles] })
  role: UserRole;
}

export class Rating {
  @IsOptional()
  @IsNumber()
  value: number | null;

  @IsNotEmpty()
  @IsNumber()
  count: number;
}

export class BasicUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  imgUrl: string | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @ApiProperty({ enum: [...userRoles] })
  role: UserRole;

  @ApiProperty({ enum: [...userStatuses] })
  status: UserStatus;
}

export class UserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  imgUrl: string | null;

  @IsOptional()
  @IsString()
  address: string | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @ApiProperty({ enum: [...userRoles] })
  role: UserRole;

  @ApiProperty({ enum: [...userStatuses] })
  status: UserStatus;

  @ApiProperty({ type: [ToyDto] })
  toys: Toy[];

  @ValidateNested()
  @Type(() => Rating)
  rating: Rating;

  @IsNotEmpty()
  @IsNumber()
  version: number;

  @IsNotEmpty()
  @IsBoolean()
  confirmed: boolean;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address: string | null;

  @ApiProperty({ enum: [...userRoles] })
  role: UserRole;

  @ApiProperty({ enum: [...userStatuses] })
  status: UserStatus;
}

export class UpdateUserSelfDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  address: string | null;
}

export class UserIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class RateUserDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  offerId: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @ApiProperty({ enum: ['sender', 'receiver'] })
  sentBy: 'sender' | 'receiver';
}
