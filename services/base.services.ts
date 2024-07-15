// api.js

import axios from "axios";
import * as SecureStore from "expo-secure-store";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setBaseUrl = (url: string) => {
  axiosInstance.defaults.baseURL = url;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getItem("FOOD_USER_TOKEN");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
