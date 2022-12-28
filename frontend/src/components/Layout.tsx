import { AppShell } from "@mantine/core";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { useI18nContext } from "../i18n/i18n-react";
import { ROUTES } from "../routes";
import { userState } from "../session/sessionState";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: AppLayoutProps) => {
  const user = useRecoilValue(userState);
  const { LL } = useI18nContext();

  const publicLinks = [
    { label: LL.links.homepage(), link: ROUTES.root },
    { label: LL.links.toys(), link: ROUTES.toys },
    { label: LL.links.logout(), link: ROUTES.root },
  ];

  const adminLinks = [
    { label: LL.links.homepage(), link: ROUTES.root },
    { label: LL.links.toys(), link: ROUTES.toys },
    { label: LL.links.adminPage(), link: ROUTES.admin },
    { label: LL.links.logout(), link: ROUTES.root },
  ];

  const unauthenticatedLinks = [
    { label: LL.links.login(), link: ROUTES.login },
    { label: LL.links.register(), link: ROUTES.register },
  ];

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
        },
      })}
    >
      {children}
    </AppShell>
  );
};
