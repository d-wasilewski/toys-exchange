import { APIResponse, fetchPost } from "./baseFetch";

export const fetchToysList = () => {
  return fetchPost("/toy/toys");
};

export type AllToys = APIResponse<"/toy/toys">;

export const fetchToysByOwner = (ownerId: number) => {
  return fetchPost("/toy/user-toys", { id: ownerId });
};

export const createToy = (toyData: FormData) => {
  return fetchPost("/toy/create-toy", toyData as never);
};
