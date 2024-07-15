import { APP_END_POINTS } from "@/constants/endPoints";
import axiosInstance from "./base.services";

export const fetchFoodCategories = async () => {
  const endPoint = APP_END_POINTS.foodCategories;

  try {
    const response = await axiosInstance.get(endPoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
