"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { IconArrowUpRight, IconChevronDown } from "@/components/icons";

const HEADLINE_LINES = ["Idee veloci.", "Decisioni chiare.", "Risultati misurabili."];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const showVideo = isDesktop && !reduceMotion;

  useEffect(() => {
    if (showVideo) {
      videoRef.current?.play().catch(() => {});
    }
  }, [showVideo]);

  return (
    <section id="main" className="relative isolate overflow-hidden bg-ink pt-[132px] pb-24 lg:pt-[168px] lg:pb-32">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/generated/hero-loop-poster.webp"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {showVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/generated/hero-loop.mp4"
            poster="/generated/hero-loop-poster.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Marketing che porta clienti.
          </motion.p>

          <h1 className="font-display font-bold leading-[0.98] tracking-tightest text-[clamp(2.75rem,7vw,5.5rem)] text-white text-balance">
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line}
                initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${i === 1 ? "text-brand-light text-glow" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/80"
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
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white"
            >
              Scopri i servizi
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm"
          >
            <p className="font-display text-3xl font-bold text-white">+450</p>
            <p className="max-w-[12rem] text-sm leading-snug text-white/75">progetti sviluppati e creati dal 2020</p>
          </motion.div>
        </div>

        <motion.a
          href="#chi-siamo"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 hidden items-center gap-2 text-sm font-medium text-white/70 lg:flex"
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
