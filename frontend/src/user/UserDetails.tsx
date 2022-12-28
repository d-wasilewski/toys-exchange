import {
  Button,
  Group,
  Input,
  Rating,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconChevronRight } from "@tabler/icons";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { selectedUserState } from "../admin/adminState";
import { useI18nContext } from "../i18n/i18n-react";
import { userState } from "../session/sessionState";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import { editUserData } from "../shared/APIs/userService";
import { schema } from "./userDetailsValidation";

export const UserDetails = () => {
  const selectedUser = useRecoilValue(selectedUserState);
  const refreshSelectedUser = useRecoilRefresher_UNSTABLE(selectedUserState);
  const [isLoading, setIsLoading] = useState(false);
  const [active] = useOutletContext<string>();
  const setUser = useSetRecoilState(userState);
  const { LL } = useI18nContext();

  if (!selectedUser) return null;

  const form = useForm({
    initialValues: {
      name: selectedUser.name,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber,
      address: selectedUser?.address ?? "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      const editedUser = await editUserData(
        { id: selectedUser.id, ...values },
        selectedUser.etag
      );
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.updated({ name: "User" }),
        color: "green",
        autoClose: 3000,
      });
      setUser(editedUser.data);
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
    }
  };

  return (
    <>
      <Title my={20}>{active}</Title>
      <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: 500 }}>
        <Stack spacing="md">
          <TextInput
            radius="md"
            label={LL.form.name()}
            placeholder={LL.form.placeholder.name()}
            required
            value={selectedUser.name}
            {...form.getInputProps("name")}
          />
          <TextInput
            radius="md"
            label={LL.form.email()}
            placeholder={LL.form.placeholder.email()}
            required
            value={selectedUser.email}
            {...form.getInputProps("email")}
          />
          <TextInput
            radius="md"
            label={LL.form.phone()}
            placeholder={LL.form.placeholder.phone()}
            required
            value={selectedUser.phoneNumber}
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            radius="md"
            label={LL.form.address()}
            placeholder={LL.form.placeholder.address()}
            value={selectedUser.address}
            {...form.getInputProps("address")}
          />
          {/* TODO: Implement changing password */}
          <Input.Wrapper label={LL.profile.details.changePassword()}>
            <Input
              component="button"
              rightSection={<IconChevronRight stroke={1} />}
              onClick={() => console.log("Change password")}
              radius="md"
            >
              {LL.profile.details.changePassword()}
            </Input>
          </Input.Wrapper>
          <Group spacing={4} align="center">
            <Text>{LL.profile.details.rating()}: </Text>
            <Text color="dimmed">{selectedUser.rating.value ?? 0}/5</Text>
            <Rating value={1} count={1} fractions={10} readOnly />
            <Text color="dimmed">({selectedUser.rating.count})</Text>
          </Group>
        </Stack>
        {form.isDirty() && (
          <Button
            type="submit"
            mt="lg"
            fullWidth
            radius="md"
            loading={isLoading}
          >
            {LL.general.edit()}
          </Button>
        )}
      </form>
    </>
  );
};
