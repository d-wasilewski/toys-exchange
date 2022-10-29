import axios from "axios";
import { useFormik } from "formik";
import styled from "styled-components";
import { AppNavbar } from "../../components/AppNavbar";
import Input from "../../components/Input";

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    onSubmit: async (values) => {
      axios.post("http://localhost:3000/user/login", values);
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="App">
        <h1>Login</h1>
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};
