import { Drawer } from "@mantine/core";
import { SuspenseFallback } from "../../components/SuspenseFallback";
import { useI18nContext } from "../../i18n/i18n-react";
import { DrawerContent } from "./DrawerContent";

interface UserDetailsDrawerProps {
  isOpened: boolean;
  setIsOpened: (arg: boolean) => void;
}

export const EditToyDrawer = ({
  isOpened,
  setIsOpened,
}: UserDetailsDrawerProps) => {
  const { LL } = useI18nContext();
  return (
    <Drawer
      opened={isOpened}
      onClose={() => setIsOpened(false)}
      title={LL.toy.details()}
      padding="xl"
      size="lg"
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      position="right"
    >
      <SuspenseFallback>
        <DrawerContent />
      </SuspenseFallback>
    </Drawer>
  );
};
