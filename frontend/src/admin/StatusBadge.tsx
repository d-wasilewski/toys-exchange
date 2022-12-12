import { Badge } from "@mantine/core";
import { UserStatus } from "../shared/APIs/userService";

interface StatusBadgeProps {
  status: UserStatus;
  confirmed: boolean;
}

export const StatusBadge = ({ status, confirmed }: StatusBadgeProps) => {
  const color = status === "ACTIVE" ? "green" : "pink";
  return (
    <Badge color={confirmed ? color : "yellow"}>
      {confirmed ? status : "Unconfirmed"}
    </Badge>
  );
};
