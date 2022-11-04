import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}

export class AccessTokenDto {
  @ApiProperty()
  access_token: string;
}
