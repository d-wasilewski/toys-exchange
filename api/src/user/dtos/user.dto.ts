import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Toy, UserRole } from '@prisma/client';
import { ToyDto } from 'src/toys/dtos/toys.dto';

const userRoles = Object.values(UserRole);

export class RegisterUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  name: string | null;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional({ enum: [...userRoles] })
  role: UserRole;
}

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  name: string | null;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: [ToyDto] })
  toys: Toy[];
}

export class UserIdDto {
  @ApiProperty()
  id!: number;
}
