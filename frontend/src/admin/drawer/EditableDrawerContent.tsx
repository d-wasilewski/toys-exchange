import {
  Avatar,
  Button,
  Center,
  Container,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useI18nContext } from "../../i18n/i18n-react";
import { TranslationFunctions } from "../../i18n/i18n-types";
import { getErrorMessage } from "../../shared/APIs/baseFetch";
import {
  editUserDataByAdmin,
  UserRole,
  UserStatus,
} from "../../shared/APIs/userService";
import {
  isAdminDrawerOpenedState,
  selectedUserState,
  usersListState,
} from "../adminState";
import { schema } from "./validateEditableContent";

interface RoleSelect {
  value: UserRole;
  label: string;
}

const getRolesData = (LL: TranslationFunctions): RoleSelect[] => [
  { value: "BASIC", label: LL.admin.roles({ role: "BASIC" }) },
  { value: "ADMIN", label: LL.admin.roles({ role: "ADMIN" }) },
];

interface StatusSelect {
  value: UserStatus;
  label: string;
}

const getStatusData = (LL: TranslationFunctions): StatusSelect[] => [
  { value: "ACTIVE", label: LL.admin.statuses({ status: "ACTIVE" }) },
  { value: "BLOCKED", label: LL.admin.statuses({ status: "BLOCKED" }) },
];

export const EditableDrawerContent = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const refreshSelectedUser = useRecoilRefresher_UNSTABLE(selectedUserState);
  const refreshTable = useRecoilRefresher_UNSTABLE(usersListState);
  const [isLoading, setIsLoading] = useState(false);
  const setIsDrawerOpen = useSetRecoilState(isAdminDrawerOpenedState);
  const { LL } = useI18nContext();

  if (!selectedUser) return null;

  const form = useForm({
    initialValues: {
      name: selectedUser.name,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber,
      address: selectedUser?.address ?? "---",
      status: selectedUser.status,
      role: selectedUser.role,
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await editUserDataByAdmin(
        { id: selectedUser.id, ...values },
        selectedUser.etag
      );
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.updated({ name: "User" }),
        color: "green",
        autoClose: 3000,
      });
      refreshSelectedUser();
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
      setIsDrawerOpen(false);
      refreshTable();
    }
  };

  return (
    <Container px="xs">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <Center>
            <Avatar src={selectedUser.imgUrl} size="xl" radius="xl" />
          </Center>
          <TextInput
            disabled
            radius="md"
            label={LL.form.id()}
            value={selectedUser.id}
          />
          <TextInput
            radius="md"
            label={LL.form.name()}
            placeholder={LL.form.placeholder.name()}
            value={selectedUser.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            label={LL.form.email()}
            placeholder={LL.form.placeholder.email()}
            value={selectedUser.email}
            {...form.getInputProps("email")}
          />
          <TextInput
            radius="md"
            label={LL.form.phone()}
            placeholder={LL.form.placeholder.phone()}
            value={selectedUser.phoneNumber}
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            radius="md"
            label={LL.form.address()}
            placeholder={LL.form.placeholder.address()}
            value={selectedUser?.address}
            {...form.getInputProps("address")}
          />
          {/* <TextInput
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
        /> */}
          <Select
            label={LL.form.status()}
            radius="md"
            data={getStatusData(LL)}
            {...form.getInputProps("status")}
          />
          <Select
            label={LL.form.role()}
            radius="md"
            data={getRolesData(LL)}
            {...form.getInputProps("role")}
          />
          <TextInput
            disabled
            radius="md"
            label={LL.form.toysNumber()}
            value={selectedUser.toys.length}
          />
        </Stack>
        <Button type="submit" mt="lg" fullWidth radius="md" loading={isLoading}>
          {LL.general.edit()}
        </Button>
      </form>
    </Container>
  );
};
