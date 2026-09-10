import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectsReel } from "@/components/ProjectsReel";
import { FEATURED_PROJECTS, chunkIntoRows } from "@/lib/projects";
import { IconArrowUpRight } from "@/components/icons";

export function Progetti() {
  const rows = chunkIntoRows(FEATURED_PROJECTS);

  return (
    <section id="progetti" className="bg-paper-warm pb-24 pt-0 lg:pb-32">
      <ProjectsReel />

      <Container className="pt-16 lg:pt-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Progetti &amp; Clienti
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Aziende reali, risultati misurabili.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Da PMI locali a realtà B2B strutturate: ogni progetto nasce da un obiettivo di business, non da un
              brief grafico.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-5">
          {rows.map((row, i) => (
            <div
              key={row.map((p) => p.slug).join("-")}
              className={row.length === 1 ? "" : "grid grid-cols-1 gap-5 sm:grid-cols-2"}
            >
              {row.map((project) => (
                <Reveal key={project.slug} delay={0.05 * i}>
                  <ProjectCard project={project} size={row.length === 1 ? "full" : "half"} />
                </Reveal>
              ))}
            </div>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <a
            href="/progetti"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink"
          >
            Tutti i progetti
            <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
