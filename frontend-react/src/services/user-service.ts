import create from "./http-service";

export interface User {
  id: number;
  name: string;
  phone?: string;
  address?: string;
}
export const initUser = {
  id: 0,
  name: "",
  address: "",
  phone: "",
};

export default create("/api/v1/persons");
