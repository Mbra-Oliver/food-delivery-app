import { APP_END_POINTS } from "@/constants/endPoints";
import axiosInstance from "./base.services";

export const fetchLatestFood = async () => {
  const endPoint = APP_END_POINTS.latestFood;

  try {
    const response = await axiosInstance.get(endPoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
