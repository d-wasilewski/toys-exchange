import { ApiProperty } from '@nestjs/swagger';
import { OfferStatus } from '@prisma/client';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

const offerStatuses = Object.values(OfferStatus);

export class OfferIdDto {
  @IsNotEmpty()
  @IsNumber()
  offerId: number;
}

export class ReceiverIdDto {
  @IsNotEmpty()
  @IsNumber()
  receiverId: number;
}

export class SendOfferDto {
  @IsNotEmpty()
  @IsNumber()
  senderUserId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverUserId: number;

  @IsNotEmpty()
  @IsNumber()
  toyFromSenderId: number;

  @IsNotEmpty()
  @IsNumber()
  toyFromReceiverId: number;
}

export class OfferDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  senderUserId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverUserId: number;

  @IsNotEmpty()
  @IsNumber()
  toyFromSenderId: number;

  @IsNotEmpty()
  @IsNumber()
  toyFromReceiverId: number;

  @ApiProperty({ enum: [...offerStatuses] })
  status: OfferStatus;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
