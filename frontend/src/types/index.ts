import { z } from "zod";

/** Auth **/
// const authSchema = z.object({});

/** User **/
export const userSchema = z.object({
  _id: z.string(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Debe ser un email válido"),
  grupos: z.array(z.string()).optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserFormData = Pick<User, "nombre" | "email" | "grupos">;
