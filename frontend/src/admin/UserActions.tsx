import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { IconEye, IconPencil } from "@tabler/icons";
import { useSetRecoilState } from "recoil";
import {
  clickedUserIdState,
  isAdminDrawerOpenedState,
  isDrawerEditableState,
} from "./adminState";

interface UserActionsProps {
  userId: string;
}

export const UserActions = ({ userId }: UserActionsProps) => {
  const setIsDrawerOpened = useSetRecoilState(isAdminDrawerOpenedState);
  const setClickedUserId = useSetRecoilState(clickedUserIdState);
  const setIsDrawerEditable = useSetRecoilState(isDrawerEditableState);

  return (
    <Flex gap="sm">
      <Tooltip label="See details">
        <ActionIcon
          color="blue"
          variant="light"
          radius="md"
          onClick={() => {
            setIsDrawerEditable(false);
            setIsDrawerOpened(true);
            setClickedUserId(userId);
          }}
        >
          <IconEye size={20} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label="Edit">
        <ActionIcon
          color="blue"
          radius="md"
          variant="light"
          onClick={() => {
            setIsDrawerEditable(true);
            setIsDrawerOpened(true);
            setClickedUserId(userId);
          }}
        >
          <IconPencil size={20} />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
