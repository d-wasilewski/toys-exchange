import { ApiProperty } from '@nestjs/swagger';
import { OfferStatus } from '@prisma/client';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

const offerStatuses = Object.values(OfferStatus);

export class OfferIdDto {
  @IsNotEmpty()
  @IsUUID()
  offerId: string;
}

export class ReceiverIdDto {
  @IsNotEmpty()
  @IsUUID()
  receiverId: string;
}

export class SendOfferDto {
  @IsNotEmpty()
  @IsUUID()
  senderUserId: string;

  @IsNotEmpty()
  @IsUUID()
  receiverUserId: string;

  @IsNotEmpty()
  @IsUUID()
  toyFromSenderId: string;

  @IsNotEmpty()
  @IsUUID()
  toyFromReceiverId: string;
}

export class OfferDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  senderUserId: string;

  @IsNotEmpty()
  @IsUUID()
  receiverUserId: string;

  @IsNotEmpty()
  @IsUUID()
  toyFromSenderId: string;

  @IsNotEmpty()
  @IsUUID()
  toyFromReceiverId: string;

  @ApiProperty({ enum: [...offerStatuses] })
  status: OfferStatus;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
}
