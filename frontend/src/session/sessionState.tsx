import { atom, selectorFamily } from "recoil";
import { getUserData, User } from "../shared/APIs/userService";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects: [persistAtom],
});

export const getUserByIdState = selectorFamily({
  key: "getUserByIdState",
  get: (userId: string) => async () => {
    if (userId) {
      const user = await getUserData(userId);
      return user.data;
    }
    return null;
  },
});
