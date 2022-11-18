import { atom, selector } from "recoil";
import { getAllUsers, User } from "../shared/APIs/userService";

export const usersListState = selector({
  key: "usersListState",
  get: async () => {
    const usersList = await getAllUsers();
    return usersList;
  },
});

export const clickedUserIdState = atom<number | null>({
  key: "clickedUserIdState",
  default: null,
});

export const isAdminDrawerOpenedState = atom({
  key: "isAdminDrawerOpenedState",
  default: false,
});

//   export const selectedUserState = selector({
//     key: "selectedUserState",
//     get: async ({ get }) => {
//       const user = get(userState);
//       if (user) {
//         const toysByOwner = await fetchToysByOwner(user?.id);
//         return toysByOwner;
//       }
//       return [];
//     },
//   });
