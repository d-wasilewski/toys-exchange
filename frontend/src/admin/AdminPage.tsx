import { Container } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { usersListState } from "./adminState";
import { UsersTable } from "./UsersTable";

export const AdminPage = () => {
  const usersList = useRecoilValue(usersListState);

  return (
    <Container mt={40} size="lg">
      <UsersTable data={usersList} />
    </Container>
  );
};
