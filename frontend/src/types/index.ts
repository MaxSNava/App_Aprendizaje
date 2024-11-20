import { z } from "zod";

/** Auth **/
export const authSchema = z.object({
  nickname: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  current_password: z.string(),
  fullName: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type AuthLoginForm = Pick<Auth, "nickname" | "password">;

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
  nombre: z.string(),
  descripcion: z.string(),
});

export type Grupo = z.infer<typeof grupoSchema>;

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
