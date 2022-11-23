import {
  Card,
  Badge,
  Group,
  Avatar,
  Text,
  Image,
  createStyles,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../session/sessionState";
import { SwapModal } from "./SwapModal";
import { currentToysListState, selectedToyIdState } from "./toysState";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: 270,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

interface ToyCardProps {
  id: number;
  ownerName: string;
  ownerRating: number;
  ownerId: number;
  category: string;
  name: string;
  imgUrl: string;
  basic?: boolean;
}

export const ToyCard = ({
  id,
  name,
  category,
  imgUrl,
  ownerName,
  ownerRating,
  ownerId,
  basic,
}: ToyCardProps) => {
  const { classes } = useStyles();
  const setSelectedToyId = useSetRecoilState(selectedToyIdState);
  const currentUser = useRecoilValue(userState);
  const [opened, setOpened] = useState(false);

  const handleSwap = () => {
    setOpened(true);
    setSelectedToyId(id);
  };

  return (
    <Card withBorder p="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={imgUrl}
          alt={name}
          height={180}
          fit="contain"
          withPlaceholder
        />
      </Card.Section>

      <Badge>{category}</Badge>

      <Text weight={700} className={classes.title} mt="xs">
        {name}
      </Text>

      <Group mt="lg">
        <Avatar src={imgUrl} radius="sm" />
        <div>
          <Text weight={500}>{ownerName}</Text>
          <Text size="xs" color="dimmed">
            {ownerRating}
          </Text>
        </div>
      </Group>

      {!basic && ownerId !== currentUser?.id && (
        <>
          <Card.Section className={classes.footer}>
            <Button fullWidth onClick={handleSwap}>
              Swap
            </Button>
          </Card.Section>

          <SwapModal
            opened={opened}
            setOpened={setOpened}
            cardData={{
              id,
              name,
              category,
              imgUrl,
              ownerName,
              ownerRating,
              ownerId,
            }}
          />
        </>
      )}
    </Card>
  );
};
