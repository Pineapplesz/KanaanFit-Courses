"use server";

import { db } from "@/lib/db";
import { RegisterSchema, type RegisterInput } from "@/lib/schemas";
import bcrypt from "bcryptjs";

export async function registerUser(value: RegisterInput) {
  /* 1 validate fields?*/
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Некорректно заполнены поля формы" };
  }

  const { name, email, password } = validatedFields.data;

  try {
    /*2 user exist?*/
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Пользователь с таким email уже существует" };
    }

    /*3 hash password*/
    const hashedPassword = await bcrypt.hash(password, 10);

    /*4 new user*/
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });
    return { success: "Аккаунт успешно создан! Теперь вы можете войти." };
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return { error: "Что-то пошло не так. Попробуйте позже." };
  }
}
