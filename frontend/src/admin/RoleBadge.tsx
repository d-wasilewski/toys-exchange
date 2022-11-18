import { Badge } from "@mantine/core";
import { UserRole } from "../shared/APIs/userService";

interface StatusBadgeProps {
  role: UserRole;
}

export const RoleBadge = ({ role }: StatusBadgeProps) => {
  const color = role === "BASIC" ? "orange" : "violet";
  return <Badge color={color}>{role}</Badge>;
};
