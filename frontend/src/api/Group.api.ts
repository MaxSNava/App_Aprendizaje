import { isAxiosError } from "axios";
import api from "../lib/axios";
import { GrupoFormData } from "../types";

export async function createGroup(formData: GrupoFormData) {
  try {
    formData.nombre = formData.nombre.toLowerCase();
    const { data } = await api.post("/grupos", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getGroups() {
  try {
    const { data } = await api.get("/grupos");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}
