import { db } from "@/lib/db";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function Courses() {
  // 1. Забираем курсы из базы Neon
  const courses = await db.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { lessons: true },
      },
    },
  });

  if (courses.length === 0) {
    return null;
  }

  return (
    <section
      id="courses"
      className="flex flex-col gap-8 md:gap-10 bg-secondary/60 border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-10"
    >
      {/* TITLE */}
      <div className="flex flex-col items-start gap-2">
        <div className="inline-flex items-center gap-2 py-1 px-3 border border-emerald-500/20 rounded-full bg-emerald-500/10 text-emerald-700 text-xs sm:text-sm font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Авторские методики</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Программы тренировок
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
          Безопасные онлайн-курсы для восстановления подвижности, снятия болей и
          подтяжки тела дома
        </p>
      </div>

      {/* COURSES GRIDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex flex-col justify-between rounded-3xl border border-border/60 bg-background overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300 group "
          >
            <div>
              {/* Course Title */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                <Image
                  src={course.imageUrl || "/image/Hero.JPG"}
                  alt={course.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Prices */}
                <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border/40 font-heading font-bold text-sm sm:text-base text-foreground shadow-sm">
                  {course.price} €
                </div>
              </div>
              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col gap-3">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {course._count.lessons > 0
                      ? `${course._count.lessons} уроков`
                      : "4 недели"}
                  </span>
                  <span>•</span>
                  <span>Доступ 6 месяцев</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-emerald-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </div>
            </div>
            <div className="p-5 sm:p-6 pt-0">
              <Button asChild size={"lg"} className="w-full">
                <Link href={`/courses/${course.slug}`}>
                  <span>Подробнее о курсе</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"></ArrowRight>
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
