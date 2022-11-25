import { Center, Flex } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { OfferCard } from "../offers/OfferCard";
import { myActiveOffersState } from "../offers/offersState";

export const UserActiveOffers = () => {
  const allOffers = useRecoilValue(myActiveOffersState);
  console.log("MY offers: ", allOffers);

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
