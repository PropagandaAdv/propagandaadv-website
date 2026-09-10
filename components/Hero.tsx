"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { IconArrowUpRight, IconChevronDown } from "@/components/icons";

const HEADLINE_LINES = ["Idee veloci.", "Decisioni chiare.", "Risultati misurabili."];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="main" className="relative overflow-hidden bg-paper pt-[132px] pb-20 lg:pt-[168px] lg:pb-28">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, #233DFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] grid-dots-dark opacity-40" aria-hidden="true" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium text-ink-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Marketing che porta clienti.
            </motion.p>

            <h1 className="font-display font-bold leading-[0.98] tracking-tightest text-[clamp(2.75rem,7vw,5.5rem)] text-ink text-balance">
              {HEADLINE_LINES.map((line, i) => (
                <motion.span
                  key={line}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={`block ${i === 1 ? "text-brand" : ""}`}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
            >
              Dallo sviluppo di siti web vetrina alle strategie di lead generation innovative: affianchiamo
              imprenditori e decision maker nella crescita, con un processo unico che integra strategia,
              sviluppo, advertising, SEO e analisi dei dati.
            </motion.p>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contatti"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Richiedi una consulenza gratuita
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#servizi"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink"
              >
                Scopri i servizi
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-ink shadow-2xl shadow-brand/10">
              <Image
                src="/generated/hero-abstract.jpg"
                alt="Composizione astratta blu e nera che rappresenta velocità decisionale e crescita data-driven"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="absolute -left-6 bottom-6 hidden w-[240px] rounded-2xl border border-line bg-paper/95 p-5 shadow-xl backdrop-blur sm:block"
            >
              <p className="font-display text-3xl font-bold text-ink">+450</p>
              <p className="mt-1 text-sm text-muted">progetti sviluppati e creati dal 2020</p>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href="#chi-siamo"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 hidden items-center gap-2 text-sm font-medium text-ink-soft lg:flex"
          aria-label="Scorri per saperne di più"
        >
          Scorri
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}
