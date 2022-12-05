import { Container, Flex, Paper } from "@mantine/core";
import { IconArrowsLeftRight } from "@tabler/icons";
import { useRecoilValue } from "recoil";
import { userState } from "../session/sessionState";
import { Offer } from "../shared/APIs/offerService";
import { ActionButtons } from "./ActionButtons";
import { OfferDetails } from "./OfferDetails";

interface OfferCardProps {
  offer: Offer;
  adminPage?: boolean;
}

export const OfferCard = ({ offer, adminPage }: OfferCardProps) => {
  const currentUser = useRecoilValue(userState);

  const userToRateId =
    currentUser?.id === offer.senderUserId
      ? offer.receiverUserId
      : offer.senderUserId;

  return (
    <Paper p="md" shadow="xs">
      <Flex gap="sm" justify="center" align="center">
        <OfferDetails toy={offer.toyFromSender} user={offer.sender} />
        <Container>
          <Flex direction="column" align="center" justify="flex-start" gap="md">
            <IconArrowsLeftRight size={40} />
            <ActionButtons
              offerId={offer.id}
              status={offer.status}
              userToRateId={userToRateId}
              offerRating={offer.rating}
              offerSender={offer.sender}
              adminPage={adminPage}
            />
          </Flex>
        </Container>
        <OfferDetails toy={offer.toyFromReceiver} user={offer.receiver} />
      </Flex>
    </Paper>
  );
};
