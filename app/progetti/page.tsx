import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectsFullBleedList } from "@/components/ProjectsFullBleedList";
import { PROJECTS } from "@/lib/projects";
import { IconArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Progetti",
  description:
    "I siti che abbiamo realizzato per le PMI italiane che seguiamo: sanità, agricoltura, ristorazione, food & beverage, interior design, edilizia e B2B.",
};

export default function ProgettiPage() {
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
            piattaforma B2B strutturata. Ogni riga apre il sito live in una nuova scheda.
          </p>

          <ProjectsFullBleedList projects={PROJECTS} />
        </Container>

        <section className="relative mt-24 overflow-hidden bg-ink py-24 text-center text-white lg:mt-32 lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" aria-hidden="true" />
          <Container className="relative">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-balance">
                Il prossimo progetto della lista potrebbe essere il tuo.
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 flex justify-center">
              <a
                href="/#contatti"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Richiedi una consulenza
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
