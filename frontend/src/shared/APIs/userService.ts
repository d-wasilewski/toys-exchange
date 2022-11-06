import { APIResponse, fetchPost } from "./baseFetch";

export const loginUser = (userData: APIResponse<"/auth/test">) => {
  return fetchPost("/auth/login", userData);
};

export const getAllUsers = () => {
  return fetchPost("/user/users");
};

export type AllUsers = APIResponse<"/user/users">;

export type User = APIResponse<"/user/user">;

export const getUserData = (userId: number): Promise<User> => {
  return fetchPost("/user/user", { id: userId });
};

export const logout = async () => {
  localStorage.removeItem("authToken");
};

// export const signOut = async (setUser: (user: CurrentUser | null) => void) => {
// };
