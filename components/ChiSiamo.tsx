import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconCheck } from "@/components/icons";

const PILLARS = [
  {
    title: "Decisioni rapide, basate sui dati",
    body:
      "Il nostro approccio è pragmatico e data-driven: ogni azione ha un obiettivo chiaro, ogni investimento è tracciato, ogni risultato è misurabile.",
  },
  {
    title: "Esecuzione senza attriti",
    body:
      "Trasformiamo la strategia in azioni concrete, rapide e coordinate. Ogni attività viene pianificata, implementata e ottimizzata riducendo la distanza tra decisione ed esecuzione.",
  },
];

export function ChiSiamo() {
  return (
    <section id="chi-siamo" className="relative bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Chi siamo</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Il partner affidabile per la crescita della tua azienda.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Affianchiamo imprenditori e decision maker nella definizione degli obiettivi, nella scelta dei
                canali e nell&apos;esecuzione operativa, integrando strategia, sviluppo web, advertising, SEO e
                analisi dei dati in un unico processo coerente. Ogni progetto nasce dai numeri e viene
                ottimizzato costantemente sulla base delle performance reali.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={0.15 + i * 0.1}>
                  <div className="h-full rounded-2xl border border-line bg-card p-7">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
                      <IconCheck className="h-4 w-4" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px]">
              <Image
                src="/generated/chisiamo-abstract.jpg"
                alt="Composizione geometrica blu e nera che simboleggia chiarezza strategica e decisioni rapide"
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
