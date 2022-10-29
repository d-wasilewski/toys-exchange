import "./App.css";
import Input from "./components/Input";
import { useFormik } from "formik";
import axios from "axios";
import { Route, Routes, useRoutes } from "react-router-dom";
import { LoginForm } from "./session/Login/LoginForm";
import { RegisterForm } from "./session/Register/RegisterForm";
import { ToysView } from "./toys/ToysView";
import styled from "styled-components";
import { NAVBAR_HEIGHT } from "./components/Navbar";

function App() {
  return (
    <PageWrapper>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/toys" element={<ToysView />} />
      </Routes>
    </PageWrapper>
  );
}

export default App;

const PageWrapper = styled.div`
  padding-top: ${NAVBAR_HEIGHT}px;
  /* height: ${`calc(100vh - ${NAVBAR_HEIGHT}rem)`}; */
`;
