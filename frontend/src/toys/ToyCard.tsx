import { ThemeContext } from "@emotion/react";
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
  Anchor,
  Stack,
  Tooltip,
} from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconExclamationCircle } from "@tabler/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useI18nContext } from "../i18n/i18n-react";
import { userState } from "../session/sessionState";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import {
  confirmToy,
  deleteToyById,
  reportToy,
  Toy,
} from "../shared/APIs/toysService";
import { SwapModal } from "./SwapModal";
import {
  currentToysListState,
  isEditToyDrawerOpenState,
  selectedToyIdState,
  toysListState,
} from "./toysState";

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

  status: {
    position: "absolute",
    top: theme.spacing.xs,
    left: theme.spacing.xs + 1,
    pointerEvents: "none",
  },

  report: {
    position: "absolute",
    top: theme.spacing.xs - 4,
    left: theme.spacing.xs - 26,
    background: "transparent",
    marginLeft: 10,

    "&:hover": {
      background: theme.colors.red[0],
    },
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
  basicView?: boolean;
  etag?: string;
};

export const ToyCard = ({
  id,
  name,
  category,
  imgUrl,
  ownerId,
  owner,
  basicView,
  description,
  status,
}: ToyCardProps) => {
  const { classes } = useStyles();
  const setSelectedToyId = useSetRecoilState(selectedToyIdState);
  const currentUser = useRecoilValue(userState);
  const [opened, setOpened] = useState(false);
  const setIsEditToyDrawerOpen = useSetRecoilState(isEditToyDrawerOpenState);
  const refreshToyList = useRecoilRefresher_UNSTABLE(toysListState);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const currentUserToys = useRecoilValue(currentToysListState);
  const refreshMyToysList = useRecoilRefresher_UNSTABLE(currentToysListState);
  const navigate = useNavigate();
  const { LL } = useI18nContext();

  const handleSwap = () => {
    if (currentUserToys.length === 0) {
      openModal({
        title: LL.toy.swap.noToys(),
        children: (
          <>
            {!currentUser ? (
              <Text>{LL.toy.swap.loginFirst()}</Text>
            ) : (
              <Text>
                {LL.toy.swap.pleaseGo()}{" "}
                <Anchor
                  component="button"
                  type="button"
                  onClick={() => {
                    closeAllModals();
                    navigate(`/user/${currentUser?.id}/toys`);
                  }}
                >
                  {LL.toy.swap.toProfile()}
                </Anchor>{" "}
                {LL.toy.swap.andAddToy()}
              </Text>
            )}
            <Button fullWidth onClick={() => closeAllModals()} mt="md">
              {LL.general.ok()}
            </Button>
          </>
        ),
      });
    } else {
      setOpened(true);
      setSelectedToyId(id);
    }
  };

  const handleReport = async () => {
    openConfirmModal({
      title: LL.toy.reportToy.title(),
      children: <Text size="sm">{LL.toy.reportToy.text()}</Text>,
      labels: {
        confirm: LL.toy.reportToy.yes(),
        cancel: LL.toy.reportToy.no(),
      },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          await reportToy(id);
          refreshToyList();
          showNotification({
            title: LL.notifications.success(),
            message: LL.notifications.reported(),
            color: "green",
            autoClose: 3000,
          });
        } catch (e) {
          const message = getErrorMessage(e);
          showNotification({
            title: LL.notifications.error(),
            message: message ?? "Something went wrong",
            color: "red",
            autoClose: 5000,
          });
        }
      },
    });
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await confirmToy(id);
      refreshToyList();
      showNotification({
        title: LL.notifications.success(),
        message: LL.notifications.statusChanged(),
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditToyDrawerOpen(true);
    setSelectedToyId(id);
  };

  const handleDelete = () => {
    openConfirmModal({
      title: LL.toy.confirmDelete.title(),
      closeOnConfirm: false,
      children: <Text size="sm">{LL.toy.confirmDelete.text()}</Text>,
      labels: { confirm: LL.general.delete(), cancel: LL.general.cancel() },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          setIsDeleteLoading(true);
          await deleteToyById(id);
          showNotification({
            title: LL.notifications.success(),
            message: LL.notifications.deleted({ name: "Toy" }),
            color: "green",
            autoClose: 3000,
          });
          refreshMyToysList();
          closeAllModals();
        } catch (e) {
          const message = getErrorMessage(e);
          showNotification({
            title: LL.notifications.error(),
            message: message ?? "Something went wrong",
            color: "red",
            autoClose: 5000,
          });
        } finally {
          setIsDeleteLoading(false);
        }
      },
    });
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
        {LL.toy.category({ category })}
      </Badge>

      {ownerId == currentUser?.id && (
        <Badge
          className={classes.status}
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
        >
          {LL.toy.status({ status })}
        </Badge>
      )}

      {ownerId !== currentUser?.id && currentUser?.role === "BASIC" && (
        <Tooltip label={LL.toy.reportToy.title()}>
          <Button
            size="xs"
            className={classes.report}
            color="red"
            onClick={() => handleReport()}
          >
            <IconExclamationCircle color="#FA5252" />
          </Button>
        </Tooltip>
      )}

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
        <Stack>
          <Button mt={20} fullWidth onClick={handleEdit}>
            {LL.general.edit()}
          </Button>
          <Button
            fullWidth
            color="red"
            onClick={handleDelete}
            loading={isDeleteLoading}
          >
            {LL.general.delete()}
          </Button>
        </Stack>
      )}

      {!basicView &&
        ownerId !== currentUser?.id &&
        currentUser?.role !== "ADMIN" && (
          <>
            <Card.Section className={classes.footer} pb={0} pt="sm">
              <Button fullWidth onClick={handleSwap}>
                {LL.toy.swap.swap()}
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
                status,
              }}
            />
          </>
        )}

      {currentUser?.role === "ADMIN" && (
        <>
          {status === "REPORTED" && (
            <Card.Section className={classes.footer} pt="sm">
              <Stack>
                <Button
                  fullWidth
                  color="green"
                  onClick={handleConfirm}
                  loading={isLoading}
                >
                  {LL.general.activate()}
                </Button>
                <Button
                  fullWidth
                  color="red"
                  onClick={handleDelete}
                  loading={isLoading}
                >
                  {LL.general.delete()}
                </Button>
              </Stack>
            </Card.Section>
          )}
        </>
      )}
    </Card>
  );
};
