import { atom } from "recoil";

export const jwtTokenState = atom({
  key: "jwtTokenState",
  default: null,
});
