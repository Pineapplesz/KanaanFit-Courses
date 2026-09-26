import { Button } from "./ui/button";
import { ChevronRight, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

const Diplomas = () => {
  const DIPlOMAS_LINKS = {
    h2: "Безопасный подход к тренировкам",
    text: "Анатомический подход, постепенность и бережная работа с суставами важны так же, как визуальный результат. Все программы разработаны дипломированным реабилитологом.",
    certificateText: "Сертификаты фитнес-тренера",
    certificateSubText: "открыть документ",
  };
  const DIPlOMAS_IMG = [
    {
      title: "Диплом физио-реабилитолога",
      src: "/image/Diploma1.jpg",
      alt: 'Диплом реабилитолога"',
    },
    {
      title: "Сертификат",
      src: "/image/Diploma2.jpg",
      alt: "Сертификат фитнес-тренера",
    },
  ];
  return (
    <section className="bg-secondary/40 border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN*/}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-snug">
            {DIPlOMAS_LINKS.h2}
          </h2>
          <p className="text-muted-foreground border-l-3 pl-4 border-primary/50 text-base md:text-lg leading-relaxed">
            {DIPlOMAS_LINKS.text}
          </p>
        </div>

        {/* POPUP DIALOG WINDOW*/}
        <div className="lg:col-span-5">
          <Dialog>
            <DialogTrigger asChild>
              {/* RIGHT COLUMN*/}

              <button
                type="button"
                className="w-full p-4 sm:p-5 flex justify-between items-center rounded-2xl border border-border/60 
                bg-background hover:border-emerald-500/40 hover:shadow-md transition-all text-left group 
                cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-base text-foreground">
                      {DIPlOMAS_LINKS.certificateText}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {DIPlOMAS_LINKS.certificateSubText}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-muted/60 group-hover:bg-muted transition-colors flex items-center justify-center shrink-0">
                  <ChevronRight className="w-5 h-5  text-emerald-600" />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl sm:max-w-4xl w-[95vw] p-4 sm:p-6 rounded-2xl">
              <DialogHeader className="mb-2">
                <DialogTitle className="font-heading font-bold text-xl sm:text-2xl text-left">
                  {DIPlOMAS_LINKS.certificateText}
                </DialogTitle>
              </DialogHeader>
              <div className=" max-h-[75vh] overflow-y-auto flex flex-col gap-6">
                {DIPlOMAS_IMG.map((img, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {img.title}
                    </span>
                    <div
                      className="relative w-full md:aspect-[4/3] aspect-[5/4] rounded-xl overflow-hidden border 
                    border-border/40 bg-muted/20"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default Diplomas;
