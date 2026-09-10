"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SHOWREEL_CROPS } from "@/lib/projects";

const HOLD_MS = 2600;

export function ProjectsShowreel() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      // Skip ticks while the tab is backgrounded: requestAnimationFrame-driven
      // exit transitions don't run then, so letting the index keep advancing
      // would pile up un-removed slides in the DOM until the tab is refocused.
      if (document.hidden) return;
      setIndex((i) => (i + 1) % SHOWREEL_CROPS.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const crop = SHOWREEL_CROPS[index];

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
        <AnimatePresence mode="wait">
          <motion.div
            key={crop.src}
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={crop.src}
              alt={crop.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 py-6 sm:px-10 sm:py-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
          Siti realizzati per i nostri clienti
        </p>
        {!reduceMotion && (
          <AnimatePresence mode="wait">
            <motion.p
              key={crop.projectName + index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="font-display text-sm font-semibold text-white sm:text-base"
            >
              {crop.projectName}
            </motion.p>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
