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
  IconLogout,
  IconHorseToy,
  IconArrowsExchange,
  IconUser,
  IconHistory,
} from "@tabler/icons";
import { userState } from "../session/sessionState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";
import { updateAvatar } from "../shared/APIs/userService";
import { clickedUserIdState } from "../admin/adminState";
import { showNotification } from "@mantine/notifications";
import { getErrorMessage } from "../shared/APIs/baseFetch";

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

const data = [
  { link: "details", label: "Your data", icon: IconUser },
  { link: "active", label: "Active offers", icon: IconArrowsExchange },
  { link: "history", label: "Offers history", icon: IconHistory },
  { link: "toys", label: "Your toys", icon: IconHorseToy },
];

export function UserPage() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Your data");
  const user = useRecoilValue(userState);
  const setSelectedUserId = useSetRecoilState(clickedUserIdState);
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log({ location: location.pathname.split("/").at(-1) });

  useEffect(() => {
    if (!user) return;
    console.log("Dupa");
    setSelectedUserId(user?.id);
  }, [user?.id]);

  const links = data.map((item) => (
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
        title: "Success",
        message: "Avatar updated successfully",
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    }
  };

  return (
    // 1214 952
    <Container size={1514} mt={30}>
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
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
        {/* TODO: might want to exclude fluid */}
        <Container m={0} px={30} fluid miw={1000}>
          <Outlet context={[active]} />
        </Container>
      </Flex>
    </Container>
  );
}
