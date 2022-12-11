import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
} from "@mantine/core";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { I18nContext, useI18nContext } from "../../i18n/i18n-react";
import { AccordionFAQ } from "./AccordionFAQ";
import { ContactUs } from "./ContactUs";
import { Features } from "./Features";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1599623560574-39d485900c95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginTop: 54,
  },

  container: {
    height: `calc(100vh - 54px)`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: theme.spacing.xl * 6,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: 500,
      paddingBottom: theme.spacing.xl * 3,
    },
  },

  title: {
    color: theme.white,
    fontSize: 60,
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 40,
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: theme.spacing.xl * 1.5,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export function Homepage() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.hero}>
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container}>
          <Title className={classes.title}>Play & Swap & Repeat</Title>
          <Text className={classes.description} size="xl" mt="xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
            dolores. Ipsa delectus quasi laudantium itaque id tenetur odit
            necessitatibus reiciendis ratione doloribus dolor neque laborum
            voluptas quisquam dicta, rerum aliquam.
          </Text>

          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.control}
            onClick={() => navigate("/toys")}
          >
            Get started
          </Button>
        </Container>
      </div>
      <Features />
      <Container>
        <AccordionFAQ />
      </Container>
      <Container>
        <ContactUs />
      </Container>
    </>
  );
}
