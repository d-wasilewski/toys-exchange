import { Center, Flex } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { OfferCard } from "./OfferCard";
import { allOffersState } from "./offersState";

export const OfferCardList = () => {
  const allOffers = useRecoilValue(allOffersState);
  console.log({ allOffers });

  return (
    <Center>
      <Flex direction="column" gap="xl" mt={50}>
        {allOffers.map((offer: any) => {
          return (
            <OfferCard
              toyFromSender={offer.toyFromSender}
              sender={offer.sender}
              toyFromReceiver={offer.toyFromReceiver}
              receiver={offer.receiver}
              offerId={offer.id}
            />
          );
        })}
      </Flex>
    </Center>
  );
};
