import { Button, Center, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../session/sessionState";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import { Toy } from "../shared/APIs/toysService";
import { makeAnOffer } from "../shared/APIs/offerService";
import { AvailableToySelect } from "./AvailavleToysSelect";
import { ToyCard } from "./ToyCard";
import {
  currentToysListState,
  offeredToyIdState,
  selectedToyIdState,
} from "./toysState";

interface SwapModalProps {
  opened: boolean;
  setOpened: (arg: boolean) => void;
  cardData: Toy;
}

export const SwapModal = ({ opened, setOpened, cardData }: SwapModalProps) => {
  const [loading, setLoading] = useState(false);
  const [offeredToyId, setOfferedToyId] = useRecoilState(offeredToyIdState);
  const [selectedToyId, setSelectedToyId] = useRecoilState(selectedToyIdState);
  const currentUser = useRecoilValue(userState);
  const availableToys = useRecoilValue(currentToysListState);
  const selectData = availableToys.map((toy) => {
    return {
      value: toy.id,
      label: toy.name,
      description: toy.category,
      image: toy.imgUrl,
    };
  });

  const handleSubmit = async () => {
    if (!currentUser || !offeredToyId || !selectedToyId) return null;
    const offerPayload = {
      senderUserId: currentUser?.id,
      receiverUserId: cardData.ownerId,
      toyFromSenderId: offeredToyId,
      toyFromReceiverId: selectedToyId,
    };

    try {
      setLoading(true);
      await makeAnOffer(offerPayload);
      showNotification({
        title: "Success",
        message: "Offer made successfully",
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
        setOfferedToyId(null);
        setSelectedToyId(null);
      }}
      title="Swap offer"
    >
      <Text>You are trying to swap for</Text>
      <Center mt={16} mb={16}>
        <ToyCard {...cardData} basic />
      </Center>
      <AvailableToySelect data={selectData}></AvailableToySelect>
      <Button mt={20} fullWidth onClick={handleSubmit} loading={loading}>
        Make an offer
      </Button>
    </Modal>
  );
};
