"use client";
import { Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import Image from "next/image";

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
  { id: 1, src: "/image/results/1.1.jpeg", alt: "До и псоле 1" },
  { id: 2, src: "/image/results/1.1.jpeg", alt: "До и псоле 2" },
  { id: 3, src: "/image/results/1.1.jpeg", alt: "До и псоле 3" },
  { id: 4, src: "/image/results/1.1.jpeg", alt: "До и псоле 4" },
  { id: 5, src: "/image/results/1.1.jpeg", alt: "До и псоле 5" },
  { id: 6, src: "/image/results/1.1.jpeg", alt: "До и псоле 6" },
  { id: 7, src: "/image/results/1.1.jpeg", alt: "До и псоле 7" },
  { id: 8, src: "/image/results/1.1.jpeg", alt: "До и псоле 8" },
];

const Results = () => {
  const [activeTab, setActiveTav] = useState<"reviews" | "beforeAfter">(
    "beforeAfter",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(!isOpen);
  };
  return (
    <section className="bg-secondary/60 border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 md:gap-10">
        {/* TITLE */}
        <div className="flex flex-col items-start gap-2">
          <div
            className="inline-flex items-center gap-2 py-1 px-3 border border-emerald-500/20 rounded-full bg-emerald-500/10
      text-primary text-xs sm:text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Реальные результаты</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight text-foreground">
            Результаты и отзывы
          </h2>
        </div>

        {/* TABS */}
        <Tabs
          defaultValue="beforeAfter"
          onValueChange={(val) =>
            setActiveTav(val as "reviews" | "beforeAfter")
          }
          className="w-full flex flex-col gap-6"
        >
          {/* TABS SWITCH */}
          <TabsList className="bg-background border border-border/60 px-2 py-6 rounded-2xl h-auto self-start">
            <TabsTrigger
              value="beforeAfter"
              className="rounded-xl px-5 py-4 text-base font-semibold data-[state=active]:bg-primary/90
              data-[state=active]:text-white transition-all cursor-pointer"
            >
              Фото до/после
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-xl px-5 py-4 text-base font-semibold data-[state=active]:bg-primary/90
              data-[state=active]:text-white transition-all cursor-pointer"
            >
              Отзывы
            </TabsTrigger>
          </TabsList>

          {/* TABS CONTENT */}
          <TabsContent value="beforeAfter" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {BEFORE_AFTER_DATA.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openGallery(index)}
                  className="relative w-full aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-border/60
                  bg-background shadow-sm hover:shadow-md hover hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* КОНТЕНТ ВКЛАДКИ: ОТЗЫВЫ */}
          <TabsContent value="reviews" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {REVIEWS_DATA.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => openGallery(index)}
                  className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 bg-background 
                    shadow-sm hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer group"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* PREVIEW DIALOG */}
      </div>
    </section>
  );
};

export default Results;
