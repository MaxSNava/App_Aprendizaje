import { isAxiosError } from "axios";
import api from "../lib/axios";
import { UserFormData } from "../types";

export async function createUser(formData: UserFormData) {
  try {
    const { data } = await api.post("/usuarios", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
