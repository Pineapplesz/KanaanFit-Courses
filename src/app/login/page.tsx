"use client";

import { RegisterInput, RegisterSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/register";

const Page = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: RegisterInput) => {
    setErrorMessage(null);
    if (isRegister) {
      const res = await registerUser(data);
      if (res.error) {
        setErrorMessage(res.error);
        return;
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      router.push("/");
      router.refresh();
    } else {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMessage("Неверный email или пароль");
        return;
      }

      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 mt-20 flex flex-col gap-4">
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center">
        {isRegister ? "Создать аккаунт" : "Вход в аккаунт"}
      </h1>

      {/* ERRORS */}
      {errorMessage && (
        <div className="p-3 bg-red-100 text-red-600 rounded text-sm text-center">
          {errorMessage}
        </div>
      )}
      {/* GOOGLE BUTTON LOGIN */}
      <Button
        variant="outline"
        className="w-full h-11 rounded-xl gap-2 text-md font-medium border-border/80 cursor-pointer mt-6"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Продолжить с Google</span>
      </Button>
      <div className="relative flex items-center justify-center">
        <span className="w-full border-t border-border/60" />
        <span className="bg-card px-3 text-xs uppercase text-muted-foreground shrink-0">
          или по почте
        </span>
        <span className="w-full border-t border-border/60" />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 ">
        {isRegister && (
          <div>
            <input
              {...register("name")}
              placeholder="Ваше имя"
              className="border p-2 w-full rounded-xl"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
        )}
        <div>
          <input
            {...register("email")}
            placeholder="email"
            className="border p-2 w-full rounded-xl"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            placeholder="password"
            className="border p-2 w-full rounded-xl"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        {/* SEND FORM */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl font-medium"
        >
          {isSubmitting
            ? "Подождите..."
            : isRegister
              ? "Зарегистрироваться"
              : "Войти"}
        </button>
      </form>

      {/* LOGIN/REGISTER SWITCHER */}
      <div className="text-center text-md mt-2">
        {isRegister ? (
          <span>
            Уже есть аккаунт?{" "}
            <button
              type="button"
              className="text-emerald-600 hover:underline transition-all duration-200 font-medium"
              onClick={() => {
                setIsRegister(false);
                setErrorMessage(null);
              }}
            >
              Войти
            </button>
          </span>
        ) : (
          <span>
            Нет аккаунта?{" "}
            <button
              type="button"
              className="text-emerald-600 hover:underline transition-all duration-200 font-medium"
              onClick={() => {
                setIsRegister(true);
                setErrorMessage(null);
              }}
            >
              Зарегистрироваться
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Page;
