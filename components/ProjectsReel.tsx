"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function ProjectsReel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <div ref={containerRef} className="relative aspect-[16/9] w-full overflow-hidden bg-ink sm:aspect-[21/9]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/generated/clients-reel-poster.jpg"
        alt="Anteprima dei siti realizzati per i nostri clienti"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {shouldLoad && !reduceMotion && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/generated/clients-reel.mp4"
          poster="/generated/clients-reel-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />
      <div className="absolute inset-x-0 bottom-0 px-6 py-6 sm:px-10 sm:py-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
          Siti realizzati per i nostri clienti
        </p>
      </div>
    </div>
  );
}
