import { APP_END_POINTS } from "@/constants/endPoints";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;

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

export async function updateUserAvatar(binaryString: string) {
  if (!baseUrl) {
    throw new Error("L'URL de l'API n'est pas définie");
  }

  console.log(binaryString);

  try {
    const token = await SecureStore.getItem("FOOD_USER_TOKEN");
    const response = await axios.post(
      `${baseUrl}${APP_END_POINTS.user.updateAvatar}`,

      binaryString,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log("erreur message", error.message);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`Erreur HTTP ${error.response.status}`);
      } else if (error.request) {
        throw new Error("Pas de réponse reçue du serveur");
      } else {
        throw new Error(`Erreur lors de la requête : ${error.message}`);
      }
    } else {
      throw new Error(`Erreur inattendue : ${error.message}`);
    }
  }
}

export async function logUser(data: any) {
  if (!baseUrl) {
    throw new Error("L'URL de l'API n'est pas définie");
  }

  try {
    const response = await axios.post(`${baseUrl}user/login`, data, {
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
