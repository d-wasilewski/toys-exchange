import { Stack, TextInput, Button, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useI18nContext } from "../../../i18n/i18n-react";
import { getErrorMessage } from "../../../shared/APIs/baseFetch";
import { sendResetPasswordEmail } from "../../../shared/APIs/userService";
import { schema } from "./emailSchema";

export const EmailForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { LL } = useI18nContext();

  const form = useForm({
    initialValues: {
      email: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema(LL)),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await sendResetPasswordEmail(values.email);
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.resetPasswordEmail(),
        color: "green",
        autoClose: 5000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
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
          {LL.login.reset()}
        </Text>
        <TextInput
          required
          radius="md"
          label={LL.form.email()}
          placeholder={LL.form.placeholder.email()}
          {...form.getInputProps("email")}
        />
        <Button type="submit" mt="sm" fullWidth radius="md" loading={isLoading}>
          {LL.login.reset()}
        </Button>
      </Stack>
    </form>
  );
};
