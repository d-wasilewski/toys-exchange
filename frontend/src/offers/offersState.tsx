import { selector } from "recoil";
import { userState } from "../session/sessionState";
import {
  getActiveOffers,
  getAllOffers,
  getHistoryOffers,
} from "../shared/APIs/offerService";

export const allOffersState = selector({
  key: "allOffersState",
  get: async () => {
    const allOffers = await getAllOffers();
    return allOffers.data;
  },
});

export const myActiveOffersState = selector({
  key: "myActiveOffersState",
  get: async ({ get }) => {
    const user = get(userState);

    if (!user) return [];
    const activeOffers = await getActiveOffers(user?.id);
    return activeOffers.data;
  },
});

export const myHistoryOffersState = selector({
  key: "myHistoryOffersState",
  get: async ({ get }) => {
    const user = get(userState);

    if (!user) return [];
    const historyOffers = await getHistoryOffers(user?.id);
    return historyOffers.data;
  },
});
