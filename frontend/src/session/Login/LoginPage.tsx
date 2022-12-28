import { Anchor, Container, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useI18nContext } from "../../i18n/i18n-react";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { LL } = useI18nContext();

  return (
    <Container size={420} my={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {LL.login.welcomeBack()}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {LL.login.noAccount()}{" "}
        <Anchor
          component="button"
          type="button"
          onClick={() => navigate("/register")}
        >
          {LL.register.register()}
        </Anchor>
      </Text>

      <LoginForm />
    </Container>
  );
};
