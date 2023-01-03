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
import { useI18nContext } from "../i18n/i18n-react";
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
  const { LL } = useI18nContext();

  const isSender = offerSender.id === currentUser?.id;
  const isReceiver = offerReceiver.id === currentUser?.id;

  const handleAccept = () => {
    openConfirmModal({
      title: LL.offer.confirmModal.title(),
      closeOnConfirm: true,
      children: <Text size="sm">{LL.offer.confirmModal.text()}</Text>,
      labels: { confirm: LL.general.confirm(), cancel: LL.general.cancel() },
      confirmProps: { color: "green" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          setIsDeclineLoading(true);
          await acceptOffer(offerId);
          showNotification({
            title: LL.notifications.success(),
            message: LL.notifications.created({ name: "Offer" }),
            color: "green",
            autoClose: 3000,
          });
          openModal({
            title: LL.toy.swap.complete(),
            children: (
              <SuspenseFallback>
                <SecondLayerSwapModal userId={offerSender.id} />
              </SuspenseFallback>
            ),
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
          setIsDeclineLoading(false);
        }
      },
    });
  };

  const handleDecline = () => {
    openConfirmModal({
      title: LL.offer.declineModal.title(),
      children: <Text size="sm">{LL.offer.declineModal.text()}</Text>,
      labels: {
        confirm: LL.offer.declineModal.yes(),
        cancel: LL.offer.declineModal.no(),
      },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        try {
          setIsAcceptLoading(true);
          await declineOffer(offerId);
          showNotification({
            title: LL.notifications.success(),
            message: LL.notifications.created({ name: "Offer" }),
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
        title: LL.notifications.success(),
        message: LL.notifications.created({ name: "User" }),
        color: "green",
        autoClose: 3000,
      });
      historyListRefresh();
    } catch (e) {
      const message = getErrorMessage(e);
      showNotification({
        title: LL.notifications.error(),
        message: message ?? LL.notifications.generalError(),
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
                    {LL.offer.statuses({ status: "PENDING" })}
                  </Badge>
                );
              case "ACCEPTED":
                return (
                  <Stack spacing={0} justify="center">
                    <Badge color="green" size="xl">
                      {LL.offer.statuses({ status: "ACCEPTED" })}
                    </Badge>
                    {offerSenderRating && (
                      <Group spacing={2} mt={4}>
                        <Text align="center">{LL.offer.senderRate()}: </Text>
                        <Rating value={offerSenderRating.value} readOnly />
                      </Group>
                    )}
                    {offerReceiverRating && (
                      <Group spacing={2} mt={4}>
                        <Text align="center">{LL.offer.receiverRate()}: </Text>
                        <Rating value={offerReceiverRating.value} readOnly />
                      </Group>
                    )}
                  </Stack>
                );
              case "DECLINED":
                return (
                  <Badge color="gray" size="xl">
                    {LL.offer.statuses({ status: "DECLINED" })}
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
                      {LL.general.accept()}
                    </Button>
                    <Button
                      color="red"
                      onClick={handleDecline}
                      loading={isDeclineLoading}
                    >
                      {LL.general.decline()}
                    </Button>
                  </Group>
                );
              case "ACCEPTED": {
                return (
                  <>
                    {isReceiver ? (
                      offerReceiverRating ? (
                        <Stack justify="center" spacing={0}>
                          <Text align="center">{LL.offer.yourRate()}:</Text>
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
                            <Button>{LL.offer.rateUser()}</Button>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <Center>
                              <Text size="sm">
                                {LL.offer.exchangeLike()}
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
                          <Text align="center">{LL.offer.yourRate()}:</Text>
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
                            <Button>{LL.offer.rateUser()}</Button>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <Center>
                              <Text size="sm">
                                {LL.offer.exchangeLike()}
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
                    {LL.offer.statuses({ status: "DECLINED" })}
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
