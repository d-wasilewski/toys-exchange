import { Anchor, Container, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor
          component="button"
          type="button"
          onClick={() => navigate("/login")}
        >
          Log in
        </Anchor>
      </Text>
      <RegisterForm />
    </Container>
  );
};
