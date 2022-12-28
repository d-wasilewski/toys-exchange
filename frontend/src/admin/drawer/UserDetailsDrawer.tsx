import { Drawer } from "@mantine/core";
import { SuspenseFallback } from "../../components/SuspenseFallback";
import { useI18nContext } from "../../i18n/i18n-react";
import { DrawerContent } from "./DrawerContent";
import { EditableDrawerContent } from "./EditableDrawerContent";

interface UserDetailsDrawerProps {
  isOpened: boolean;
  setIsOpened: (arg: boolean) => void;
  editable?: boolean;
}

export const UserDetailsDrawer = ({
  isOpened,
  setIsOpened,
  editable,
}: UserDetailsDrawerProps) => {
  const { LL } = useI18nContext();
  return (
    <Drawer
      opened={isOpened}
      onClose={() => setIsOpened(false)}
      title={LL.admin.userDetails()}
      padding="xl"
      size="lg"
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      position="right"
    >
      <SuspenseFallback>
        {editable ? <EditableDrawerContent /> : <DrawerContent />}
      </SuspenseFallback>
    </Drawer>
  );
};
