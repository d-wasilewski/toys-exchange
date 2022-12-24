import { AxiosResponse } from "axios";
import { APIRequestBody, APIResponse, client } from "./baseFetch";

export type AllToys = APIResponse<"/toy/toys">;
export type Toy = AllToys[number];
export type ToyOwner = Toy["owner"];
export type ToyCategories = Toy["category"];

export const fetchToysList = (): Promise<AxiosResponse<AllToys>> => {
  return client.post("/toy/toys");
};

export const fetchToysByOwner = (
  ownerId: string
): Promise<AxiosResponse<APIResponse<"/toy/user-toys">>> => {
  return client.post("/toy/user-toys", { id: ownerId });
};

export const createToy = (toyData: FormData) => {
  return client.post("/toy/create-toy", toyData as never);
};

export const confirmToy = (toyId: string): Promise<void> => {
  return client.post("/toy/confirm", { id: toyId });
};

export const blockToy = (toyId: string): Promise<void> => {
  return client.post("/toy/block", { id: toyId });
};

export const getToyData = (
  toyId: string
): Promise<AxiosResponse<APIResponse<"/toy/toy">>> => {
  return client.post("/toy/toy", { id: toyId });
};

export const editToyData = (
  values: APIRequestBody<"/toy/edit">,
  etag: string
) => {
  return client.post("/toy/edit", values, {
    headers: {
      "If-Match": etag,
    },
  });
};

export const deleteToyById = (toyId: string) => {
  return client.post("/toy/delete", { id: toyId });
};
