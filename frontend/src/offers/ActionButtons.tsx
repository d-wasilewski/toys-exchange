import { Group, Button, Text, Flex } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { getErrorMessage } from "../shared/APIs/baseFetch";
import {
  acceptOffer,
  declineOffer,
  OfferStatus,
} from "../shared/APIs/offerService";

export const ActionButtons = ({
  offerId,
  status,
}: {
  offerId: string;
  status: OfferStatus;
}) => {
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [isDeclineLoading, setIsDeclineLoading] = useState(false);

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

  return (
    <>
      {(() => {
        switch (status) {
          case "PENDING":
            return (
              <Group sx={{ justifyContent: "center" }}>
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
            return <Button>Rate user</Button>;
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
