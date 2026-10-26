import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Имя должно содержать минимум 2 буквы" })
    .max(50, { message: "Слишком длинное имя" }),
  email: z
    .string()
    .email({ message: "Введите корректный email (например, name@mail.com)" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(1, { message: "Введите пароль" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
