import Diplomas from "@/components/Diplomas";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="container mx-auto flex flex-col gap-10 md:gap-16 px-4 md:px-2 pt-24 md:pt-26 pb-16 md:pb-20">
      <Hero />
      <Diplomas />
    </div>
  );
}
