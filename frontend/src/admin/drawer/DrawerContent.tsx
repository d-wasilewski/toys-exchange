import { Avatar, Center, Container, Stack, TextInput } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { selectedUserState } from "../adminState";

export const DrawerContent = () => {
  const selectedUser = useRecoilValue(selectedUserState);

  return (
    <Container px="xs">
      <Stack spacing="md">
        <Center>
          <Avatar src={selectedUser?.imgUrl} size="xl" radius="xl" />
        </Center>
        <TextInput disabled radius="md" label="Id" value={selectedUser?.id} />
        <TextInput
          disabled
          radius="md"
          label="Name"
          value={selectedUser?.name}
        />
        <TextInput
          disabled
          radius="md"
          label="Email"
          value={selectedUser?.email}
        />
        <TextInput
          disabled
          radius="md"
          label="Phone number"
          value={selectedUser?.phoneNumber}
        />
        <TextInput
          disabled
          radius="md"
          label="Address"
          value={selectedUser?.address ?? "---"}
        />
        <TextInput
          disabled
          radius="md"
          label="Created at"
          value={selectedUser?.createdAt}
        />
        <TextInput
          disabled
          radius="md"
          label="Status"
          value={selectedUser?.status}
        />
        <TextInput
          disabled
          radius="md"
          label="Role"
          value={selectedUser?.role}
        />
        <TextInput
          disabled
          radius="md"
          label="Number of toys"
          value={selectedUser?.toys.length}
        />
      </Stack>
    </Container>
  );
};
