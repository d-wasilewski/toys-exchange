import {
  createStyles,
  Header,
  Group,
  Burger,
  Box,
  UnstyledButton,
  Avatar,
  Text,
  Image,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../session/sessionState";
import Logo from "../assets/logo.png";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: "filled",
      color: theme.primaryColor,
    }).background,
    borderBottom: 0,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80vw",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
  links: {
    link: string;
    label: string;
  }[];
}

export function AppHeader({ links }: HeaderSearchProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);

  const items = links.map((link) => {
    return (
      <Box
        key={link.label}
        className={classes.link}
        onClick={() => {
          if (link.label === "Logout") {
            setUser(null);
          }
          navigate(link.link);
        }}
      >
        {link.label}
      </Box>
    );
  });

  return (
    <Header height={56} className={classes.header} mb={120}>
      <Center>
        <div className={classes.inner}>
          <Image
            radius="md"
            src={Logo}
            alt="Random unsplash image"
            height={25}
            fit="contain"
            width={100}
          />
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          {user && (
            <UnstyledButton
              className={classes.user}
              onClick={() => navigate(`/user/${user?.id}/details`)}
            >
              <Group spacing={7}>
                <Avatar
                  src={user?.imgUrl}
                  alt={user?.name}
                  radius="xl"
                  size={20}
                />
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {user?.name}
                </Text>
              </Group>
            </UnstyledButton>
          )}
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
            color="#fff"
          />
        </div>
      </Center>
    </Header>
  );
}
