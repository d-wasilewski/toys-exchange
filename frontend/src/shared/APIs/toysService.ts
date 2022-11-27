import { APIRequestBody, APIResponse, fetchPost } from "./baseFetch";

export const fetchToysList = () => {
  return fetchPost("/toy/toys");
};

export type AllToys = APIResponse<"/toy/toys">;
export type Toy = AllToys[number];
export type ToyOwner = Toy["owner"];

export const fetchToysByOwner = (
  ownerId: string
): Promise<APIResponse<"/toy/user-toys">> => {
  return fetchPost("/toy/user-toys", { id: ownerId });
};

export const createToy = (toyData: FormData) => {
  return fetchPost("/toy/create-toy", toyData as never);
};

export const getToyData = (toyId: string): Promise<APIResponse<"/toy/toy">> => {
  return fetchPost("/toy/toy", { id: toyId });
};

export const editToyData = (values: APIRequestBody<"/toy/edit">) => {
  return fetchPost("/toy/edit", values);
};
