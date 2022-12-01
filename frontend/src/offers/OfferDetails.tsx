import {
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  Rating,
  Badge,
  Stack,
  Flex,
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
          <Text className={classes.title} mt="xs" mb="xs">
            {toy.name}
          </Text>
          {currentUser?.name !== user.name ? (
            <Stack spacing={2}>
              <Group spacing="xs" noWrap>
                <Avatar size={20} src={user.imgUrl} />
                <Text size="sm">{user.name}</Text>
              </Group>
              <Flex align="center" gap={2}>
                <Text size="sm" color="dimmed">
                  {user.rating.value ?? 0}/5
                </Text>
                <Rating value={1} count={1} readOnly size="xs" />
                <Text size="sm" color="dimmed">
                  ({user.rating.count})
                </Text>
              </Flex>
            </Stack>
          ) : (
            <Text align="center" sx={{ height: 45 }}>
              Your toy
            </Text>
          )}
        </div>
      </Group>
    </Card>
  );
}
