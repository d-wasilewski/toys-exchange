import { Drawer } from "@mantine/core";

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
      title="Register"
      padding="xl"
      size="lg"
      overlayOpacity={0.55}
      overlayBlur={3}
      closeOnClickOutside
      position="right"
    >
      {/* Drawer content */}
    </Drawer>
  );
};
