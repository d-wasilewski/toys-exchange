import {
  Group,
  Button,
  Text,
  Popover,
  Rating,
  Center,
  Stack,
  Badge,
} from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilRefresher_UNSTABLE, useRecoilValue } from "recoil";
import { SuspenseFallback } from "../components/SuspenseFallback";
import { userState } from "../session/sessionState";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import {
  acceptOffer,
  declineOffer,
  OfferRating,
  OfferStatus,
  OfferUser,
} from "../shared/APIs/offerService";
import { rateUser } from "../shared/APIs/userService";
import { myHistoryOffersState } from "./offersState";
import { SecondLayerSwapModal } from "./SecondLayerSwapModal";

interface ActionButtonsProps {
  offerId: string;
  status: OfferStatus;
  userToRateId: string;
  offerSenderRating: OfferRating;
  offerReceiverRating: OfferRating;
  offerSender: OfferUser;
  offerReceiver: OfferUser;
  adminPage?: boolean;
}

export const ActionButtons = ({
  offerId,
  status,
  userToRateId,
  offerSenderRating,
  offerReceiverRating,
  offerSender,
  offerReceiver,
  adminPage,
}: ActionButtonsProps) => {
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState(false);
  const currentUser = useRecoilValue(userState);
  const historyListRefresh = useRecoilRefresher_UNSTABLE(myHistoryOffersState);

  const isSender = offerSender.id === currentUser?.id;
  const isReceiver = offerReceiver.id === currentUser?.id;

  const handleAccept = () => {
    openConfirmModal({
      title: "Please confirm your action",
      closeOnConfirm: false,
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
          openModal({
            title: "Swap complete",
            children: (
              <SuspenseFallback>
                <SecondLayerSwapModal userId={offerSender.id} />
              </SuspenseFallback>
            ),
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
      await rateUser({
        value: rateValue,
        userId: userToRateId,
        offerId,
        sentBy: isSender ? "sender" : "receiver",
      });
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
      {adminPage
        ? (() => {
            switch (status) {
              case "PENDING":
                return (
                  <Badge color="yellow" size="xl">
                    PENDING
                  </Badge>
                );
              case "ACCEPTED":
                return (
                  <Stack spacing={0} justify="center">
                    <Badge color="green" size="xl">
                      Accepted
                    </Badge>
                    {offerSenderRating && (
                      <Group spacing={2} mt={4}>
                        <Text align="center">Sender rate: </Text>
                        <Rating value={offerSenderRating.value} readOnly />
                      </Group>
                    )}
                    {offerReceiverRating && (
                      <Group spacing={2} mt={4}>
                        <Text align="center">Receiver rate: </Text>
                        <Rating value={offerReceiverRating.value} readOnly />
                      </Group>
                    )}
                  </Stack>
                );
              case "DECLINED":
                return (
                  <Badge color="gray" size="xl">
                    DECLINED
                  </Badge>
                );

              default:
                break;
            }
          })()
        : (() => {
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
                    {isReceiver ? (
                      offerReceiverRating ? (
                        <Stack justify="center" spacing={0}>
                          <Text align="center">Your rate:</Text>
                          <Rating
                            mt={4}
                            value={offerReceiverRating.value}
                            readOnly
                          />
                        </Stack>
                      ) : (
                        <Popover
                          width={250}
                          position="bottom"
                          withArrow
                          shadow="md"
                        >
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
                      )
                    ) : null}
                    {isSender ? (
                      offerSenderRating ? (
                        <Stack justify="center" spacing={0}>
                          <Text align="center">Your rate:</Text>
                          <Rating
                            mt={4}
                            value={offerSenderRating.value}
                            readOnly
                          />
                        </Stack>
                      ) : (
                        <Popover
                          width={250}
                          position="bottom"
                          withArrow
                          shadow="md"
                        >
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
                      )
                    ) : null}
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
