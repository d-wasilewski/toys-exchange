import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

const offerStatuses = Object.values(Status);

export class OfferIdDto {
  @ApiProperty()
  offerId!: number;
}

export class ReceiverIdDto {
  @ApiProperty()
  receiverId!: number;
}

export class SendOfferDto {
  @ApiProperty()
  senderUserId: number;

  @ApiProperty()
  receiverUserId: number;

  @ApiProperty()
  toyFromSenderId: number;

  @ApiProperty()
  toyFromReceiverId: number;
}

export class OfferDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  senderUserId: number;

  @ApiProperty()
  receiverUserId: number;

  @ApiProperty()
  toyFromSenderId: number;

  @ApiProperty()
  toyFromReceiverId: number;

  @ApiProperty({ enum: [...offerStatuses] })
  status: Status;

  @ApiProperty()
  createdAt: Date;
}
