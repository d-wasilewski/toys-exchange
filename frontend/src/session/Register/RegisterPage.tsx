import { Anchor, Container, Text, Title } from "@mantine/core";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
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
        <Anchor<"a">
          href="/login"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Log in
        </Anchor>
      </Text>

      <RegisterForm />
    </Container>
  );
};
