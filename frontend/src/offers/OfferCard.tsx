import { Container, Flex, Paper } from "@mantine/core";
import { IconArrowsLeftRight } from "@tabler/icons";
import { Offer } from "../shared/APIs/offerService";
import { ActionButtons } from "./ActionButtons";
import { OfferDetails } from "./OfferDetails";

interface OfferCardProps {
  offer: Offer;
}

export const OfferCard = ({ offer }: OfferCardProps) => {
  return (
    <Paper p="md" shadow="xs">
      <Flex gap="sm" justify="center" align="center">
        <OfferDetails toy={offer.toyFromSender} user={offer.sender} />
        <Container>
          <Flex direction="column" align="center" justify="flex-start" gap="md">
            <IconArrowsLeftRight size={40} />
            <ActionButtons offerId={offer.id} status={offer.status} />
          </Flex>
        </Container>
        <OfferDetails toy={offer.toyFromReceiver} user={offer.receiver} />
      </Flex>
      {/* <Center mt={16}>
        <ActionButtons />
      </Center> */}
    </Paper>
  );
};
