import { Container } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
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
      <UsersTable data={usersList} />
      <UserDetailsDrawer
        isOpened={isDrawerOpened}
        setIsOpened={setIsDrawerOpened}
        editable={isDrawerEditable}
      />
    </Container>
  );
};
