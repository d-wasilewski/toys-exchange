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
} from "@mantine/core";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { userState } from "../session/sessionState";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import {
  blockToy,
  confirmToy,
  deleteToyById,
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
  etag,
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

  const handleSwap = () => {
    if (currentUserToys.length === 0) {
      openModal({
        title: "You dont have any toys!",
        children: (
          <>
            <Text>
              Please go{" "}
              <Anchor
                component="button"
                type="button"
                onClick={() => {
                  closeAllModals();
                  navigate(`/user/${currentUser?.id}/toys`);
                }}
              >
                to your profile
              </Anchor>{" "}
              first and add a toy or two to be able to make swaps with other
              users!
            </Text>
            <Button fullWidth onClick={() => closeAllModals()} mt="md">
              Ok
            </Button>
          </>
        ),
      });
    } else {
      setOpened(true);
      setSelectedToyId(id);
    }
  };

  const handleBlock = async () => {
    openConfirmModal({
      title: "Deactivate this toy",
      children: (
        <Text size="sm">Are you sure you want to deactivate this toy?</Text>
      ),
      labels: { confirm: "Deactivate toy", cancel: "No don't deactivate it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          setIsLoading(true);
          await blockToy(id);
          refreshToyList();
          showNotification({
            title: "Success",
            message: "Status changed successfully",
            color: "green",
            autoClose: 3000,
          });
        } catch (e) {
          const message = getErrorMessage(e);
          showNotification({
            title: "Error",
            message: message ?? "Something went wrong",
            color: "red",
            autoClose: 5000,
          });
        } finally {
          setIsLoading(false);
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
        title: "Success",
        message: "Status changed successfully",
        color: "green",
        autoClose: 3000,
      });
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
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
      title: "Please confirm your action",
      closeOnConfirm: false,
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          setIsDeleteLoading(true);
          await deleteToyById(id);
          showNotification({
            title: "Success",
            message: "Toy deleted successfully",
            color: "green",
            autoClose: 3000,
          });
          refreshMyToysList();
          closeAllModals();
        } catch (e) {
          const message = getErrorMessage(e);
          showNotification({
            title: "Error",
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

  // TODO: display status of the toy!
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

      {ownerId == currentUser?.id && (
        <Badge
          className={classes.status}
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
        >
          {status}
        </Badge>
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
            Edit
          </Button>
          <Button
            fullWidth
            color="red"
            onClick={handleDelete}
            loading={isDeleteLoading}
          >
            Delete
          </Button>
        </Stack>
      )}

      {!basicView &&
        ownerId !== currentUser?.id &&
        currentUser?.role !== "ADMIN" && (
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
                status,
              }}
            />
          </>
        )}

      {currentUser?.role === "ADMIN" && (
        <Card.Section className={classes.footer} pt="sm">
          {status === "UNCONFIRMED" ? (
            <Button
              fullWidth
              color="green"
              onClick={handleConfirm}
              loading={isLoading}
            >
              Confirm
            </Button>
          ) : (
            <Button
              fullWidth
              color="red"
              onClick={handleBlock}
              loading={isLoading}
            >
              Block
            </Button>
          )}
        </Card.Section>
      )}
    </Card>
  );
};
