import { z } from "zod";
import bcrypt from "bcrypt";

export const userSchemas = z.object({
  name: z.string()
    .min(3, { message: "O nome precisa de 3 caracteres." })
    .max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  username: z.string()
    .min(3, { message: "O nome precisa de 3 caracteres." })
    .max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().transform(password => bcrypt.hashSync(password, 12)),
  createAt: z.date().optional(),
  updateAt: z.date().optional(),
});

export const userLoginSchemas = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().transform(password => bcrypt.hashSync(password, 12)),
})
  .or(
    z.object({
      username: z.string()
        .min(3, { message: "O nome precisa de 3 caracteres." })
        .max(50, { message: "O nome precisar ter menos de 50 caracteres" }),
      password: z.string().transform(password => bcrypt.hashSync(password, 12)),
    })
  );

export type UserInterface = z.infer<typeof userSchemas>;
export type UserLoginInterface = z.infer<typeof userLoginSchemas>;

