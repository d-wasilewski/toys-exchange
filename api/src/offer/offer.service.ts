import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { OfferDto, SendOfferDto } from './dtos/offer.dto';

export enum Status {
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
}

type OfferWithoutUserRatings = Omit<OfferDto, 'sender' | 'receiver'> & {
  sender: {
    id: string;
    name: string;
    imgUrl: string;
  };
  receiver: {
    id: string;
    name: string;
    imgUrl: string;
  };
};

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
            id: true,
            name: true,
            imgUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
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
        senderRating: true,
        receiverRating: true,
      },
    });

    const offersWithRatings = await this.getOffersWithRatings(offers);

    return offersWithRatings;
  }

  private async getOffersWithRatings(offers: OfferWithoutUserRatings[]) {
    return await Promise.all(
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
            id: true,
            imgUrl: true,
            name: true,
          },
        },
        receiver: {
          select: {
            id: true,
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
        senderRating: true,
        receiverRating: true,
      },
    });

    const offersWithRatings = this.getOffersWithRatings(offers);

    return offersWithRatings;
  }

  async getHistoryOffers(receiverId: string) {
    const offers = await this.prisma.offer.findMany({
      where: {
        OR: [
          {
            receiverUserId: receiverId,
          },
          {
            senderUserId: receiverId,
          },
        ],
        NOT: {
          status: Status.PENDING,
        },
      },
      include: {
        sender: {
          select: {
            id: true,
            imgUrl: true,
            name: true,
          },
        },
        receiver: {
          select: {
            id: true,
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
        senderRating: true,
        receiverRating: true,
      },
    });

    const offersWithRatings = this.getOffersWithRatings(offers);

    return offersWithRatings;
  }

  async acceptOffer(offerId: string) {
    const MAX_RETRIES = 3;
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        await this.prisma.$transaction(async (tx) => {
          const offer = await tx.offer.findFirst({
            where: {
              id: offerId,
            },
            include: {
              toyFromReceiver: true,
              toyFromSender: true,
            },
          });

          if (!offer || !offer.toyFromSender || !offer.toyFromReceiver) {
            throw new NotFoundException(
              'Data is expired. Please refresh the page.',
            );
          }

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
              status: 'FINISHED',
            },
          });

          await tx.toy.update({
            where: {
              id: offer.toyFromReceiverId,
            },
            data: {
              ownerId: offer.senderUserId,
              status: 'FINISHED',
            },
          });
        });
        break;
      } catch (error) {
        if (error.code === 'P2034') {
          retries++;
          continue;
        }
        throw error;
      }
    }
  }

  async declineOffer(offerId: string) {
    const offer = await this.prisma.offer.findFirst({
      where: {
        id: offerId,
      },
    });

    if (!offer || offer.status !== Status.PENDING) {
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
