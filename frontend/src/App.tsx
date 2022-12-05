import { Route, Routes } from "react-router-dom";
import { ToysView } from "./toys/ToysView";
import { ROUTES } from "./routes";
import { LoginPage } from "./session/Login/LoginPage";
import { RegisterPage } from "./session/Register/RegisterPage";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { logout } from "./shared/APIs/userService";
import { AdminPage } from "./admin/AdminPage";
import { UserPage } from "./user/UserPage";
import { UserDetails } from "./user/UserDetails";
import { UserToys } from "./user/UserToys";
import { UserActiveOffers } from "./user/UserActiveOffers";
import { UserOffersHistory } from "./user/UserOffersHistory";
import { Layout } from "./components/Layout";
import { SuspenseFallback } from "./components/SuspenseFallback";
import { Homepage } from "./components/homepage/Homepage";

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
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Layout>
        <Routes>
          <Route path={ROUTES.user} element={<UserPage />}>
            <Route
              path={ROUTES.userDetails}
              element={
                <SuspenseFallback>
                  <UserDetails />
                </SuspenseFallback>
              }
            />
            <Route
              path={ROUTES.userActiveOffers}
              element={
                <SuspenseFallback>
                  <UserActiveOffers />
                </SuspenseFallback>
              }
            />
            <Route
              path={ROUTES.userOffersHistory}
              element={
                <SuspenseFallback>
                  <UserOffersHistory />
                </SuspenseFallback>
              }
            />
            <Route
              path={ROUTES.userToys}
              element={
                <SuspenseFallback>
                  <UserToys />
                </SuspenseFallback>
              }
            />
          </Route>
          <Route
            path={ROUTES.toys}
            element={
              <SuspenseFallback>
                <ToysView />
              </SuspenseFallback>
            }
          />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />

          <Route
            path={ROUTES.admin}
            element={
              <SuspenseFallback>
                <AdminPage />
              </SuspenseFallback>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
