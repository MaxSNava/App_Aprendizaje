import { isAxiosError } from "axios";
import api from "../lib/axios";
import { Prueba } from "../types";

export async function createTest(formData: Prueba) {
  try {
    const { data } = await api.post("/pruebas", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}
