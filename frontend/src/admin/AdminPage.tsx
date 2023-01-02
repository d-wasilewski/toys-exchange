import { Container, Tabs } from "@mantine/core";
import { IconUser, IconArrowsLeftRight, IconHorseToy } from "@tabler/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { useI18nContext } from "../i18n/i18n-react";
import { OfferCardList } from "../offers/OfferCardList";
import {
  isAdminDrawerOpenedState,
  isDrawerEditableState,
  usersListState,
} from "./adminState";
import { UserDetailsDrawer } from "./drawer/UserDetailsDrawer";
import { ReportedToysList } from "./ReportedToysList";
import { UsersTable } from "./UsersTable";

export const AdminPage = () => {
  const usersList = useRecoilValue(usersListState);
  const [isDrawerOpened, setIsDrawerOpened] = useRecoilState(
    isAdminDrawerOpenedState
  );
  const isDrawerEditable = useRecoilValue(isDrawerEditableState);
  const { LL } = useI18nContext();

  return (
    <Container mt={40} pr={16} size="lg">
      <Tabs variant="outline" radius="md" defaultValue="users">
        <Tabs.List>
          <Tabs.Tab value="users" icon={<IconUser size={14} />}>
            {LL.admin.users()}
          </Tabs.Tab>
          <Tabs.Tab value="offers" icon={<IconArrowsLeftRight size={14} />}>
            {LL.admin.offers()}
          </Tabs.Tab>
          <Tabs.Tab value="toys" icon={<IconHorseToy size={14} />}>
            {LL.admin.reported()}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users" pt="xs">
          <UsersTable data={usersList} />
        </Tabs.Panel>
        <Tabs.Panel value="offers" pt="xs">
          <OfferCardList />
        </Tabs.Panel>
        <Tabs.Panel value="toys" pt="xs">
          <ReportedToysList />
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
