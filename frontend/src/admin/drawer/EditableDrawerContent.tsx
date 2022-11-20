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
import { getErrorMessage } from "../../shared/APIs/baseFetch";
import {
  editUserData,
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

const rolesData: RoleSelect[] = [
  { value: "BASIC", label: "Basic" },
  { value: "ADMIN", label: "Admin" },
];

interface StatusSelect {
  value: UserStatus;
  label: string;
}

const statusData: StatusSelect[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "BLOCKED", label: "Blocked" },
];

export const EditableDrawerContent = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const refreshTable = useRecoilRefresher_UNSTABLE(usersListState);
  const [isLoading, setIsLoading] = useState(false);
  const setIsDrawerOpen = useSetRecoilState(isAdminDrawerOpenedState);

  if (!selectedUser) return null;

  const form = useForm({
    initialValues: {
      name: selectedUser.name,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber,
      status: selectedUser.status,
      role: selectedUser.role,
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await editUserData({ id: selectedUser.id, ...values });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
      setIsDrawerOpen(false);
      refreshTable();
      showNotification({
        title: "Success",
        message: "User updated successfully",
        color: "green",
        autoClose: 3000,
      });
    }
  };

  return (
    <Container px="xs">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <Center>
            <Avatar
              src={
                "https://media.distractify.com/brand-img/0E-t9gohB/0x0/jordan-baker-all-american-real-person-3-1585691486739.jpg"
              }
              size="xl"
              radius="xl"
            />
          </Center>
          <TextInput disabled radius="md" label="Id" value={selectedUser.id} />
          <TextInput
            radius="md"
            label="Name"
            value={selectedUser.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            label="Email"
            value={selectedUser.email}
            {...form.getInputProps("email")}
          />
          <TextInput
            radius="md"
            label="Phone number"
            value={selectedUser.phoneNumber}
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            disabled
            radius="md"
            label="Created at"
            value={selectedUser.createdAt}
          />
          <Select
            label="Status"
            radius="md"
            data={statusData}
            {...form.getInputProps("status")}
          />
          <Select
            label="Role"
            radius="md"
            data={rolesData}
            {...form.getInputProps("role")}
          />
          <TextInput
            disabled
            radius="md"
            label="Number of toys"
            value={selectedUser.toys.length}
          />
        </Stack>
        <Button type="submit" mt="lg" fullWidth radius="md" loading={isLoading}>
          Edit
        </Button>
      </form>
    </Container>
  );
};
