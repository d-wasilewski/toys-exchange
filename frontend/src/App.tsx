import "./App.css";
import Input from "./components/Input";
import { useFormik } from "formik";
import axios from "axios";

function App() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      axios.post("http://localhost:3000/user/sign-up", values);
      console.log(values);
      const users = await axios.get("http://localhost:3000/user/users");
      console.log(users);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="App">
        <h1>Vite + React</h1>
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default App;
