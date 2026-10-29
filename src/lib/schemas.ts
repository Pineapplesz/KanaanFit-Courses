import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Имя должно содержать минимум 2 буквы" })
    .max(50, { message: "Слишком длинное имя" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Введите корректный email (например, name@mail.com)" })
    .max(100, { message: "Email слишком длинный" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть не менее 6 символов" })
    .max(72, { message: "Пароль слишком длинный" }),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "Введите корректный email" })
    .max(100, { message: "Email слишком длинный" }),
  password: z
    .string()
    .min(1, { message: "Введите пароль" })
    .max(72, { message: "Пароль слишком длинный" }),
});

export type LoginInput = z.infer<typeof LoginSchema>;
