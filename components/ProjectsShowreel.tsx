"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SHOWREEL_CROPS } from "@/lib/projects";

const HOLD_MS = 2600;

export function ProjectsShowreel() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      // Skip ticks while the tab is backgrounded — requestAnimationFrame-driven
      // transitions don't run then, so there's no point advancing state.
      if (document.hidden) return;
      setIndex((i) => (i + 1) % SHOWREEL_CROPS.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const current = SHOWREEL_CROPS[index];

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink sm:aspect-[21/9]">
      {reduceMotion ? (
        <Image
          src={SHOWREEL_CROPS[0].src}
          alt={SHOWREEL_CROPS[0].alt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      ) : (
        // Every crop stays permanently mounted; only its opacity/position is
        // animated. This avoids relying on exit-then-unmount timing (which
        // needs requestAnimationFrame to ever run) to keep the DOM clean.
        SHOWREEL_CROPS.map((crop, i) => (
          <motion.div
            key={crop.src}
            className="absolute inset-0"
            initial={false}
            animate={i === index ? { x: 0, opacity: 1 } : { x: -60, opacity: 0 }}
            transition={{ duration: i === index ? 0.6 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ zIndex: i === index ? 1 : 0 }}
            aria-hidden={i === index ? undefined : true}
          >
            <Image
              src={crop.src}
              alt={crop.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              className="object-cover"
            />
          </motion.div>
        ))
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 py-6 sm:px-10 sm:py-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
          Siti realizzati per i nostri clienti
        </p>
        <p className="font-display text-sm font-semibold text-white sm:text-base">{current.projectName}</p>
      </div>
    </div>
  );
}
