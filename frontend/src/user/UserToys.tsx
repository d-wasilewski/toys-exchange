import { Button, Modal, Title, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AddNewToyForm } from "../toys/add-new/AddNewToyForm";
import { ToysList } from "../toys/ToysList";
import { currentToysListState } from "../toys/toysState";

export const UserToys = () => {
  const [opened, setOpened] = useState(false);
  const myToysList = useRecoilValue(currentToysListState);
  const [active] = useOutletContext<string>();

  return (
    <>
      <Group position="apart" align="center">
        <Title my={20}>{active}</Title>
        <Button
          onClick={() => setOpened(true)}
          rightIcon={<IconPlus size={20} />}
        >
          Add new toy
        </Button>
      </Group>
      <ToysList toysList={myToysList} />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a new toy"
      >
        <AddNewToyForm />
      </Modal>
    </>
  );
};
