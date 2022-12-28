import { Button, Center, Stack, Text } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { IconCircleCheck } from "@tabler/icons";
import { useRecoilValue } from "recoil";
import { useI18nContext } from "../i18n/i18n-react";
import { getUserByIdState } from "../session/sessionState";

export const SecondLayerSwapModal = ({ userId }: { userId: string }) => {
  const user = useRecoilValue(getUserByIdState(userId));
  const { LL } = useI18nContext();

  return (
    <>
      <Text>{LL.offer.swapComplete.textIntr()}</Text>
      <Text> {LL.offer.swapComplete.textInfo()}:</Text>
      <Stack py="md">
        <Text fw={500}>
          {LL.form.name()}: {user?.name}
        </Text>
        <Text fw={500}>
          {LL.form.address()}: {user?.address}
        </Text>
        <Text fw={500}>
          {LL.form.phone()}: {user?.phoneNumber}
        </Text>
        <Text fw={500}>
          {LL.form.email()}: {user?.email}
        </Text>
      </Stack>
      <Text>{LL.offer.swapComplete.textFinish()}</Text>
      <Center my={16}>
        <IconCircleCheck size={60} color="green" />
      </Center>
      <Button mt={10} fullWidth onClick={() => closeAllModals()}>
        {LL.general.close()}
      </Button>
    </>
  );
};
