import { Drawer } from "@mantine/core";
import { SuspenseFallback } from "../../components/SuspenseFallback";
import { DrawerContent } from "./DrawerContent";

interface UserDetailsDrawerProps {
  isOpened: boolean;
  setIsOpened: (arg: boolean) => void;
}

export const EditToyDrawer = ({
  isOpened,
  setIsOpened,
}: UserDetailsDrawerProps) => {
  return (
    <Drawer
      opened={isOpened}
      onClose={() => setIsOpened(false)}
      title="Toy details"
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
