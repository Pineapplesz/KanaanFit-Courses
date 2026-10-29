"use client";

import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, Eye, EyeOff, Loader2Icon } from "lucide-react";

type FormData = {
  name?: string;
  email: string;
  password: string;
};

const Page = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(isRegister ? RegisterSchema : LoginSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: FormData) => {
    setErrorMessage(null);
    if (isRegister) {
      {
        /* REGISTRATION */
      }
      const res = await registerUser({
        name: data.name || "",
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        setErrorMessage(res.error);
        return;
      }

      try {
        const loginRes = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        if (loginRes?.error) {
          setIsRegister(false);
          setErrorMessage(
            "Аккаунт создан! Пожалуйста, войдите со своим паролем.",
          );
          return;
        }

        router.push("/");
        router.refresh();
      } catch {
        setIsRegister(false);
        setErrorMessage("Аккаунт создан! Войдите со своими данными.");
      }
    } else {
      try {
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
      } catch {
        setErrorMessage("Неверный email или пароль");
      }
    }
  };

  return (
    <div
      className={`min-h-[calc(100svh-4rem)] flex items-center justify-center gap-4 p-4 xl:mt-0
        ${isRegister ? "mt-18" : "mt-10"}`}
    >
      <Card className="w-full max-w-md rounded-3xl shadow-xl border-border/60 bg-background/95 backdrop-blur-sm">
        {/* TITLE */}
        <CardHeader className="text-center pb-4">
          <CardTitle className="font-heading text-2xl font-bold text-foreground">
            {isRegister ? "Создать аккаунт" : "Вход в аккаунт"}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {isRegister
              ? "Зарегистрируйтесь для доступа к тренировкам"
              : "Введите данные для доступа к вашим курсам"}
          </CardDescription>
        </CardHeader>

        {/* GOOGLE BUTTON LOGIN */}
        <CardContent className="flex flex-col gap-5">
          <Button
            variant="outline"
            className="w-full h-11 rounded-xl gap-2 font-medium border-border/80 hover:bg-muted/60 cursor-pointer shadow-sm"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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

          {/* SEPARATOR */}
          <div className="relative flex items-center justify-center">
            <span className="w-full border-t border-border/60" />
            <span className="bg-card px-3 text-xs uppercase text-muted-foreground shrink-0 font-medium">
              или по почте
            </span>
            <span className="w-full border-t border-border/60" />
          </div>

          {/* ERRORS */}
          {errorMessage && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-in fade-in-50 duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />{" "}
              <span>{errorMessage}</span>
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 "
          >
            {isRegister && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  Ваше имя
                </label>
                <Input
                  {...register("name")}
                  placeholder="Ваше имя"
                  className="rounded-xl h-11 focus-visible:ring-emerald-500"
                  disabled={isSubmitting}
                  autoComplete="name"
                />
                {errors.name && (
                  <span className="text-destructive text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Email
              </label>
              <Input
                {...register("email")}
                type="email"
                placeholder="anna@gmail.com"
                className="rounded-xl h-11 focus-visible:ring-emerald-500"
                disabled={isSubmitting}
                autoComplete="email"
              />
              {errors.email && (
                <span className="text-destructive text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Пароль
              </label>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="rounded-xl h-11 focus-visible:ring-emerald-500 pr-11"
                  disabled={isSubmitting}
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 -translate-y-1/2 top-1/2 text-muted-foreground hover:text-foreground
                  transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-destructive text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            {/* SEND FORM */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium cursor-pointer shadow-md mt-1 transition-all"
            >
              {isSubmitting ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : isRegister ? (
                "Зарегистрироваться"
              ) : (
                "Войти"
              )}
            </Button>
          </form>

          {/* LOGIN/REGISTER SWITCHER */}
          <div className="text-center text-sm text-muted-foreground pt-1">
            {isRegister ? (
              <span>
                Уже есть аккаунт?{" "}
                <button
                  type="button"
                  className="text-emerald-600 hover:underline font-semibold cursor-pointer"
                  onClick={() => {
                    setIsRegister(false);
                    setErrorMessage(null);
                    reset();
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
                  className="text-emerald-600 hover:underline font-semibold cursor-pointer"
                  onClick={() => {
                    setIsRegister(true);
                    setErrorMessage(null);
                    reset();
                  }}
                >
                  Зарегистрироваться
                </button>
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
