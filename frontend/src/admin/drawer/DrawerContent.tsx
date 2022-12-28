import { Avatar, Center, Container, Stack, TextInput } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { useI18nContext } from "../../i18n/i18n-react";
import { selectedUserState } from "../adminState";

export const DrawerContent = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const { LL } = useI18nContext();

  return (
    <Container px="xs">
      <Stack spacing="md">
        <Center>
          <Avatar src={selectedUser?.imgUrl} size="xl" radius="xl" />
        </Center>
        <TextInput
          disabled
          radius="md"
          label={LL.form.id()}
          value={selectedUser?.id}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.name()}
          placeholder={LL.form.placeholder.name()}
          value={selectedUser?.name}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.email()}
          placeholder={LL.form.placeholder.email()}
          value={selectedUser?.email}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.phone()}
          placeholder={LL.form.placeholder.phone()}
          value={selectedUser?.phoneNumber}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.address()}
          placeholder={LL.form.placeholder.address()}
          value={selectedUser?.address ?? "---"}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.created()}
          value={selectedUser?.createdAt}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.updated()}
          value={selectedUser?.updatedAt}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.status()}
          value={selectedUser?.status}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.role()}
          value={selectedUser?.role}
        />
        <TextInput
          disabled
          radius="md"
          label={LL.form.toysNumber()}
          value={selectedUser?.toys.length}
        />
      </Stack>
    </Container>
  );
};
