import { UserProps } from "@/contexts/AuthContexts";

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeTokenAndInfo = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const setUserInfo = (user: UserProps) => {
  localStorage.setItem("user", JSON.stringify(user));
};
export const getUserInfo = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};
