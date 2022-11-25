import { APIRequestBody, APIResponse, fetchPost } from "./baseFetch";

export const getAllOffers = () => {
  return fetchPost("/offer/offers");
};

export const getUserActiveOffers = (userId: string): Promise<any> => {
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

export const getActiveOffers = (receiverId: string) => {
  return fetchPost("/offer/active-offers", { receiverId });
};

export type UserList = APIResponse<"/user/users">[number];

export type User = APIResponse<"/user/user">;
export type UserStatus = User["status"];
export type UserRole = User["role"];
