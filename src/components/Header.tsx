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
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Главная" },
  { href: "/", label: "Курсы" },
  { href: "/", label: "Тренировки" },
  { href: "/", label: "О нас" },
];
const NAV_LINKS_BUTTON = { name: "Личный кабинет", href: "/login" };

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md font-sans">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-emerald-500 hover:opacity-90 transition-opacity"
        >
          Kanaan<span className="text-foreground">Fit</span>
        </Link>

        {/* Desktop MENU */}
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
        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            variant="outline"
            className="border-emerald-500/30 hover:border-emerald-500 hover:text-emerald-500 h-12 px-8 text-md"
          >
            <Link href={NAV_LINKS_BUTTON.href}>{NAV_LINKS_BUTTON.name}</Link>
          </Button>
        </div>

        {/*BURGER MENU */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                asChild
                variant="ghost"
                size="icon"
                aria-label="Открыть меню"
              >
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="text-xl font-bold text-emerald-500 text-center">
                    KanaanFit
                  </SheetTitle>
                </SheetHeader>

                {/* burger menu */}
                <nav className="flex flex-col gap-4 text-center">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-medium text-muted-foreground transition-colors hover:text-foreground py-1"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t">
                <Button
                  asChild
                  className="w-full bg-emerald-500 hover:bg-emerald-600 border-emerald-600/80 text-white mb-6 text-lg shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={NAV_LINKS_BUTTON.href}>
                    {NAV_LINKS_BUTTON.name}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
