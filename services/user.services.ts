import { APP_END_POINTS } from "@/constants/endPoints";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;
import * as FileSystem from "expo-file-system";
import axiosInstance from "./base.services";

export async function saveUser(data: any) {
  if (!baseUrl) {
    throw new Error("L'URL de l'API n'est pas définie");
  }

  try {
    const response = await axios.post(`${baseUrl}user/create`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Erreur HTTP ${error.response.status}`);
    } else if (error.request) {
      throw new Error("Pas de réponse reçue du serveur");
    } else {
      throw new Error(`Erreur lors de la requête : ${error.message}`);
    }
  }
}

export async function updateUserAvatar(uri: string) {
  if (!baseUrl) {
    throw new Error("L'URL de l'API n'est pas définie");
  }

  try {
    const token = await SecureStore.getItemAsync("FOOD_USER_TOKEN");

    const response = await axios.get(uri, { responseType: "blob" });

    const formData = new FormData();

    formData.append("image", response.data);

    const headers = {
      Authorization: `Bearer ${token}`,

      "Content-Type": "multipart/form-data",
    };

    const responseApi = await axios.post(
      `${baseUrl}${APP_END_POINTS.user.updateAvatar}`,

      formData,

      { headers }
    );

    return responseApi.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) as any) {
      throw new Error(`Erreur HTTP ${error.response} : ${error.response}`);
    } else {
      throw new Error(`Erreur inattendue : ${error.message}`);
    }
  }
}

export async function logUser(data: any) {
  if (!baseUrl) {
    throw new Error("L'URL de l'API n'est pas définie");
  }

  console.log(baseUrl);

  try {
    const response = await axios.post(`${baseUrl}user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.data.message);
      throw new Error(error.response.data.message);
    } else if (error.request) {
      throw new Error("Pas de réponse reçue du serveur");
    } else {
      throw new Error(`Erreur lors de la requête : ${error.message}`);
    }
  }
}

export async function updateProfil(data: any) {
  if (!baseUrl) {
    throw new Error("L'URL de l'API n'est pas définie");
  }

  const endPoint = APP_END_POINTS.user.updateProfile;

  try {
    const response = await axiosInstance.post(endPoint, data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Erreur HTTP`);
    } else if (error.request) {
      throw new Error("Pas de réponse reçue du serveur");
    } else {
      throw new Error(`Erreur lors de la requête : ${error.message}`);
    }
  }
}
