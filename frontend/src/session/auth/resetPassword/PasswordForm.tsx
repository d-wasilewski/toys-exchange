import { Stack, Button, Text, PasswordInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18nContext } from "../../../i18n/i18n-react";
import { getErrorMessage } from "../../../shared/APIs/baseFetch";
import { resetPassword } from "../../../shared/APIs/userService";
import { schema } from "./resetSchema";

export const PasswordForm = ({ token }: { token: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const navigate = useNavigate();
  const { LL } = useI18nContext();

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema(LL)),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      await resetPassword(token, values.password);
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.resetPasswordConfirmation(),
        color: "green",
        autoClose: 5000,
      });
      navigate("/login");
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

        <PasswordInput
          withAsterisk
          radius="md"
          label={LL.form.password()}
          placeholder={LL.form.placeholder.password()}
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          withAsterisk
          radius="md"
          label={LL.form.confirmPassword()}
          placeholder={LL.form.placeholder.password()}
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit" mt="sm" fullWidth radius="md" loading={isLoading}>
          {LL.login.reset()}
        </Button>
      </Stack>
    </form>
  );
};
