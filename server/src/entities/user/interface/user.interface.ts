import { z } from "zod";

export const userSchemas = z.object({
  name: z.string()
    .min(3, { message: "O nome precisa de 3 caracteres." })
    .max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  username: z.string()
    .min(3, { message: "O nome precisa de 3 caracteres." })
    .max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string(),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),
});

export type UserInterface = z.infer<typeof userSchemas>;

