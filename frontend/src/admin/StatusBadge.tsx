import { Badge } from "@mantine/core";
import { useI18nContext } from "../i18n/i18n-react";
import { UserStatus } from "../shared/APIs/userService";

interface StatusBadgeProps {
  status: UserStatus;
  confirmed: boolean;
}

export const StatusBadge = ({ status, confirmed }: StatusBadgeProps) => {
  const { LL } = useI18nContext();
  const color = status === "ACTIVE" ? "green" : "pink";

  return (
    <Badge color={confirmed ? color : "yellow"}>
      {confirmed
        ? LL.admin.statuses({ status })
        : LL.admin.statuses({ status: "UNCONFIRMED" })}
    </Badge>
  );
};
