import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { detectLocale, navigatorDetector } from "typesafe-i18n/detectors";
import App from "./App";
import TypesafeI18n from "./i18n/i18n-react";
import { loadAllLocales } from "./i18n/i18n-util.sync";
import { MantineGlobalStyles } from "./MantineGlobalStyles";

loadAllLocales();
const detectedLocale = detectLocale("en", ["en", "pl"], navigatorDetector);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TypesafeI18n locale={detectedLocale}>
      <RecoilRoot>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <MantineGlobalStyles />
          <NotificationsProvider>
            <ModalsProvider
              modalProps={{
                overlayOpacity: 0.55,
                overlayBlur: 3,
              }}
            >
              <Router>
                <App />
              </Router>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </RecoilRoot>
    </TypesafeI18n>
  </React.StrictMode>
);
