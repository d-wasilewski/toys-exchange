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
    return toysList.data;
  },
});

export const currentToysListState = selector({
  key: "currentToysListState",
  get: async ({ get }) => {
    const user = get(userState);
    if (user) {
      const toysByOwner = await fetchToysByOwner(user?.id);
      return toysByOwner.data;
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
      const toy = await getToyData(toyId);
      return { ...toy.data, etag: toy.headers["etag"] };
    }
    return null;
  },
});
