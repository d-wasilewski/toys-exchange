import { Stack, TextInput, Button, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { getErrorMessage } from "../../../shared/APIs/baseFetch";
import { sendResetPasswordEmail } from "../../../shared/APIs/userService";
import { schema } from "./emailSchema";

export const EmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await sendResetPasswordEmail(values.email);
      showNotification({
        title: "Success",
        message:
          "If your email exists, we sent you a link to reset your password",
        color: "green",
        autoClose: 5000,
      });
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
        <TextInput
          required
          radius="md"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <Button type="submit" mt="sm" fullWidth radius="md" loading={isLoading}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};
