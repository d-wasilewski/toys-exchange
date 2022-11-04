import { useFormik } from "formik";
import styled from "styled-components";
import Input from "../../components/Input";
import { loginUser } from "../../shared/APIs/userService";
import { useSuccessfulLoginHandler } from "../useSuccessfulLoginHandler";

export const LoginForm = () => {
  const { setUserAndRedirect } = useSuccessfulLoginHandler();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await loginUser(values as never);

        await setUserAndRedirect(data.access_token);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <Input
          placeholder="John"
          name="name"
          label="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <Input
          placeholder="password"
          name="password"
          label="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <ButtonWrapper>
          <button type="submit">Submit</button>
        </ButtonWrapper>
      </div>
    </form>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 100px;
`;
