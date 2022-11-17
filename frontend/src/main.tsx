import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import { MantineGlobalStyles } from "./MantineGlobalStyles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <MantineGlobalStyles />
      <NotificationsProvider>
        <RecoilRoot>
          <Router>
            <App />
          </Router>
        </RecoilRoot>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
