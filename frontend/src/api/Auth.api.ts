import { isAxiosError } from "axios";
import api from "../lib/axios";
import { AuthLoginForm, authSchema } from "../types";

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
    const response = authSchema.safeParse(data);
    console.log("Puta madre");
    console.log(response);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}
