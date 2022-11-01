import axios from "axios";
import { useFormik } from "formik";
import styled from "styled-components";
import Input from "../../components/Input";

export const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      axios.post("http://localhost:3000/auth/sign-up", values);
      console.log(values);
      const users = await axios.get("http://localhost:3000/user/users");
      console.log(users);
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
          placeholder="john@doe.com"
          name="email"
          label="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          placeholder="password"
          name="password"
          label="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <Input
          placeholder="password"
          name="confirmPassword"
          label="Confirm password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
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
