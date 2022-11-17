import { loginUser } from "../../shared/APIs/userService";
import { useSuccessfulLoginHandler } from "../useSuccessfulLoginHandler";
import { Button, Paper, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { schema } from "./validateSchema";
import { getErrorMessage } from "../../shared/APIs/baseFetch";
import { showNotification } from "@mantine/notifications";

export const LoginForm = () => {
  const [visible, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserAndRedirect } = useSuccessfulLoginHandler();

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
      await setUserAndRedirect(data.access_token);
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
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack spacing="md">
          <TextInput
            required
            radius="md"
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            withAsterisk
            radius="md"
            label="Password"
            placeholder=""
            visible={visible}
            onVisibilityChange={toggle}
            {...form.getInputProps("password")}
          />
        </Stack>
        <Button type="submit" mt="md" fullWidth radius="md" loading={isLoading}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};
