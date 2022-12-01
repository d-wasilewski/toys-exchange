import { Center, Flex } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { OfferCard } from "./OfferCard";
import { myActiveOffersState } from "./offersState";

export const MyOffersView = () => {
  const allOffers = useRecoilValue(myActiveOffersState);

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
