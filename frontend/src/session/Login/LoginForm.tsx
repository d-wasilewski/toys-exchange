import { loginUser } from "../../shared/APIs/userService";
import { useSuccessfulLoginHandler } from "../useSuccessfulLoginHandler";
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { schema } from "./validateSchema";
import { getErrorMessage } from "../../shared/APIs/baseFetch";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { useI18nContext } from "../../i18n/i18n-react";

export const LoginForm = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserAndRedirect } = useSuccessfulLoginHandler();
  const navigate = useNavigate();
  const { LL } = useI18nContext();

  const form = useForm({
    initialValues: {
      name: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(schema),
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      setIsLoading(true);
      // temp fix
      const data = await loginUser(values as never);
      await setUserAndRedirect(data.data.access_token);
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
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack spacing="md">
          <TextInput
            required
            radius="md"
            label={LL.form.email()}
            placeholder={LL.form.placeholder.email()}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            withAsterisk
            radius="md"
            label={LL.form.password()}
            placeholder={LL.form.placeholder.password()}
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("password")}
          />
        </Stack>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          <Anchor
            component="button"
            type="button"
            onClick={() => navigate("/auth/resetPassword")}
          >
            {LL.login.reset()}
          </Anchor>
        </Text>
        <Button type="submit" mt="sm" fullWidth radius="md" loading={isLoading}>
          {LL.login.login()}
        </Button>
      </form>
    </Paper>
  );
};
