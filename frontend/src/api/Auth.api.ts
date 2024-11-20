import { isAxiosError } from "axios";
import api from "../lib/axios";
import { AuthLoginForm, AuthSchemaplus, AuthRegistrationForm } from "../types";

export async function createAccount(formData: AuthRegistrationForm) {
  try {
    const url = "/auth/register";
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authenticateAuth(formData: AuthLoginForm) {
  try {
    const url = "/auth/login";
    const { data } = await api.post(url, formData);
    localStorage.setItem("AUTH_TOKEN", data.token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export async function getAuth() {
  try {
    const { data } = await api.get("/auth");

    const transformedData = Array.isArray(data) ? data[0] : data;

    const response = AuthSchemaplus.safeParse(transformedData);

    if (response.success) return response.data; // Retornar datos válidos

    throw new Error("Datos de autenticación inválidos.");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error en autenticación.");
    }
    throw error;
  }
}
