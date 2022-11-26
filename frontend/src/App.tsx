import { Route, Routes } from "react-router-dom";
import { ToysView } from "./toys/ToysView";
import { ROUTES } from "./routes";
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
import { UserPage } from "./user/UserPage";
import { UserDetails } from "./user/UserDetails";
import { UserToys } from "./user/UserToys";
import { UserActiveOffers } from "./user/UserActiveOffers";
import { UserOffersHistory } from "./user/UserOffersHistory";
import { Layout } from "./components/Layout";

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
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<div>Homepage</div>} />
        <Route path={ROUTES.user} element={<UserPage />}>
          <Route path={ROUTES.userDetails} element={<UserDetails />} />
          <Route
            path={ROUTES.userActiveOffers}
            element={
              <Suspense>
                <UserActiveOffers />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.userOffersHistory}
            element={
              <Suspense>
                <UserOffersHistory />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.userToys}
            element={
              <Suspense>
                <UserToys />
              </Suspense>
            }
          />
        </Route>
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
    </Layout>
  );
}

export default App;
