import { Badge } from "@mantine/core";
import { UserStatus } from "../shared/APIs/userService";

interface StatusBadgeProps {
  status: UserStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const color = status === "ACTIVE" ? "green" : "pink";
  return <Badge color={color}>{status}</Badge>;
};
