import styled from "styled-components";
import { LoginForm } from "./LoginForm";

export const LoginPage = () => {
  return (
    <PageWrapper>
      <h1>Login</h1>
      <LoginForm />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
