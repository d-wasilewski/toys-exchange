import { Container } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  clickedUserIdState,
  isAdminDrawerOpenedState,
  usersListState,
} from "./adminState";
import { UserDetailsDrawer } from "./UserDetailsDrawer";
import { UsersTable } from "./UsersTable";

export const AdminPage = () => {
  const usersList = useRecoilValue(usersListState);
  const [isDrawerOpened, setIsDrawerOpened] = useRecoilState(
    isAdminDrawerOpenedState
  );
  const userId = useRecoilValue(clickedUserIdState);

  return (
    <Container mt={40} size="lg">
      <UsersTable data={usersList} />
      <UserDetailsDrawer
        isOpened={isDrawerOpened}
        setIsOpened={setIsDrawerOpened}
      />
    </Container>
  );
};
