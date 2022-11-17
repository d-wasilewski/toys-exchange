import { Anchor, Container, Text, Title } from "@mantine/core";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
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
        <Anchor<"a">
          href="/login"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Register
        </Anchor>
      </Text>

      <LoginForm />
    </Container>
  );
};
