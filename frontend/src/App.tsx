import { Route, Routes, useNavigate } from "react-router-dom";
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
import { ConfirmedAccount } from "./session/auth/ConfirmedAccount";
import { ResetPassword } from "./session/auth/resetPassword/ResetPassword";
import { useI18nContext } from "./i18n/i18n-react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { languageState, userState } from "./session/sessionState";
import { Locales } from "./i18n/i18n-types";

interface IDecodedToken {
  auth: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

function App() {
  const { setLocale } = useI18nContext();
  const locale = useRecoilValue(languageState);
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.authToken;

    if (token) {
      const decodedToken = jwtDecode<IDecodedToken>(token);
      if (decodedToken.exp < Date.now()) {
        logout();
        setUser(null);
        navigate("/login");
      } else {
        axios.defaults.headers.common.Authorization = token;
      }
    }
  }, [user]);

  useEffect(() => {
    const userLocale = user?.language.toLowerCase() as Locales;
    setLocale(userLocale ?? locale);
  }, [locale]);

  // probably might be changed based on user status here
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Layout>
        <Routes>
          <Route
            path={ROUTES.user}
            element={
              <SuspenseFallback>
                <UserPage />
              </SuspenseFallback>
            }
          >
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

          <Route path={ROUTES.authConfirm} element={<ConfirmedAccount />} />
          <Route path={ROUTES.authResetPassword} element={<ResetPassword />} />

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
