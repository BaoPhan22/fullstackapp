import create from "./http-service";

export interface UserLogin {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export const initUserLogin = {
  id: 0,
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export function isTokenExpired() {
  const token = localStorage.getItem("access_token");
  if (token) {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  return true;
}

export default (endpoint: string) => create(`/api/auth/${endpoint}`);
