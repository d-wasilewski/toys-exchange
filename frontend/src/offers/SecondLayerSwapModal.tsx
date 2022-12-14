import { Button, Center, Stack, Text } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { IconCircleCheck } from "@tabler/icons";
import { useRecoilValue } from "recoil";
import { getUserByIdState } from "../session/sessionState";

export const SecondLayerSwapModal = ({ userId }: { userId: string }) => {
  const user = useRecoilValue(getUserByIdState(userId));

  return (
    <>
      <Text>
        You swapped for a toy in the app, now plase contact the person you made
        a swap with to finish the process
      </Text>
      <Text>Here is the data about the person you are swapping with:</Text>
      <Stack py="md">
        <Text fw={500}>Name: {user?.name}</Text>
        <Text fw={500}>Address: {user?.address}</Text>
        <Text fw={500}>Phone number: {user?.phoneNumber}</Text>
        <Text fw={500}>Email: {user?.email}</Text>
      </Stack>
      <Text>
        Please keep in mind you won't be able to comeback to this screen so save
        the displayed data
      </Text>
      <Center my={16}>
        <IconCircleCheck size={60} color="green" />
      </Center>
      <Button mt={10} fullWidth onClick={() => closeAllModals()}>
        Close
      </Button>
    </>
  );
};
