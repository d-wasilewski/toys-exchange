import { atom, selector, selectorFamily } from "recoil";
import { userState } from "../session/sessionState";
import { fetchToysByOwner, fetchToysList } from "../shared/APIs/fetchToys";

export const toysListState = selector({
  key: "toysListState",
  get: async () => {
    const toysList = await fetchToysList();
    return toysList;
  },
});

export const myToysListState = selector({
  key: "myToysListState",
  get: async ({ get }) => {
    const user = get(userState);
    if (user) {
      const toysByOwner = await fetchToysByOwner(user?.id);
      return toysByOwner;
    }
    return [];
  },
});
