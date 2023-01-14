import axios, { AxiosError } from "axios";
import { paths } from "./types";

export const client = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "https://toys-exchange-production.up.railway.app",
  headers: {
    Authorization: localStorage.authToken,
  },
});

export type APIRequestBody<Path extends keyof paths> = paths[Path] extends {
  post: {
    requestBody: { content: { "application/json": infer RequestContent } };
  };
}
  ? RequestContent
  : never;

export type APIResponse<Path extends keyof paths> = paths[Path] extends {
  post: {
    responses: { 201: { content: { "application/json": infer ResponseBody } } };
  };
}
  ? ResponseBody
  : never;

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}

type MyExpectedResponseType = {
  message: string;
};

export const getErrorMessage = (error: unknown): string | null => {
  if (isAxiosError<MyExpectedResponseType>(error)) {
    const data = error.response?.data;

    return data?.message ?? null;
  }
  return null;
};

export const getAuthToken = () => {
  return localStorage.authToken;
};
