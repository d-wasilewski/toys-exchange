import { ActionIcon, Flex } from "@mantine/core";
import { IconEye, IconPencil } from "@tabler/icons";
import { useSetRecoilState } from "recoil";
import { clickedUserIdState, isAdminDrawerOpenedState } from "./adminState";

interface UserActionsProps {
  userId: number;
}

export const UserActions = ({ userId }: UserActionsProps) => {
  const setIsDrawerOpened = useSetRecoilState(isAdminDrawerOpenedState);
  const setClickedUserId = useSetRecoilState(clickedUserIdState);

  return (
    <Flex gap="sm">
      <ActionIcon color="blue" variant="light" radius="md">
        <IconEye size={20} />
      </ActionIcon>

      <ActionIcon
        color="blue"
        radius="md"
        variant="light"
        onClick={() => {
          setIsDrawerOpened(true);
          setClickedUserId(userId);
        }}
      >
        <IconPencil size={20} />
      </ActionIcon>
    </Flex>
  );
};
