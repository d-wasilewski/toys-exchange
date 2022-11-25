import { atom, selector } from "recoil";
import { getAllUsers, getUserData } from "../shared/APIs/userService";

export const usersListState = selector({
  key: "usersListState",
  get: async () => {
    const usersList = await getAllUsers();
    return usersList;
  },
});

export const clickedUserIdState = atom<string | null>({
  key: "clickedUserIdState",
  default: null,
});

export const isAdminDrawerOpenedState = atom({
  key: "isAdminDrawerOpenedState",
  default: false,
});

export const isDrawerEditableState = atom({
  key: "isDrawerEditableState",
  default: false,
});

export const selectedUserState = selector({
  key: "selectedUserState",
  get: async ({ get }) => {
    const userId = get(clickedUserIdState);
    if (userId) {
      const user = await getUserData(userId);
      return user;
    }
    return null;
  },
});
