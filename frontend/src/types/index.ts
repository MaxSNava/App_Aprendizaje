import { z } from "zod";

/** Auth **/
export const authSchema = z.object({
  id: z.string(),
  nickname: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  fullName: z.string(),
  token: z.string(),
  isActive: z.boolean(),
  roles: z.array(z.string()), // Asegúrate de que roles es un array
});

type Auth = z.infer<typeof authSchema>;
export type AuthLoginForm = Pick<Auth, "nickname" | "password">;
export type AuthRegistrationForm = Pick<
  Auth,
  "nickname" | "password" | "fullName"
>;

export type authUserSchema = Pick<
  Auth,
  "id" | "nickname" | "fullName" | "isActive" | "roles"
>;

export const AuthSchemaplus = z.object({
  id: z.string(),
  nickname: z.string(),
  fullName: z.string(),
  isActive: z.boolean(),
  roles: z.array(z.string()), // Asegúrate de que roles es un array
});

/** User **/
export const userSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  email: z.string(),
  grupos: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserFormData = Pick<User, "nombre" | "email" | "grupos"> & {
  usuarioId?: string;
};

/** Grupo **/
export const grupoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
});

export type Grupo = z.infer<typeof grupoSchema>;
export type GrupoFormData = Pick<Grupo, "nombre" | "descripcion">;

/** Prueba **/
export const pruebaSchema = z.object({
  tipoPrueba: z.string(),
  usuarioId: z.string(),
  preguntaId: z.number(),
  opcionId: z.number(),
});

export type Prueba = z.infer<typeof pruebaSchema>;
export type PruebaFormData = Pick<Prueba, "tipoPrueba" | "usuarioId">;
export type PruebaVarkRes = Pick<Prueba, "preguntaId" | "opcionId">;

/** Pregunta VARK **/
export const preguntaVarkSchema = z.object({
  id: z.number(),
  textoPregunta: z.string(),
  opciones: z.array(
    z.object({
      id: z.number(),
      textoOpcion: z.string(),
      estilo: z.string(),
    })
  ),
});

export type PreguntaVark = z.infer<typeof preguntaVarkSchema>;

export const resultadoVarkSchema = z.object({
  visual: z.number(),
  auditivo: z.number(),
  lecturaEscritura: z.number(),
  kinestesico: z.number(),
  tipoResultado: z.string(),
});

export type ResultadoVark = z.infer<typeof resultadoVarkSchema>;

/** Pregunta MBTI **/
export const preguntaMbtiSchema = z.object({
  id: z.number(),
  textoPregunta: z.string(),
  dimension: z.string(),
  opciones: z.array(
    z.object({
      id: z.number(),
      textoOpcion: z.string(),
      puntaje: z.number(),
      categoria: z.string(),
    })
  ),
});

export type PreguntaMbti = z.infer<typeof preguntaMbtiSchema>;

export type PruebaMbtiRes = {
  preguntaId: number;
  opcionId: number;
};

export const resultadoMbtiSchema = z.object({
  id: z.string(),
  extrovertido: z.number(),
  introvertido: z.number(),
  sensorial: z.number(),
  intuitivo: z.number(),
  racional: z.number(),
  emocional: z.number(),
  calificador: z.number(),
  perceptivo: z.number(),
  tipoPersonalidad: z.string(),
});

export type ResultadoMbti = z.infer<typeof resultadoMbtiSchema>;

export const resultadoItemSchema = z.object({
  id: z.string(),
  tipoPrueba: z.enum(["vark", "mbti"]),
  fechaRealizacion: z.string(),
  usuarioId: z.string(),
  usuarioNombre: z.string(),
  resultadoVark: resultadoVarkSchema.optional(),
  resultadoMbti: resultadoMbtiSchema.optional(),
});

export type ResultadoItem = z.infer<typeof resultadoItemSchema>;
