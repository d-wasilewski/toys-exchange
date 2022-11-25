import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Toy, UserRole, UserStatus } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
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

  @ApiProperty({ enum: [...userRoles] })
  role: UserRole;

  @ApiProperty({ enum: [...userStatuses] })
  status: UserStatus;
}

export class UserIdDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
