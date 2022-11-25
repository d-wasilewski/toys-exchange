import { useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  Container,
  Avatar,
  Text,
  Flex,
} from "@mantine/core";
import {
  IconLogout,
  IconHorseToy,
  IconArrowsExchange,
  IconUser,
  IconHistory,
} from "@tabler/icons";
import { userState } from "../session/sessionState";
import { useRecoilValue } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
        navigate(`/user/${user?.id}/${item.link}`);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

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
              <Avatar
                src={
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                }
                size="lg"
                radius="xl"
              />
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
        <Container m={0} px={30} fluid>
          <Outlet context={[active]} />
        </Container>
      </Flex>
    </Container>
  );
}
