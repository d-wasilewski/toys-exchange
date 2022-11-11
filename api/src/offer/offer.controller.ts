import { Body, Controller, Post } from '@nestjs/common';
import {
  OfferDto,
  OfferIdDto,
  ReceiverIdDto,
  SendOfferDto,
} from './dtos/offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('offers')
  async getOffers(): Promise<OfferDto[]> {
    return this.offerService.getAllOffers();
  }

  @Post('/active-offers')
  async getActiveOffers(@Body() payload: ReceiverIdDto) {
    return this.offerService.getActiveOffers(payload.receiverId);
  }

  @Post('send')
  async sendOffer(@Body() payload: SendOfferDto): Promise<OfferDto> {
    return this.offerService.sendOffer(payload);
  }

  @Post('decline')
  async declineOffer(@Body() payload: OfferIdDto): Promise<void> {
    return this.offerService.declineOffer(payload.offerId);
  }

  @Post('accept')
  async acceptOffer(@Body() payload: OfferIdDto): Promise<void> {
    return this.offerService.acceptOffer(payload.offerId);
  }
}
