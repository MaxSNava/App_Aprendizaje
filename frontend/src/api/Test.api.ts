import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  PruebaFormData,
  PruebaVarkRes,
  PreguntaVark,
  ResultadoVark,
} from "../types";

export async function createTest(formData: PruebaFormData) {
  try {
    const { data } = await api.post("/pruebas", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export async function getPreguntasVark(): Promise<PreguntaVark[]> {
  try {
    const { data } = await api.get("/pruebas/vark");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
    throw new Error("Error inesperado al obtener las preguntas de VARK");
  }
}

export async function sendAnswersVark(
  pruebaId: string,
  formData: PruebaVarkRes[]
) {
  try {
    const { data } = await api.post(`/pruebas/${pruebaId}/vark`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export async function getVarkResults(pruebaId: string): Promise<ResultadoVark> {
  try {
    const { data } = await api.get(`/pruebas/${pruebaId}/vark/resultados`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener los resultados");
  }
}
