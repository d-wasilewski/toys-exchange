import axios, { AxiosError, ResponseType } from "axios";
import { paths } from "./types";

const client = axios.create({
  baseURL: "http://localhost:3000",
});

export async function fetchPost<Path extends keyof paths>(
  url: Path
): Promise<APIRequestBody<Path> extends never ? APIResponse<Path> : never>;
export async function fetchPost<Path extends keyof paths>(
  url: Path,
  data: APIRequestBody<Path>,
  responseType?: ResponseType
): Promise<APIResponse<Path>>;
export async function fetchPost<Path extends keyof paths>(
  url: Path,
  data?: APIRequestBody<Path> extends never ? undefined : APIRequestBody<Path>,
  responseType?: ResponseType
): Promise<APIResponse<Path>> {
  const authToken = await getAuthToken();
  const response = await client.post<APIResponse<Path>>(url, data, {
    headers: {
      Authorization: authToken,
    },
    responseType,
  });
  return response.data;
}

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

export const getAuthToken = async () => {
  return localStorage.authToken;
};
