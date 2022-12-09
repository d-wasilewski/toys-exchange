import { Anchor, Container, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Container size={420} my={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Don't have an account?{" "}
        <Anchor
          component="button"
          type="button"
          onClick={() => navigate("/register")}
        >
          Register
        </Anchor>
      </Text>

      <LoginForm />
    </Container>
  );
};
