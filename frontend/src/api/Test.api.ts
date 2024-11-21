import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  PreguntaMbti,
  PreguntaVark,
  PruebaFormData,
  PruebaMbtiRes,
  PruebaVarkRes,
  ResultadoVark,
  ResultadoMbti,
  ResultadoItem,
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

// --------------- VARK ---------------
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

// --------------- MBTI ---------------
export async function getPreguntasMbti(): Promise<PreguntaMbti[]> {
  try {
    const { data } = await api.get("/pruebas/mbti");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
    throw new Error("Error inesperado al obtener las preguntas de MBTI");
  }
}

export async function sendAnswersMbti(
  pruebaId: string,
  formData: PruebaMbtiRes[]
) {
  try {
    const { data } = await api.post(`/pruebas/${pruebaId}/mbti`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export async function getMbtiResults(pruebaId: string): Promise<ResultadoMbti> {
  try {
    const { data } = await api.get(`/pruebas/${pruebaId}/mbti/resultados`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener los resultados");
  }
}

// --------------- Consultas ---------------
export async function getTotalUsuarios(): Promise<number> {
  try {
    const { data } = await api.get("/usuarios/count");
    return data.count;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener el total de usuarios");
  }
}

export async function getTotalTests(): Promise<{ vark: number; mbti: number }> {
  try {
    const varkResponse = await api.get(
      "/pruebas/consultas/vark?categoria=total"
    );
    const mbtiResponse = await api.get(
      "/pruebas/consultas/mbti?categoria=total"
    );
    return {
      vark: varkResponse.data.length,
      mbti: mbtiResponse.data.length,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener el total de tests");
  }
}

// --------------- Consultas Personalizadas ---------------
type Params = {
  categoria: string;
  id?: string;
};

export async function getResultadosVark(
  categoria: string,
  id?: string
): Promise<ResultadoItem[]> {
  try {
    const params: Params = { categoria };
    if (id) params.id = id;
    const { data } = await api.get("/pruebas/consultas/vark", { params });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener los resultados de VARK");
  }
}

export async function getResultadosMbti(
  categoria: string,
  id?: string
): Promise<ResultadoItem[]> {
  try {
    const params: Params = { categoria };
    if (id) params.id = id;
    const { data } = await api.get("/pruebas/consultas/mbti", { params });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al obtener los resultados de MBTI");
  }
}

export async function descargarReporte(pruebaId: string) {
  try {
    const response = await api.get(`/reporte/${pruebaId}`, {
      responseType: "blob", // Importante para recibir el archivo como blob
    });
    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error inesperado al descargar el reporte");
  }
}
