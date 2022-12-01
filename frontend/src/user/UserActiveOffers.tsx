import { Center, Flex, Title } from "@mantine/core";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { OfferCard } from "../offers/OfferCard";
import { myActiveOffersState } from "../offers/offersState";

export const UserActiveOffers = () => {
  const allOffers = useRecoilValue(myActiveOffersState);
  const [active] = useOutletContext<string>();

  return (
    <>
      <Title my={20}>{active}</Title>
      <Center>
        <Flex direction="column" gap="xl">
          {allOffers.map((offer) => {
            return <OfferCard offer={offer} />;
          })}
        </Flex>
      </Center>
    </>
  );
};
