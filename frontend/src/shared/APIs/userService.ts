import { AxiosResponse } from "axios";
import { APIRequestBody, APIResponse, client } from "./baseFetch";
import { paths } from "./types";

export const loginUser = (userData: APIRequestBody<"/auth/login">) => {
  return client.post("/auth/login", userData);
};

export const signUp = (userData: APIRequestBody<"/user/sign-up">) => {
  return client.post("/user/sign-up", userData);
};

export const getAllUsers = () => {
  return client.post("/user/users");
};

export type UserList = APIResponse<"/user/users">[number];

export type User = APIResponse<"/user/user">;
export type UserStatus = User["status"];
export type UserRole = User["role"];
export type RatingType = User["rating"];

export const getUserData = (userId: string): Promise<AxiosResponse<User>> => {
  return client.post("/user/user", {
    id: userId,
  });
};

export const updateAvatar = (file: FormData, userId: string) => {
  return client.post(`/user/image/${userId}` as keyof paths, file as never);
};

export const editUserData = (
  userData: APIRequestBody<"/user/edit"> & { etag?: string },
  etag: string
): Promise<AxiosResponse<User>> => {
  return client.post("/user/edit", userData, {
    headers: {
      "If-Match": etag,
    },
  });
};

export const editUserDataByAdmin = (
  userData: APIRequestBody<"/user/editByAdmin"> & { etag?: string },
  etag: string
): Promise<AxiosResponse<APIResponse<"/user/editByAdmin">>> => {
  return client.post("/user/editByAdmin", userData, {
    headers: {
      "If-Match": etag,
    },
  });
};

export const confirmAccount = (token: string) => {
  return client.post(`/auth/confirmAccount?token=${token}`);
};

export const sendResetPasswordEmail = (email: string) => {
  return client.post("/auth/sendResetPasswordLink", { email });
};

export const resetPassword = (token: string, newPassword: string) => {
  return client.post(`/auth/resetPassword?token=${token}`, {
    newPassword,
  });
};

export const rateUser = (payload: APIRequestBody<"/user/rate">) => {
  return client.post("/user/rate", payload);
};

export const logout = async () => {
  localStorage.removeItem("authToken");
};
