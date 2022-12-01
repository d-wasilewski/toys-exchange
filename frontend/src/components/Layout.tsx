import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { ROUTES } from "../routes";
import { userState } from "../session/sessionState";
import { AppHeader } from "./AppHeader";

const publicLinks = [
  { label: "Homepage", link: ROUTES.root },
  { label: "Toys", link: ROUTES.toys },
  { label: "Logout", link: ROUTES.root },
];

const adminLinks = [
  { label: "Homepage", link: ROUTES.root },
  { label: "Toys", link: ROUTES.toys },
  { label: "Admin page", link: ROUTES.admin },
  { label: "All offers", link: ROUTES.addToy },
  { label: "Logout", link: ROUTES.root },
];

const unauthenticatedLinks = [
  { label: "Login", link: ROUTES.login },
  { label: "Register", link: ROUTES.register },
];

interface AppLayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: AppLayoutProps) => {
  const user = useRecoilValue(userState);
  const links = user
    ? user?.role === "ADMIN"
      ? adminLinks
      : publicLinks
    : unauthenticatedLinks;

  return (
    <AppShell
      padding="md"
      header={<AppHeader links={links} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          // padding: 0,
        },
      })}
    >
      {children}
    </AppShell>
  );
};
