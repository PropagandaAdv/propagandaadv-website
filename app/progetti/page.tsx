import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS, chunkIntoRows } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Progetti",
  description:
    "I siti che abbiamo realizzato per le PMI italiane che seguiamo: sanità, agricoltura, ristorazione, food & beverage, interior design, edilizia e B2B.",
};

export default function ProgettiPage() {
  const rows = chunkIntoRows(PROJECTS);

  return (
    <>
      <Header />
      <main id="main" className="bg-paper-warm pb-24 pt-[132px] lg:pb-32 lg:pt-[168px]">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Progetti &amp; Clienti</span>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
            Tutti i progetti che abbiamo seguito.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {PROJECTS.length} siti realizzati per aziende reali, dal sito vetrina per una PMI locale alla
            piattaforma B2B strutturata. Ogni card apre il sito live in una nuova scheda.
          </p>

          <div className="mt-14 flex flex-col gap-5">
            {rows.map((row) => (
              <div
                key={row.map((p) => p.slug).join("-")}
                className={row.length === 1 ? "" : "grid grid-cols-1 gap-5 sm:grid-cols-2"}
              >
                {row.map((project) => (
                  <ProjectCard key={project.slug} project={project} size={row.length === 1 ? "full" : "half"} />
                ))}
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
