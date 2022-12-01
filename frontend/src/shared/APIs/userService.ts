import { APIRequestBody, APIResponse, fetchPost } from "./baseFetch";
import { paths } from "./types";

export const loginUser = (userData: APIRequestBody<"/auth/login">) => {
  return fetchPost("/auth/login", userData);
};

export const signUp = (userData: APIRequestBody<"/user/sign-up">) => {
  return fetchPost("/user/sign-up", userData);
};

export const getAllUsers = () => {
  return fetchPost("/user/users");
};

export type UserList = APIResponse<"/user/users">[number];

export type User = APIResponse<"/user/user">;
export type UserStatus = User["status"];
export type UserRole = User["role"];
export type RatingType = User["rating"];

export const getUserData = (userId: string): Promise<User> => {
  return fetchPost("/user/user", { id: userId });
};

export const updateAvatar = (file: FormData, userId: string) => {
  return fetchPost(`/user/image/${userId}` as keyof paths, file as never);
};

export const editUserData = (
  userData: APIRequestBody<"/user/edit">
): Promise<APIResponse<"/user/edit">> => {
  return fetchPost("/user/edit", userData);
};

export const editUserDataByAdmin = (
  userData: APIRequestBody<"/user/editByAdmin">
): Promise<APIResponse<"/user/editByAdmin">> => {
  return fetchPost("/user/editByAdmin", userData);
};

export const rateUser = (payload: APIRequestBody<"/user/rate">) => {
  return fetchPost("/user/rate", payload);
};

export const logout = async () => {
  localStorage.removeItem("authToken");
};
