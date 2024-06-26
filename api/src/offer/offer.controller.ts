import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminPermissionGuard } from 'src/shared/guards/permission.guard';
import {
  BasicOfferDto,
  OfferDto,
  OfferIdDto,
  ReceiverIdDto,
  SendOfferDto,
} from './dtos/offer.dto';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @UseGuards(AdminPermissionGuard)
  @Post('offers')
  async getOffers(): Promise<OfferDto[]> {
    return this.offerService.getAllOffers();
  }

  @Post('/active-offers')
  async getActiveOffers(@Body() payload: ReceiverIdDto): Promise<OfferDto[]> {
    return this.offerService.getActiveOffers(payload.receiverId);
  }

  @Post('/history-offers')
  async getHistoryOffers(@Body() paylaod: ReceiverIdDto): Promise<OfferDto[]> {
    return this.offerService.getHistoryOffers(paylaod.receiverId);
  }

  @Post('send')
  async sendOffer(@Body() payload: SendOfferDto): Promise<BasicOfferDto> {
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
