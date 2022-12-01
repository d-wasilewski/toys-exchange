import {
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  Rating,
  Badge,
} from "@mantine/core";
import { useRecoilValue } from "recoil";
import { userState } from "../session/sessionState";
import { RatingType } from "../shared/APIs/userService";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: 400,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.xs,
  },
}));

interface ArticleCardVerticalProps {
  toy: {
    name: string;
    imgUrl: string;
    category: string;
  };
  user: {
    name: string;
    imgUrl: string;
    rating: RatingType;
  };
}

export function OfferDetails({ toy, user }: ArticleCardVerticalProps) {
  const currentUser = useRecoilValue(userState);
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image src={toy.imgUrl} height={120} width={180} fit="contain" />
        <div className={classes.body}>
          <Badge>{toy.category}</Badge>
          <Text className={classes.title} mt="xs" mb="md">
            {toy.name}
          </Text>
          {currentUser?.name !== user.name ? (
            <Group spacing="xs">
              <Group spacing="xs" noWrap>
                <Avatar size={20} src={user.imgUrl} />
                <Text size="xs">{user.name}</Text>
              </Group>
              <Text size="xs" color="dimmed">
                •
              </Text>
              <Text size="xs" color="dimmed">
                {user.rating.value ?? 0}/5
              </Text>
              <Rating value={1} count={1} fractions={10} size="sm" />
            </Group>
          ) : (
            <Text>You</Text>
          )}
        </div>
      </Group>
    </Card>
  );
}
