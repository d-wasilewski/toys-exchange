import { Center, Paper } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { EmailForm } from "./EmailForm";
import { PasswordForm } from "./PasswordForm";

export const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  return (
    <Center style={{ height: "80%" }}>
      <Paper withBorder p="lg" radius="md" shadow="md" style={{ width: 400 }}>
        {token ? <PasswordForm token={token} /> : <EmailForm />}
      </Paper>
    </Center>
  );
};
