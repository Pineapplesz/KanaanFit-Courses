"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

const REVIEWS_DATA = [
  { id: 1, src: "/image/results/2.1.jpeg", alt: "Отзыв 1" },
  { id: 2, src: "/image/results/2.1.jpeg", alt: "Отзыв 2" },
  { id: 3, src: "/image/results/2.1.jpeg", alt: "Отзыв 3" },
  { id: 4, src: "/image/results/2.1.jpeg", alt: "Отзыв 4" },
  { id: 5, src: "/image/results/2.1.jpeg", alt: "Отзыв 5" },
  { id: 6, src: "/image/results/2.1.jpeg", alt: "Отзыв 6" },
  { id: 7, src: "/image/results/2.1.jpeg", alt: "Отзыв 7" },
  { id: 8, src: "/image/results/2.1.jpeg", alt: "Отзыв 8" },
];

const BEFORE_AFTER_DATA = [
  { id: 1, src: "/image/results/1.1.jpeg", alt: "До и после 1" },
  { id: 2, src: "/image/results/1.1.jpeg", alt: "До и после 2" },
  { id: 3, src: "/image/results/1.1.jpeg", alt: "До и после 3" },
  { id: 4, src: "/image/results/1.1.jpeg", alt: "До и после 4" },
  { id: 5, src: "/image/results/1.1.jpeg", alt: "До и после 5" },
  { id: 6, src: "/image/results/1.1.jpeg", alt: "До и после 6" },
  { id: 7, src: "/image/results/1.1.jpeg", alt: "До и после 7" },
  { id: 8, src: "/image/results/1.1.jpeg", alt: "До и после 8" },
];

const Results = () => {
  // Простое состояние: какая кнопка нажата
  const [activeTab, setActiveTab] = useState<"beforeAfter" | "reviews">(
    "beforeAfter",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Выбираем список: отзывы или до/после
  const currentList =
    activeTab === "reviews" ? REVIEWS_DATA : BEFORE_AFTER_DATA;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : currentList.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < currentList.length - 1 ? prev + 1 : 0));
  };

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <section className="bg-secondary/60 border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 md:gap-10">
        {/* ЗАГОЛОВОК */}
        <div className="flex flex-col items-start gap-2">
          <div className="inline-flex items-center gap-2 py-1 px-3 border border-emerald-500/20 rounded-full bg-emerald-500/10 text-primary text-xs sm:text-sm font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Реальные результаты</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-foreground">
            Результаты и отзывы
          </h2>
        </div>

        {/* ПЕРЕКЛЮЧАТЕЛЬ ВКЛАДОК (Чистый, без багов Radix) */}
        <div className="flex items-center gap-2 bg-background border border-border/60 p-1.5 rounded-2xl self-start">
          <button
            type="button"
            onClick={() => setActiveTab("beforeAfter")}
            className={`rounded-xl px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer ${
              activeTab === "beforeAfter"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Фото до/после
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`rounded-xl px-4 sm:px-6 py-2.5 text-sm sm:text-base font-semibold transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Отзывы
          </button>
        </div>

        {/* ЕДИНАЯ СЕТКА КАРТИНОК (Не дублируется 2 раза!) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentList.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openGallery(index)}
              className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-background shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`${activeTab === "reviews" ? "object-cover" : "object-contain"} transition-transform duration-300`}
              />
            </div>
          ))}
        </div>

        {/* НИЖНИЕ КНОПКИ */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl w-full sm:w-auto px-8"
          >
            <Link href="/reviews">Смотреть все</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-xl w-full sm:w-auto px-8 shadow-md"
          >
            <Link href="/courses">Выбрать программу</Link>
          </Button>
        </div>
      </div>

      {/* МОДАЛЬНОЕ ОКНО-СЛАЙДЕР */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl sm:max-w-4xl w-[95vw] p-4 sm:p-6 rounded-3xl bg-background border-border/60">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <DialogTitle className="font-heading font-bold text-base sm:text-lg">
              {activeTab === "reviews" ? "Отзывы" : "Результаты"}{" "}
              <span className="text-muted-foreground font-normal ml-2">
                {currentIndex + 1} / {currentList.length}
              </span>
            </DialogTitle>
          </div>

          <div className="relative w-full aspect-[4/3] max-h-[60vh] rounded-2xl overflow-hidden bg-muted/20 border border-border/40 my-3">
            <Image
              src={currentList[currentIndex]?.src || "/image/Hero.JPG"}
              alt="Увеличенный просмотр"
              fill
              className="object-contain"
              priority
            />
            <button
              onClick={handlePrev}
              type="button"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-foreground hover:bg-background transition-all shadow-md cursor-pointer"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/60 flex items-center justify-center text-foreground hover:bg-background transition-all shadow-md cursor-pointer"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 scrollbar-thin">
            {currentList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? "border-emerald-600 scale-105 shadow-sm"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.src}
                  alt="Миниатюра"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Results;
