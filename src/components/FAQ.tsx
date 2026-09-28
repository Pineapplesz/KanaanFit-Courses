import { HelpCircle, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import Link from "next/link";

const FAQ_ITEMS = [
  {
    id: "item-1",
    question: "Безопасны ли тренировки при грыжах, протрузиях и сколиозе?",
    answer:
      "Да, абсолютно. Все программы составлены дипломированным физио-реабилитологом с учетом анатомии позвоночника. В курсах полностью исключены осевые нагрузки, прыжки и опасные скручивания. Мы укрепляем глубокие мышцы-стабилизаторы, которые разгружают суставы.",
  },
  {
    id: "item-2",
    question: "Какой инвентарь нужен для домашних тренировок?",
    answer:
      "В 90% тренировок вам понадобится только обычный гимнастический коврик и удобная одежда. В некоторых продвинутых уроках используются фитнес-резинки и легкие гантели (их можно легко заменить бутылками с водой).",
  },
  {
    id: "item-3",
    question: "Сколько времени занимает одна тренировка?",
    answer:
      "Уроки длятся от 20 до 35 минут. Это оптимальное время, чтобы бережно проработать тело, снять зажимы после рабочего дня и не перегрузить нервную систему. Заниматься можно в любое удобное время.",
  },
  {
    id: "item-4",
    question: "Я совсем новичок и никогда не занимался(ась). Мне подойдет?",
    answer:
      "Курсы построены по принципу «от простого к сложному». В каждом упражнении я подробно объясняю биомеханику, дыхание и частые ошибки, а также показываю облегченные вариации движений.",
  },
  {
    id: "item-5",
    question: "Как проходят онлайн-консультации и персональные занятия?",
    answer:
      "Мы созваниваемся по видеосвязи, я провожу визуальную диагностику вашей осанки и паттернов движения, после чего мы разбираем причины болей и формируем персональный план реабилитации.",
  },
];

const FAQ = () => {
  return (
    <section className="bg-secondary/60 border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl mx-auto flex flex-col gap-10 md:gap-12">
        {/*TITLE*/}
        <div className="flex flex-col items-center text-center gap-3 md:gap-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-primary
          text-xs sm:text-sm font-medium border borde-emerald-500/20"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Частые вопросы</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Ответы на популярные вопросы
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Всё, что нужно знать о старте занятий, безопасности и формате
            тренировок
          </p>
        </div>

        {/* ACCORDION*/}
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-3 md:gap-5"
        >
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border border-border/60 bg-background rounded-2xl px-5 md:px-6 transition-colors
              data-[state=open]:border-emerald-500/40 data-[state=open]:shadow-sm"
            >
              <AccordionTrigger
                className="font-heading text-left text-base sm:text-lg font-semidbold 
              hover:no-underline cursor-pointer py-6 text-foreground"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm sm:text-base leading-relaxed pb-5 pt-1">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {/* NO ANSWER?*/}
        <div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 
        border border-border/80 rounded-2xl bg-background/50 text-center sm:text-left mt-2"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-sm sm:text-base text-muted-foreground">
              Не нашли ответ на свой вопрос?
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Напишите мне лично, и я проконсультирую по вашей ситуации
            </span>
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="https://t.me/your_telegram" target="_blank">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Задать вопрос</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
