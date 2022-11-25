import { Button, Flex, Modal } from "@mantine/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { AddNewToyForm } from "./add-new/AddNewToyForm";
import { ToysList } from "./ToysList";
import { currentToysListState } from "./toysState";

export const MyToysView = () => {
  const [opened, setOpened] = useState(false);
  const myToysList = useRecoilValue(currentToysListState);

  return (
    <Flex wrap="wrap" gap="lg">
      <Button onClick={() => setOpened(true)}>Add new toy</Button>
      <ToysList toysList={myToysList} />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new toy"
      >
        <AddNewToyForm />
      </Modal>
    </Flex>
  );
};
