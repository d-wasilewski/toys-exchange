import {
  Container,
  createStyles,
  Flex,
  Group,
  Navbar,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../session/sessionState";
import { Filters } from "./filters/Filters";
import { ToysList } from "./ToysList";
import { toysListState } from "./toysState";

const useStyles = createStyles((theme, _params) => {
  return {
    navbar: {
      backgroundColor: "transparent",
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  };
});

export const ToysView = () => {
  const toysListValue = useRecoilValue(toysListState);
  const user = useRecoilValue(userState);
  const [toysList, setToysList] = useState(toysListValue);
  const { classes } = useStyles();

  return (
    <>
      <Flex>
        <Navbar
          height={700}
          width={{ sm: 300 }}
          p="md"
          className={classes.navbar}
        >
          <Navbar.Section grow>
            <Title>Filters</Title>
            <Group className={classes.header}></Group>
            <Filters setToysList={setToysList} />
          </Navbar.Section>
        </Navbar>
        {/* TODO: might want to exclude fluid */}
        <Container m={0} px={30} fluid miw={1000}>
          <h1>List of all toys</h1>
          <ToysList
            toysList={toysList
              .filter((toy) => toy.ownerId !== user?.id)
              .filter((toy) => toy.status === "ACTIVE")}
          />
        </Container>
      </Flex>
    </>
  );
};
