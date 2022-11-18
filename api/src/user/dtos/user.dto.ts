import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Toy, UserRole, UserStatus } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ToyDto } from 'src/toys/dtos/toys.dto';

const userRoles = Object.values(UserRole);
const userStatuses = Object.values(UserStatus);

export class RegisterUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string | null;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

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

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

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
}

export class UserIdDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
