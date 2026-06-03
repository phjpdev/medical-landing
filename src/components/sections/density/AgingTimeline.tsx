import Image from "next/image";
import { RevealOnScroll } from "@/components/visual/RevealOnScroll";

export function AgingTimeline() {
  return (
    <section className="container-x py-24">
      <RevealOnScroll>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gold-radial opacity-50" />
          <div className="relative overflow-hidden rounded-3xl gold-border bg-white shadow-gold-lg">
            <Image
              src="/images/photo_2026-06-04_03-26-31.jpg"
              alt="CLASSIC TIP / HIGH TIP · 單極逆齡效果"
              width={1260}
              height={1574}
              sizes="(max-width: 1024px) 95vw, 75vw"
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -left-3 -top-3 hidden h-14 w-14 rounded-tl-2xl border-l-2 border-t-2 border-gold-primary lg:block" />
          <div className="absolute -bottom-3 -right-3 hidden h-14 w-14 rounded-br-2xl border-b-2 border-r-2 border-gold-primary lg:block" />
        </div>
      </RevealOnScroll>
    </section>
  );
}
