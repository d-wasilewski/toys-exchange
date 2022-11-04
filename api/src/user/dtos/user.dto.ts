import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Toy } from '@prisma/client';
import { ToyDto } from 'src/toys/dtos/toys.dto';

export class RegisterUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  name: string | null;

  @ApiProperty()
  password: string;
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
