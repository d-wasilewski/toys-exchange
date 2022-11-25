import { APIRequestBody, APIResponse, fetchPost } from "./baseFetch";

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

export const getUserData = (userId: string): Promise<User> => {
  return fetchPost("/user/user", { id: userId });
};

export const editUserData = (
  userData: APIRequestBody<"/user/edit">
): Promise<User> => {
  return fetchPost("/user/edit", userData);
};

export const logout = async () => {
  localStorage.removeItem("authToken");
};
