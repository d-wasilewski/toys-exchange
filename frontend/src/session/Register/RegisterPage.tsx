import { Anchor, Container, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useI18nContext } from "../../i18n/i18n-react";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { LL } = useI18nContext();

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        {LL.register.welcome()}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {LL.register.alreadyHave()}{" "}
        <Anchor
          component="button"
          type="button"
          onClick={() => navigate("/login")}
        >
          {LL.login.login()}
        </Anchor>
      </Text>
      <RegisterForm />
    </Container>
  );
};
