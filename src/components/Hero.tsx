import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Hero = () => {
  const HERO_LINKS = {
    name: "Сьюзен Канаан",
    badge: "Физическая терапия & Умный фитнес",
    subtitle: "Красивое тело без боли в суставах и спине",
    description:
      "Авторские тренировочные программы и персональная реабилитация от дипломированного специалиста. Безопасные нагрузки при грыжах, протрузиях и сидячем образе жизни.",
    buttonPrimary: "Вырать курс",
    buttonPrimaryHref: "/courses",
    buttonSecondary: "Записать на тренировку",
    buttonSecondaryHref: "/booking",
    image: "/image/Hero.JPG",
    imageAlt: "Kanaan",
  };

  return (
    <section className="relative overflow-hidden bg-secondary/60 border border-border/50 rounded-3xl p-6 md:p-12 xl:p-16">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-12 xl:gap-30">
        <div className="flex flex-col items-start gap-6 max-w-xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 
          text-xs md:text-sm font-medium border border-emerald-500/20"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{HERO_LINKS.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight font-heading leading-[1.15]">
            {HERO_LINKS.name}
          </h1>

          <p className="text-xl sm:text-2xl text-foreground/90">
            {HERO_LINKS.subtitle}
          </p>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            {HERO_LINKS.description}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <Button
              asChild
              size={"lg"}
              className="h-12 md:h-14 px-8 text-base md:text-lg font-semibold rounded-xl shadow-md"
            >
              <Link href={HERO_LINKS.buttonPrimaryHref}>
                {HERO_LINKS.buttonPrimary}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              size={"lg"}
              className="h-12 md:h-14 px-8 text-base md:text-lg font-semibold rounded-xl shadow-md bg-background/60"
            >
              <Link href={HERO_LINKS.buttonSecondaryHref}>
                {HERO_LINKS.buttonSecondary}
              </Link>
            </Button>
          </div>
        </div>
        <div
          className="relative w-full shrink-0 max-w-[320px] md:max-w-[360px] lg:max-w-[420px] xl:max-w-[420px] aspect-4/5 rounded-2xl 
          overflow-hidden shadow-lg border border-border/40"
        >
          <Image
            alt={HERO_LINKS.imageAlt}
            src={HERO_LINKS.image}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
