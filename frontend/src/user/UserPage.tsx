import { useEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Container,
  Avatar,
  Text,
  Flex,
  FileButton,
} from "@mantine/core";
import {
  IconHorseToy,
  IconArrowsExchange,
  IconUser,
  IconHistory,
} from "@tabler/icons";
import { userState } from "../session/sessionState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { updateAvatar } from "../shared/APIs/userService";
import { clickedUserIdState } from "../admin/adminState";
import { showNotification } from "@mantine/notifications";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import { SuspenseFallback } from "../components/SuspenseFallback";
import { useI18nContext } from "../i18n/i18n-react";
import { TranslationFunctions } from "../i18n/i18n-types";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: "transparent",
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    avatar: {
      "&:hover": {
        opacity: 0.8,
      },
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const getAdminData = (LL: TranslationFunctions) => [
  { link: "details", label: LL.profile.details.data(), icon: IconUser },
];

const getData = (LL: TranslationFunctions) => [
  { link: "details", label: LL.profile.details.data(), icon: IconUser },
  { link: "active", label: LL.profile.active(), icon: IconArrowsExchange },
  { link: "history", label: LL.profile.history(), icon: IconHistory },
  { link: "toys", label: LL.profile.toys.toys(), icon: IconHorseToy },
];

interface activePageI {
  [key: string]: string | undefined;
}

const getActivePage = (LL: TranslationFunctions): activePageI => {
  return {
    details: LL.profile.details.data(),
    active: LL.profile.active(),
    history: LL.profile.history(),
    toys: LL.profile.toys.toys(),
  } as const;
};

export function UserPage() {
  const { classes, cx } = useStyles();
  const user = useRecoilValue(userState);
  const setSelectedUserId = useSetRecoilState(clickedUserIdState);
  const navigate = useNavigate();
  const location = useLocation();
  const { LL, locale } = useI18nContext();
  const pageFromLocation =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [active, setActive] = useState(
    pageFromLocation
      ? getActivePage(LL)[pageFromLocation]
      : LL.profile.details.data()
  );

  useEffect(() => {
    setActive(
      pageFromLocation
        ? getActivePage(LL)[pageFromLocation]
        : LL.profile.details.data()
    );
  }, [locale]);

  useEffect(() => {
    if (!user) return;
    setSelectedUserId(user?.id);
  }, [user?.id]);

  const dataToDisplay = user?.role === "ADMIN" ? getAdminData(LL) : getData(LL);

  const links = dataToDisplay.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        if (user && user.id) {
          navigate(`/user/${user.id}/${item.link}`);
        }
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const handleAvatarClick = async (file: File | null) => {
    if (!user || !file) return;
    const formData = new FormData();
    formData.set("file", file);
    try {
      await updateAvatar(formData, user.id);
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.updated({ name: "Avatar" }),
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    }
  };

  return (
    // 1214 952
    <Flex>
      <Navbar
        height={700}
        width={{ sm: 300 }}
        p="md"
        className={classes.navbar}
      >
        <Navbar.Section grow>
          <Group className={classes.header}>
            <FileButton
              onChange={(file) => handleAvatarClick(file)}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Avatar
                  src={user?.imgUrl}
                  size="lg"
                  radius="xl"
                  className={classes.avatar}
                  {...props}
                />
              )}
            </FileButton>
            <Flex direction="column">
              <Text fw={500} fz="lg">
                {user?.name}
              </Text>
              <Text c="dimmed" fz="xs">
                {user?.email}
              </Text>
            </Flex>
          </Group>
          <SuspenseFallback>{links}</SuspenseFallback>
        </Navbar.Section>
      </Navbar>
      <Container m={0} px={30} fluid miw={1000}>
        <Outlet context={[active]} />
      </Container>
    </Flex>
  );
}
