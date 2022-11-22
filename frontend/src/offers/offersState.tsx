import { selector } from "recoil";
import { getAllOffers } from "../shared/APIs/offerService";

export const allOffersState = selector({
  key: "allOffersState",
  get: async () => {
    const allOffers = await getAllOffers();
    return allOffers;
  },
});
