import { Cookies } from "react-cookie";
const cookies = new Cookies();
const cookiePath: { path: string } = { path: "/" };

export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value, cookiePath);
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
