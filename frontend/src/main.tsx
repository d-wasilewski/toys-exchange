import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import TypesafeI18n from "./i18n/i18n-react";
import { MantineGlobalStyles } from "./MantineGlobalStyles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TypesafeI18n locale={"en"}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <MantineGlobalStyles />
        <NotificationsProvider>
          <ModalsProvider
            modalProps={{
              overlayOpacity: 0.55,
              overlayBlur: 3,
            }}
          >
            <RecoilRoot>
              <Router>
                <App />
              </Router>
            </RecoilRoot>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </TypesafeI18n>
  </React.StrictMode>
);
