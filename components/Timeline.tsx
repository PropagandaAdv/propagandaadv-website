"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

export type TimelineStep = {
  n: string;
  period: string;
  title: string;
  body: string;
};

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reduceMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [reduceMotion, steps.length]);

  return (
    <div className="relative">
      <div
        className="absolute left-5 top-2 bottom-2 w-px bg-line sm:left-6"
        aria-hidden="true"
      />
      <ol className="flex flex-col gap-12 sm:gap-14">
        {steps.map((step, i) => {
          const isActive = reduceMotion || i === activeIndex;
          return (
            <li
              key={step.n}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="relative pl-16 sm:pl-20"
            >
              <span
                className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-colors duration-300 sm:h-12 sm:w-12 ${
                  isActive
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-paper text-ink/40"
                }`}
              >
                {step.n}
              </span>

              <Reveal y={16}>
                <span
                  className={`text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive ? "text-brand" : "text-ink/40"
                  }`}
                >
                  {step.period}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">{step.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
