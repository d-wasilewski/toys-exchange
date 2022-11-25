import { Container, Flex, Paper } from "@mantine/core";
import { IconArrowsLeftRight } from "@tabler/icons";
import { ActionButtons } from "./ActionButtons";
import { OfferDetails } from "./OfferDetails";

interface ArticleCardVerticalProps {
  toyFromSender: {
    name: string;
    imgUrl: string;
    category: string;
  };
  sender: {
    name: string;
  };
  toyFromReceiver: {
    name: string;
    imgUrl: string;
    category: string;
  };
  receiver: {
    name: string;
  };
  offerId: string;
}

export const OfferCard = ({
  toyFromSender,
  toyFromReceiver,
  sender,
  receiver,
  offerId,
}: ArticleCardVerticalProps) => {
  return (
    <Paper p="md" shadow="xs">
      <Flex gap="sm" justify="center" align="center">
        <OfferDetails toy={toyFromSender} user={sender} />
        <Container>
          <Flex direction="column" align="center" justify="flex-start" gap="md">
            <IconArrowsLeftRight size={40} />
            <ActionButtons offerId={offerId} />
          </Flex>
        </Container>
        <OfferDetails toy={toyFromReceiver} user={receiver} />
      </Flex>
      {/* <Center mt={16}>
        <ActionButtons />
      </Center> */}
    </Paper>
  );
};
