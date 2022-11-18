import { ActionIcon, Drawer, Flex } from "@mantine/core";
import { IconEye, IconPencil } from "@tabler/icons";

export const UserActions = () => {
  return (
    <Flex gap="sm">
      <ActionIcon color="blue" variant="light" radius="md">
        <IconEye size={20} />
      </ActionIcon>

      <ActionIcon color="blue" radius="md" variant="light">
        <IconPencil size={20} />
      </ActionIcon>
    </Flex>
  );
};
