"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { IconArrowUpRight } from "@/components/icons";
import { PLACEHOLDER_IMAGE_WIDE, SERVICE_TYPES, type Project } from "@/lib/projects";

const SEEN_KEY = "progetti-intro-seen";

function IntroCurtain() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SEEN_KEY)) return;

    setVisible(true);
    sessionStorage.setItem(SEEN_KEY, "1");
    const timer = setTimeout(() => setVisible(false), 650);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          aria-hidden="true"
        >
          <span className="font-display text-lg font-semibold tracking-[0.2em] text-white/70">
            PROPAGANDA ADV
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FilterBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (value: string) => void;
}) {
  const options = ["Tutti", ...SERVICE_TYPES];

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filtra i progetti per tipo di servizio">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              isActive
                ? "border-brand bg-brand text-white"
                : "border-line text-ink/70 hover:border-ink/40 hover:text-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal y={28}>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block border-t border-line py-10 first:border-t-0 lg:py-14"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-ink/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink transition-colors group-hover:text-brand sm:text-3xl lg:text-4xl">
              {project.name}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-card px-3 py-1 text-xs font-semibold text-ink/70">
                {project.sector}
              </span>
              <span className="inline-flex rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink/70">
                {project.service}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition-colors group-hover:text-brand">
            Visita il sito
            <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="relative mt-8 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-ink sm:aspect-[2/1]">
          <Image
            src={PLACEHOLDER_IMAGE_WIDE[project.placeholder]}
            alt={`Immagine grafica astratta on-brand per il progetto ${project.name} (${project.sector}), in attesa dello screenshot reale`}
            fill
            sizes="(min-width: 1024px) 90vw, 100vw"
            priority={index === 0}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </a>
    </Reveal>
  );
}

export function ProjectsFullBleedList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("Tutti");
  const visible = active === "Tutti" ? projects : projects.filter((p) => p.service === active);

  return (
    <>
      <IntroCurtain />

      <div className="mt-10">
        <FilterBar active={active} onChange={setActive} />
      </div>

      <div className="mt-12">
        {visible.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="border-t border-line py-16 text-center text-muted">
          Nessun progetto per questo filtro al momento.
        </p>
      )}
    </>
  );
}
