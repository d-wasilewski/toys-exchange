import { APIResponse, fetchPost } from "./baseFetch";

export const fetchToysList = () => {
  return fetchPost("/toy/toys");
};

export type AllToys = APIResponse<"/toy/toys">;
export type Toy = AllToys[number];
export type ToyOwner = Toy["owner"];

export const fetchToysByOwner = (ownerId: string) => {
  return fetchPost("/toy/user-toys", { id: ownerId });
};

export const createToy = (toyData: FormData) => {
  return fetchPost("/toy/create-toy", toyData as never);
};
