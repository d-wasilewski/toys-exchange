import { Container, Tabs } from "@mantine/core";
import { IconUser, IconArrowsLeftRight } from "@tabler/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { OfferCardList } from "../offers/OfferCardList";
import {
  isAdminDrawerOpenedState,
  isDrawerEditableState,
  usersListState,
} from "./adminState";
import { UserDetailsDrawer } from "./drawer/UserDetailsDrawer";
import { UsersTable } from "./UsersTable";

export const AdminPage = () => {
  const usersList = useRecoilValue(usersListState);
  const [isDrawerOpened, setIsDrawerOpened] = useRecoilState(
    isAdminDrawerOpenedState
  );
  const isDrawerEditable = useRecoilValue(isDrawerEditableState);

  return (
    <Container mt={40} size="lg">
      <Tabs variant="outline" radius="md" defaultValue="users">
        <Tabs.List>
          <Tabs.Tab value="users" icon={<IconUser size={14} />}>
            Users
          </Tabs.Tab>
          <Tabs.Tab value="offers" icon={<IconArrowsLeftRight size={14} />}>
            Offers
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users" pt="xs">
          <UsersTable data={usersList} />
        </Tabs.Panel>

        <Tabs.Panel value="offers" pt="xs">
          <OfferCardList />
        </Tabs.Panel>
      </Tabs>
      <UserDetailsDrawer
        isOpened={isDrawerOpened}
        setIsOpened={setIsDrawerOpened}
        editable={isDrawerEditable}
      />
    </Container>
  );
};
