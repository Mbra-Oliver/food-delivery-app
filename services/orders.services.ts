import { APP_END_POINTS } from "@/constants/endPoints";
import axiosInstance from "./base.services";

export const saveOrder = async (dataSend: any) => {
  const endPoint = APP_END_POINTS.orders.save;

  try {
    const response = await axiosInstance.post(endPoint, dataSend);
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

export const getAllOrders = async () => {
  const endPoint = APP_END_POINTS.orders.all;

  try {
    const response = await axiosInstance.get(endPoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getOneOrders = async (id: number) => {
  const endPoint = APP_END_POINTS.foods.single + "/" + id;

  try {
    const response = await axiosInstance.get(endPoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
