import { notFound } from "next/navigation";
import Image from "next/image";
import { Lock, PlayCircle, ShieldCheck } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;

  //  GET UNIQUE COURSE
  const course = await db.course.findUnique({
    where: { slug },
    include: {
      lessons: {
        orderBy: { position: "asc" },
      },
    },
  });
  // IF EXITST/NOT EXIST
  if (!course || !course.isPublished) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 max-w-5xl">
      <div className="flex flex-col gap-10">
        {/* COURSE DESCRIPTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 py-1 px-3 border border-emerald-500/20 rounded-full bg-emerald-500/10 text-emerald-700 text-xs sm:text-sm font-medium self-start">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Безопасная реабилитация</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-foreground leading-[1.15]">
              {course.title}
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Button
                size="lg"
                className="h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md cursor-pointer"
              >
                Купить курс за {course.price}€
              </Button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="order-1 lg:order-2 lg:col-span-5 relative w-full max-w-md lg:max-w-none mx-auto aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-border/50">
            <Image
              src={course.imageUrl || "/image/Hero.JPG"}
              alt={course.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 448px, 450px"
            />
          </div>
        </div>

        {/* BOTTOM SECTION COURSES */}
        <div className="flex flex-col gap-6 pt-8 border-t border-border/60">
          <div className="flex flex-col gap-1">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              Программа курса
            </h2>
            <p className="text-muted-foreground text-sm">
              Все тренировки открываются в личном кабинете сразу после оплаты
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {course.lessons.length > 0 ? (
              course.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl border border-border/60 bg-secondary/30"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm sm:text-base text-foreground">
                        {lesson.position}. {lesson.title}
                      </span>
                      {lesson.description && (
                        <span className="text-xs text-muted-foreground">
                          {lesson.description}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* PAYMENT? LOCK/UNLOCK */}
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-background px-3 py-1.5 rounded-xl border border-border/40">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Закрыто</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center rounded-2xl border border-dashed border-border/80 text-muted-foreground text-sm">
                Уроки скоро будут опубликованы
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
