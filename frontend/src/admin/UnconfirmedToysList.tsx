import { Flex } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { ToysList } from "../toys/ToysList";
import { toysListState } from "../toys/toysState";

export const UnconfirmedToysList = () => {
  const unconfirmedToys = useRecoilValue(toysListState);

  return (
    <Flex wrap="wrap" gap="lg" mt={20}>
      <ToysList
        toysList={unconfirmedToys.filter((toy) => toy.status === "UNCONFIRMED")}
      />
    </Flex>
  );
};
