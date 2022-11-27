import {
  Card,
  Badge,
  Group,
  Avatar,
  Text,
  Image,
  createStyles,
  Button,
  Rating,
} from "@mantine/core";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../session/sessionState";
import { Toy } from "../shared/APIs/toysService";
import { SwapModal } from "./SwapModal";
import { isEditToyDrawerOpenState, selectedToyIdState } from "./toysState";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: 270,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: theme.spacing.xs + 1,
    pointerEvents: "none",
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

type ToyCardProps = Toy & {
  basic?: boolean;
};

export const ToyCard = ({
  id,
  name,
  category,
  imgUrl,
  ownerId,
  owner,
  basic,
  description,
}: ToyCardProps) => {
  const { classes } = useStyles();
  const setSelectedToyId = useSetRecoilState(selectedToyIdState);
  const currentUser = useRecoilValue(userState);
  const [opened, setOpened] = useState(false);
  const setIsEditToyDrawerOpen = useSetRecoilState(isEditToyDrawerOpenState);

  const handleSwap = () => {
    setOpened(true);
    setSelectedToyId(id);
  };

  const handleEdit = () => {
    setIsEditToyDrawerOpen(true);
    setSelectedToyId(id);
  };

  return (
    <Card withBorder p="md" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={imgUrl}
          alt={name}
          height={180}
          fit="contain"
          withPlaceholder
        />
      </Card.Section>

      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        {category}
      </Badge>

      <Text weight={700} className={classes.title} mt="xs">
        {name}
      </Text>

      <Text fw={400} c="dimmed">
        {description}
      </Text>

      {ownerId !== currentUser?.id && owner ? (
        <Group mt="lg">
          <Avatar src={owner.imgUrl} radius="sm" />
          <div>
            <Text weight={500}>{owner.name}</Text>
            <Group spacing={3} align="center">
              <Text size="xs" color="dimmed">
                {owner.rating.value ?? 0}/5
              </Text>
              <Rating value={1} count={1} fractions={10} size="xs" />
              <Text size="xs" color="dimmed">
                ({owner.rating.count})
              </Text>
            </Group>
          </div>
        </Group>
      ) : (
        <Button mt={20} fullWidth onClick={handleEdit}>
          Edit
        </Button>
      )}

      {!basic && ownerId !== currentUser?.id && (
        <>
          <Card.Section className={classes.footer} pb={0} pt="sm">
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
              owner,
              ownerId,
              description,
            }}
          />
        </>
      )}
    </Card>
  );
};
