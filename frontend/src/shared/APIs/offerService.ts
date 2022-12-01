import { APIRequestBody, APIResponse, fetchPost } from "./baseFetch";

export type Offers = APIResponse<"/offer/offers">;
export type Offer = Offers[number];
export type OfferStatus = Offer["status"];
export type OfferRating = Offer["rating"];
export type OfferUser = Offer["sender"];

export const getAllOffers = (): Promise<Offers> => {
  return fetchPost("/offer/offers");
};

export const getUserActiveOffers = (userId: string): Promise<Offers> => {
  return fetchPost("/offer/active-offers", { receiverId: userId });
};

export const acceptOffer = (offerId: string): Promise<void> => {
  return fetchPost("/offer/accept", { offerId });
};

export const declineOffer = (offerId: string): Promise<void> => {
  return fetchPost("/offer/decline", { offerId });
};

export const makeAnOffer = (payload: APIRequestBody<"/offer/send">) => {
  return fetchPost("/offer/send", payload);
};

export const getActiveOffers = (receiverId: string): Promise<Offers> => {
  return fetchPost("/offer/active-offers", { receiverId });
};

export const getHistoryOffers = (receiverId: string): Promise<Offers> => {
  return fetchPost("/offer/history-offers", { receiverId });
};
