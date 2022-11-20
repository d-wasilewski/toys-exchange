import { Drawer, Loader } from "@mantine/core";
import { Suspense } from "react";
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
  return (
    <Drawer
      opened={isOpened}
      onClose={() => setIsOpened(false)}
      title="User details"
      padding="xl"
      size="lg"
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      position="right"
    >
      <Suspense fallback={<Loader />}>
        {editable ? <EditableDrawerContent /> : <DrawerContent />}
      </Suspense>
    </Drawer>
  );
};
