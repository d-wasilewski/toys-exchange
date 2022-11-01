import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Input from "../../components/Input";
import { jwtTokenState } from "../sessionState";

export const LoginForm = () => {
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await axios.post(
          "http://localhost:3000/auth/login",
          values
        );
        setJwtToken(data.data.access_token);
      } catch (error) {
        console.log(error);
      } finally {
        navigate("/toys");
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
