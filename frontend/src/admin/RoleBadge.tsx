import { Badge } from "@mantine/core";
import { useI18nContext } from "../i18n/i18n-react";
import { UserRole } from "../shared/APIs/userService";

interface StatusBadgeProps {
  role: UserRole;
}

export const RoleBadge = ({ role }: StatusBadgeProps) => {
  const { LL } = useI18nContext();
  const color = role === "BASIC" ? "orange" : "violet";

  return <Badge color={color}>{LL.admin.roles({ role })}</Badge>;
};
