import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendOfferDto } from './dtos/offer.dto';

export enum Status {
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
}

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async getAllOffers() {
    return this.prisma.offer.findMany({});
  }

  async sendOffer({
    senderUserId,
    receiverUserId,
    toyFromSenderId,
    toyFromReceiverId,
  }: SendOfferDto) {
    // TODO: add acceptedAt/updatedAt
    return this.prisma.offer.create({
      data: {
        senderUserId,
        receiverUserId,
        toyFromSenderId,
        toyFromReceiverId,
      },
    });
  }

  async getActiveOffers(receiverId: number) {
    return this.prisma.offer.findMany({
      where: {
        receiverUserId: receiverId,
        status: Status.PENDING,
      },
      include: {
        sender: {
          select: {
            name: true,
          },
        },
        toyFromSender: true,
        toyFromReceiver: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async acceptOffer(offerId: number) {
    await this.prisma.$transaction(async (tx) => {
      const offer = await tx.offer.update({
        where: {
          id: offerId,
        },
        data: {
          status: Status.ACCEPTED,
        },
      });

      if (offer.status !== Status.PENDING) {
        throw new Error(`Offer ${offer.id} is not active anymore`);
      }

      await tx.toy.update({
        where: {
          id: offer.senderUserId,
        },
        data: {
          ownerId: offer.receiverUserId,
        },
      });

      await tx.toy.update({
        where: {
          id: offer.receiverUserId,
        },
        data: {
          ownerId: offer.senderUserId,
        },
      });
    });
  }

  async declineOffer(offerId: number) {
    await this.prisma.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status: Status.DECLINED,
      },
    });
  }
}
