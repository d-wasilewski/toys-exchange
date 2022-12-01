import { Center, Flex } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { OfferCard } from "./OfferCard";
import { allOffersState } from "./offersState";

export const OfferCardList = () => {
  const allOffers = useRecoilValue(allOffersState);

  return (
    <Center>
      <Flex direction="column" gap="xl" mt={50}>
        {allOffers.map((offer) => {
          return <OfferCard offer={offer} />;
        })}
      </Flex>
    </Center>
  );
};
