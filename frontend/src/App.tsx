import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToysView } from "./toys/ToysView";
import styled from "styled-components";
import { NAVBAR_HEIGHT } from "./components/Navbar";
import { ROUTES } from "./routes";
import { AppNavbar } from "./components/AppNavbar";
import { LoginPage } from "./session/Login/LoginPage";
import { RegisterPage } from "./session/Register/RegisterPage";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { MyToysView } from "./toys/MyToysView";
import { Suspense } from "react";
import { logout } from "./shared/APIs/userService";
import { AdminPage } from "./admin/AdminPage";
import { Loader } from "@mantine/core";
import { OfferCardList } from "./offers/OfferCardList";
import { MyOffersView } from "./offers/MyOffersView";

const links = [
  { label: "Login", url: ROUTES.login },
  { label: "Register", url: ROUTES.register },
  { label: "Toys", url: ROUTES.toys },
  { label: "My toys", url: ROUTES.myToys },
  { label: "All offers", url: ROUTES.addToy },
  { label: "Logout", url: ROUTES.root },
  { label: "Admin page", url: ROUTES.admin },
  { label: "My offers", url: ROUTES.myOffers },
];

// const authenticatedLinks = [
//   { label: "Toys", url: ROUTES.toys },
//   { label: "Logout", url: ROUTES.root },
// ];

interface IDecodedToken {
  auth: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

const token = localStorage.authToken;

if (token) {
  const decodedToken = jwtDecode<IDecodedToken>(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    logout();
    window.location.href = "/login";
  } else {
    axios.defaults.headers.common.Authorization = token;
    // get user data here
    // store.dispatch(updateUser());
    // store.dispatch(setActiveView(activeView));
  }
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppNavbar
        links={links}
        onLinkClick={(path) => navigate(path)}
        isMatch={(url) => location.pathname === url}
      />

      <PageWrapper>
        <Routes>
          <Route path="/" element={<div>Homepage</div>} />
          <Route
            path="/toys"
            element={
              <Suspense>
                <ToysView />
              </Suspense>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/my-toys"
            element={
              <Suspense>
                <MyToysView />
              </Suspense>
            }
          />
          <Route
            path="/my-offers"
            element={
              <Suspense>
                <MyOffersView />
              </Suspense>
            }
          />
          <Route
            path="/add-toy"
            element={
              <Suspense fallback={<Loader />}>
                <OfferCardList />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <Suspense fallback={<Loader />}>
                <AdminPage />
              </Suspense>
            }
          />
        </Routes>
      </PageWrapper>
    </>
  );
}

export default App;

const PageWrapper = styled.div`
  padding-top: ${NAVBAR_HEIGHT}px;
  width: 100vw;
  /* height: ${`calc(100vh - ${NAVBAR_HEIGHT}px)`}; */
`;
