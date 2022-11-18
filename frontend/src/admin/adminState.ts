import { atom, selector } from "recoil";
import { getAllUsers } from "../shared/APIs/userService";

export const usersListState = selector({
  key: "usersListState",
  get: async () => {
    const usersList = await getAllUsers();
    return usersList;
  },
});

export const clickedUserIdState = atom({
  key: "clickedUserIdState",
  default: null,
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
