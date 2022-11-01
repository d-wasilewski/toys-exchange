import styled from "styled-components";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  return (
    <PageWrapper>
      <h1>Register</h1>
      <RegisterForm />
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
