import axios from "axios";

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
