"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export type MethodPhase = {
  n: string;
  title: string;
  body: string;
  extra: string;
  image: string;
  alt: string;
};

export function MethodPhaseSection({ phase }: { phase: MethodPhase }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={reduceMotion ? "relative" : "relative lg:h-[180vh]"}>
      <div
        className={
          reduceMotion
            ? "relative h-[72vh] min-h-[560px] overflow-hidden bg-ink"
            : "relative h-[72vh] min-h-[560px] overflow-hidden bg-ink lg:sticky lg:top-0 lg:h-screen lg:min-h-0"
        }
      >
        <Image
          src={phase.image}
          alt={phase.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/20" />

        <Container className="relative flex h-full flex-col justify-end pb-14 lg:justify-center lg:pb-0">
          <Reveal>
            <span className="font-display text-4xl font-bold text-brand-light sm:text-5xl">{phase.n}</span>
          </Reveal>
          <Reveal delay={0.12}>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-white text-balance">
              {phase.title}
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/80">{phase.body}</p>
          </Reveal>
          <Reveal delay={0.34}>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/60">{phase.extra}</p>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
