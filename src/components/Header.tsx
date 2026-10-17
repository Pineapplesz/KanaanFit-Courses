"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { LogOutIcon, Menu, User } from "lucide-react";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/", label: "Курсы" },
  { href: "/", label: "Тренировки" },
  { href: "/", label: "О нас" },
];
const NAV_LINKS_BUTTON = { name: "Личный кабинет", href: "/login" };

interface HeaderProps {
  session: Session | null;
}

const Header = ({ session }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = session?.user;
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md font-sans">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-emerald-500 hover:opacity-90 transition-opacity"
        >
          Kanaan<span className="text-foreground">Fit</span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex items-center gap-8 text-md font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP AUTH*/}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 h-auto py-1 px-3 rounded-full"
                >
                  <Avatar className="w-9 h-9">
                    <AvatarImage
                      src={user.image || ""}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback className="bg-emerald-500/10 text-emerald-700 font-semibold">
                      {user.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden lg:flex text-sm font-medium truncate max-w-45">
                    {user.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={8}
                align="end"
                className="w-56 p-2 rounded-2xl border-border/60 shadow-lg"
              >
                <div className="px-2 py-1.5 text-left">
                  <p className="text-sm font-semibold leading-none truncate text-foreground">
                    {user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link href={"/dashboard"} className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Аккаунт
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOutIcon className="mr-1 h-4 w-4" />
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="outline"
              className="border-emerald-500/30 hover:border-emerald-500 hover:text-emerald-600 h-11 px-6 rounded-xl 
              font-medium"
            >
              <Link href={NAV_LINKS_BUTTON.href}>{NAV_LINKS_BUTTON.name}</Link>
            </Button>
          )}
        </div>

        {/*BURGER MENU */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Открыть меню">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] p-6 flex flex-col justify-between"
            >
              {/* LOGO */}
              <div className="flex flex-col gap-6">
                <SheetHeader className="text-left p-0">
                  <SheetTitle className="text-xl font-bold tracking-tight text-emerald-600">
                    Kanaan<span className="text-foreground">Fit</span>
                  </SheetTitle>
                </SheetHeader>

                {/* USER CARD(IF AUTH ON) */}
                {user ? (
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50 border border-border/60">
                    <Avatar className="h-11 w-11 border border-border/50">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback className="bg-emerald-500/10 text-emerald-700 font-semibold text-sm">
                        {user.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-semibold text-sm truncate text-foreground">
                        {user.name}
                      </span>
                      <span
                        className="text-xs text-muted-foreground truncate"
                        title={user.email || ""}
                      >
                        {user.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground -mt-3">
                    Тренировки и реабилитация онлайн
                  </p>
                )}

                {/* navigation */}
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center h-11 px-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* if login add button */}
                  {user && (
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 h-11 px-3 rounded-xl text-base font-semibold text-emerald-600 hover:bg-emerald-500/10 transition-colors mt-2"
                    >
                      <User className="w-5 h-5" />
                      <span>Личный кабинет</span>
                    </Link>
                  )}
                </nav>
              </div>

              {/* 3. bottom button login/logout */}
              <div className="pt-4 border-t border-border/60">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 h-11 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 font-medium cursor-pointer"
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <LogOutIcon className="w-4 h-4" />
                    <span>Выйти из аккаунта</span>
                  </Button>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-11 rounded-xl font-medium shadow-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/api/auth/signin">Войти через Google</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
