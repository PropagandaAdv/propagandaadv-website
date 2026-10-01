"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The site's one signature motif: a thin light-beam line that draws itself
 * in on scroll, echoing the light beams in the Hero video. Used as a
 * section-transition accent between homepage sections instead of a plain
 * border, so the "diffusione" beat of the Hero keeps recurring down the page.
 */
export function SignatureBeam({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none relative h-px w-full overflow-visible ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="absolute left-0 top-1/2 h-10 w-full -translate-y-1/2"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#233DFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#5568FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#233DFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,24 C 240,6 480,34 720,18 C 900,6 1040,26 1200,14"
          fill="none"
          stroke="url(#beam-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={reduceMotion ? undefined : { pathLength: 0, opacity: 0 }}
          whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
