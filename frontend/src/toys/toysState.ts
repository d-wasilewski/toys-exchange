import { atom, selector } from "recoil";
import { userState } from "../session/sessionState";
import {
  fetchToysByOwner,
  fetchToysList,
  getToyData,
} from "../shared/APIs/toysService";

export const toysListState = selector({
  key: "toysListState",
  get: async () => {
    const toysList = await fetchToysList();
    return toysList;
  },
});

export const currentToysListState = selector({
  key: "currentToysListState",
  get: async ({ get }) => {
    const user = get(userState);
    if (user) {
      const toysByOwner = await fetchToysByOwner(user?.id);
      return toysByOwner;
    }
    return [];
  },
});

export const selectedToyIdState = atom<string | null>({
  key: "selectedToyIdState",
  default: null,
});

export const offeredToyIdState = atom<string | null>({
  key: "offeredToyIdState",
  default: null,
});

export const isEditToyDrawerOpenState = atom({
  key: "isEditToyDrawerOpenState",
  default: false,
});

export const selectedToyState = selector({
  key: "selectedToyState",
  get: async ({ get }) => {
    const toyId = get(selectedToyIdState);
    if (toyId) {
      const user = await getToyData(toyId);
      return user;
    }
    return null;
  },
});
