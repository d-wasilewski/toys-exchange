import { Center, Container } from "@mantine/core";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ToysList } from "./ToysList";
import { toysListState } from "./toysState";

export const ToysView = () => {
  const toysList = useRecoilValue(toysListState);

  return (
    <Container>
      <h1>List of all toys</h1>
      <ToysList toysList={toysList} />
    </Container>
  );
};
