import { selector } from "recoil";
import { userState } from "../session/sessionState";
import { getActiveOffers, getAllOffers } from "../shared/APIs/offerService";

export const allOffersState = selector({
  key: "allOffersState",
  get: async () => {
    const allOffers = await getAllOffers();
    return allOffers;
  },
});

export const myActiveOffersState = selector({
  key: "myActiveOffersState",
  get: async ({ get }) => {
    const user = get(userState);

    if (!user) return [];
    const activeOffers = await getActiveOffers(user?.id);
    return activeOffers;
  },
});
