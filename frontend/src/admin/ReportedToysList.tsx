import { Flex } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { ToysList } from "../toys/ToysList";
import { toysListState } from "../toys/toysState";

export const ReportedToysList = () => {
  const toys = useRecoilValue(toysListState);

  return (
    <Flex wrap="wrap" gap="lg" mt={20}>
      <ToysList toysList={toys.filter((toy) => toy.status === "REPORTED")} />
    </Flex>
  );
};
