import { atom } from "recoil";
import { User } from "../shared/APIs/userService";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects: [persistAtom],
});
