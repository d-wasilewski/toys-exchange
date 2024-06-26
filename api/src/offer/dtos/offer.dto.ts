import { ApiProperty } from '@nestjs/swagger';
import { OfferStatus, ToyCategories } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Rating } from 'src/user/dtos/user.dto';

const offerStatuses = Object.values(OfferStatus);
const toyCategories = Object.values(ToyCategories);

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

class UserOfferDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @ValidateNested()
  @Type(() => Rating)
  rating: Rating;
}

export class ToyOfferDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @ApiProperty({ enum: [...toyCategories] })
  category: ToyCategories;
}

export class RatingOfferDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  receiverOfferId: string;

  @IsNotEmpty()
  @IsString()
  senderOfferId: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsDate()
  createdAt: Date;
}

export class BasicOfferDto {
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

  @ValidateNested()
  @Type(() => UserOfferDto)
  receiver: UserOfferDto;

  @ValidateNested()
  @Type(() => UserOfferDto)
  sender: UserOfferDto;

  @ValidateNested()
  @Type(() => ToyOfferDto)
  toyFromReceiver: ToyOfferDto;

  @ValidateNested()
  @Type(() => ToyOfferDto)
  toyFromSender: ToyOfferDto;

  @ApiProperty({ enum: [...offerStatuses] })
  status: OfferStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => RatingOfferDto)
  senderRating: RatingOfferDto | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => RatingOfferDto)
  receiverRating: RatingOfferDto | null;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}
