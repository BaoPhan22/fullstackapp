import create from "./http-service";

export interface Car {
  id: number;
  name: string;
  color?: string;
  year?: string;
  user_name?: string;
  user_id?: number;
}
export const initCar = {
  id: 0,
  name: "",
  color: "",
  year: "",
  user_id: 0,
};

export default create("/api/v1/cars");