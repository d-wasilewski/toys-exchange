import {
  Group,
  Button,
  Text,
  Flex,
  Popover,
  Rating,
  Center,
  Stack,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilRefresher_UNSTABLE } from "recoil";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import {
  acceptOffer,
  declineOffer,
  OfferRating,
  OfferStatus,
} from "../shared/APIs/offerService";
import { rateUser } from "../shared/APIs/userService";
import { myHistoryOffersState } from "./offersState";

interface ActionButtonsProps {
  offerId: string;
  status: OfferStatus;
  userToRateId: string;
  offerRating: OfferRating;
}

export const ActionButtons = ({
  offerId,
  status,
  userToRateId,
  offerRating,
}: ActionButtonsProps) => {
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState(false);
  // const [ratingValue, setRatingValue] = useState(0);
  const historyListRefresh = useRecoilRefresher_UNSTABLE(myHistoryOffersState);

  const handleAccept = () => {
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a
          modal. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "green" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          setIsDeclineLoading(true);
          await acceptOffer(offerId);
          showNotification({
            title: "Success",
            message: "Offer accepted successfully",
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
          setIsDeclineLoading(false);
        }
      },
    });
  };

  const handleDecline = () => {
    openConfirmModal({
      title: "Delete your profile",
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          setIsAcceptLoading(true);
          await declineOffer(offerId);
          showNotification({
            title: "Success",
            message: "Offer declined successfully",
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
          setIsAcceptLoading(false);
        }
      },
    });
  };

  const handleUserRate = async (rateValue: number) => {
    try {
      await rateUser({ value: rateValue, userId: userToRateId, offerId });
      showNotification({
        title: "Success",
        message: "User rated successfully",
        color: "green",
        autoClose: 3000,
      });
      historyListRefresh();
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: "Error",
        message: message ?? "Something went wrong",
        color: "red",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      {(() => {
        switch (status) {
          case "PENDING":
            return (
              <Group>
                <Button
                  color="green"
                  onClick={handleAccept}
                  loading={isAcceptLoading}
                >
                  Accept
                </Button>
                <Button
                  color="red"
                  onClick={handleDecline}
                  loading={isDeclineLoading}
                >
                  Decline
                </Button>
              </Group>
            );
          case "ACCEPTED": {
            return (
              <>
                {offerRating ? (
                  <Stack justify="center" spacing={0}>
                    <Text align="center">Your rate:</Text>
                    <Rating mt={4} value={offerRating.value} readOnly />
                  </Stack>
                ) : (
                  <Popover width={250} position="bottom" withArrow shadow="md">
                    <Popover.Target>
                      <Button>Rate user</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Center>
                        <Text size="sm">
                          How did you like the exchange?
                          <Rating
                            mt={4}
                            defaultValue={2}
                            size="xl"
                            fractions={2}
                            onChange={(val) => {
                              handleUserRate(val);
                            }}
                          />
                        </Text>
                      </Center>
                    </Popover.Dropdown>
                  </Popover>
                )}
              </>
            );
          }
          case "DECLINED": {
            return (
              <Button disabled color="grape">
                Declined
              </Button>
            );
          }
          default:
            break;
        }
      })()}
    </>
  );
};
