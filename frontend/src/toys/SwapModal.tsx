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
import { useI18nContext } from "../i18n/i18n-react";

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
  const { LL } = useI18nContext();

  const selectData = availableToys
    .filter((x) => x.status === "ACTIVE")
    .map((toy) => {
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
        title: LL.notifications.success(),
        message: LL.notifications.created({ name: "Offer" }),
        color: "green",
        autoClose: 3000,
      });
      setOpened(false);
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
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
      title={LL.toy.swap.offer()}
    >
      <Text>{LL.toy.swap.tryingSwap()}</Text>
      <Center mt={16} mb={16}>
        <ToyCard {...cardData} basicView />
      </Center>
      <AvailableToySelect data={selectData}></AvailableToySelect>
      <Button mt={20} fullWidth onClick={handleSubmit} loading={loading}>
        {LL.toy.swap.make()}
      </Button>
    </Modal>
  );
};
