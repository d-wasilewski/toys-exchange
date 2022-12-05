import { APIRequestBody, APIResponse, client } from "./baseFetch";
import { AxiosResponse } from "axios";

export type Offers = APIResponse<"/offer/offers">;
export type Offer = Offers[number];
export type OfferStatus = Offer["status"];
export type OfferRating = Offer["rating"];
export type OfferUser = Offer["sender"];

export const getAllOffers = (): Promise<AxiosResponse<Offers>> => {
  return client.post("/offer/offers");
};

export const getUserActiveOffers = (
  userId: string
): Promise<AxiosResponse<Offers>> => {
  return client.post("/offer/active-offers", { receiverId: userId });
};

export const acceptOffer = (offerId: string): Promise<AxiosResponse<void>> => {
  return client.post("/offer/accept", { offerId });
};

export const declineOffer = async (
  offerId: string
): Promise<AxiosResponse<void>> => {
  return client.post("/offer/decline", { offerId });
};

export const makeAnOffer = (payload: APIRequestBody<"/offer/send">) => {
  return client.post("/offer/send", payload);
};

export const getActiveOffers = (
  receiverId: string
): Promise<AxiosResponse<Offers>> => {
  return client.post("/offer/active-offers", { receiverId });
};

export const getHistoryOffers = (
  receiverId: string
): Promise<AxiosResponse<Offers>> => {
  return client.post("/offer/history-offers", { receiverId });
};
