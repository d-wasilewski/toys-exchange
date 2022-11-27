import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { SendOfferDto } from './dtos/offer.dto';

export enum Status {
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
}

@Injectable()
export class OfferService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getAllOffers() {
    const offers = await this.prisma.offer.findMany({
      include: {
        sender: {
          select: {
            name: true,
            imgUrl: true,
          },
        },
        receiver: {
          select: {
            name: true,
            imgUrl: true,
          },
        },
        toyFromSender: {
          select: {
            name: true,
            imgUrl: true,
            category: true,
          },
        },
        toyFromReceiver: {
          select: {
            name: true,
            imgUrl: true,
            category: true,
          },
        },
      },
    });

    const offersWithRatings = await Promise.all(
      offers.map(async (offer) => {
        const senderRating = await this.userService.getUserRating(
          offer.senderUserId,
        );
        const receiverRating = await this.userService.getUserRating(
          offer.receiverUserId,
        );

        return {
          ...offer,
          sender: {
            ...offer.sender,
            rating: {
              value: senderRating._avg.value,
              count: senderRating._count.value,
            },
          },
          receiver: {
            ...offer.receiver,
            rating: {
              value: receiverRating._avg.value,
              count: receiverRating._count.value,
            },
          },
        };
      }),
    );

    return offersWithRatings;
  }

  async sendOffer({
    senderUserId,
    receiverUserId,
    toyFromSenderId,
    toyFromReceiverId,
  }: SendOfferDto) {
    return this.prisma.offer.create({
      data: {
        senderUserId,
        receiverUserId,
        toyFromSenderId,
        toyFromReceiverId,
      },
    });
  }

  async getActiveOffers(receiverId: string) {
    const offers = await this.prisma.offer.findMany({
      where: {
        receiverUserId: receiverId,
        status: Status.PENDING,
      },
      include: {
        sender: {
          select: {
            imgUrl: true,
            name: true,
          },
        },
        receiver: {
          select: {
            imgUrl: true,
            name: true,
          },
        },
        toyFromSender: {
          select: {
            name: true,
            imgUrl: true,
            category: true,
          },
        },
        toyFromReceiver: {
          select: {
            name: true,
            imgUrl: true,
            category: true,
          },
        },
      },
    });

    const offersWithRatings = await Promise.all(
      offers.map(async (offer) => {
        const senderRating = await this.userService.getUserRating(
          offer.senderUserId,
        );
        const receiverRating = await this.userService.getUserRating(
          offer.receiverUserId,
        );

        return {
          ...offer,
          sender: {
            ...offer.sender,
            rating: {
              value: senderRating._avg.value,
              count: senderRating._count.value,
            },
          },
          receiver: {
            ...offer.receiver,
            rating: {
              value: receiverRating._avg.value,
              count: receiverRating._count.value,
            },
          },
        };
      }),
    );

    return offersWithRatings;
  }

  async acceptOffer(offerId: string) {
    await this.prisma.$transaction(async (tx) => {
      const offer = await tx.offer.findFirst({
        where: {
          id: offerId,
        },
      });

      if (offer.status !== Status.PENDING) {
        throw new ConflictException(`Offer is not active anymore`);
      }

      await tx.offer.update({
        where: {
          id: offerId,
        },
        data: {
          status: Status.ACCEPTED,
        },
      });

      await tx.toy.update({
        where: {
          id: offer.toyFromSenderId,
        },
        data: {
          ownerId: offer.receiverUserId,
        },
      });

      await tx.toy.update({
        where: {
          id: offer.toyFromReceiverId,
        },
        data: {
          ownerId: offer.senderUserId,
        },
      });
    });
  }

  async declineOffer(offerId: string) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id: offerId,
      },
    });

    if (offer.status !== Status.PENDING) {
      throw new ConflictException(`Offer is not active anymore`);
    }

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
