import { Container } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { userState } from "../session/sessionState";
import { ToysList } from "./ToysList";
import { toysListState } from "./toysState";

export const ToysView = () => {
  const toysList = useRecoilValue(toysListState);
  const user = useRecoilValue(userState);

  return (
    <Container>
      <h1>List of all toys</h1>
      <ToysList toysList={toysList.filter((toy) => toy.ownerId !== user?.id)} />
    </Container>
  );
};
