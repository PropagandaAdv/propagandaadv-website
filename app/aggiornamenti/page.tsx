import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AggiornamentiList } from "@/components/AggiornamentiList";
import { POSTS } from "@/lib/posts";
import { IconArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Aggiornamenti",
  description:
    "Note, metodo e osservazioni dal lavoro quotidiano di Propaganda Adv con le PMI che segue: SEO, metodo e advertising.",
};

export default function AggiornamentiPage() {
  return (
    <>
      <Header />
      <main id="main" className="bg-paper-warm pb-24 pt-[132px] lg:pb-32 lg:pt-[168px]">
        <Container>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Aggiornamenti</span>
          <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
            Cosa stiamo facendo in agenzia.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Note, metodo e osservazioni dal lavoro quotidiano con le PMI che seguiamo.
          </p>

          <AggiornamentiList posts={POSTS} />
        </Container>

        <section className="relative mt-24 overflow-hidden bg-ink py-24 text-center text-white lg:mt-32 lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" aria-hidden="true" />
          <Container className="relative">
            <Reveal>
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-balance">
                Idee veloci. Decisioni chiare. Risultati misurabili.
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
