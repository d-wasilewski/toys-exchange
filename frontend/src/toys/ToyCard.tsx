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

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: 250,
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
  ownerName: string;
  ownerRating: number;
  category: string;
  name: string;
  imgUrl: string;
}

export const ToyCard = ({
  name,
  category,
  imgUrl,
  ownerName,
  ownerRating,
}: ToyCardProps) => {
  const { classes } = useStyles();

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

      <Card.Section className={classes.footer}>
        <Button fullWidth>Swap</Button>
      </Card.Section>
    </Card>
  );
};
