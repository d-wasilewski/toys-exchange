import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AddNewToyForm } from "./add-new/AddNewToyForm";
import { ToysList } from "./ToysList";
import { currentToysListState } from "./toysState";

export const MyToysView = () => {
  const [opened, setOpened] = useState(false);
  const myToysList = useRecoilValue(currentToysListState);

  return (
    <PageWrapper>
      <h1>List of my toys</h1>
      <Button onClick={() => setOpened(true)}>Add new toy</Button>
      <ToysList toysList={myToysList} />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new toy"
      >
        <AddNewToyForm />
      </Modal>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 54px;
`;
