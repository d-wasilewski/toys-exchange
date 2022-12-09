import { Stack, Button, Text, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../shared/APIs/baseFetch";
import { resetPassword } from "../../../shared/APIs/userService";
import { schema } from "./resetSchema";

export const PasswordForm = ({ token }: { token: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await resetPassword(token, values.password);
      showNotification({
        title: "Success",
        message: "Your password has been reset",
        color: "green",
        autoClose: 5000,
      });
      navigate("/login");
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
        message,
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack>
        <Text size="lg" weight={500}>
          Reset your password
        </Text>

        <PasswordInput
          withAsterisk
          radius="md"
          label="Password"
          placeholder="strongPassword123"
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          withAsterisk
          radius="md"
          label="Confirm password"
          placeholder="strongPassword123"
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit" mt="sm" fullWidth radius="md" loading={isLoading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
