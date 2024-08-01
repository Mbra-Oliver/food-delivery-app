import { APP_END_POINTS } from "@/constants/endPoints";
import axiosInstance from "./base.services";

export const fetchLatestFood = async () => {
  const endPoint = APP_END_POINTS.food.latest;

  try {
    const response = await axiosInstance.get(endPoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const paginateFood = async (categoryId: number) => {
  const endPoint =
    APP_END_POINTS.food.allWithCategory + "?categoryId=" + categoryId;

  console.log(endPoint);
  try {
    const response = await axiosInstance.get(endPoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getOneFood = async (id: number) => {
  const endPoint = APP_END_POINTS.foods.single + "/" + id;

  try {
    const response = await axiosInstance.get(endPoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
