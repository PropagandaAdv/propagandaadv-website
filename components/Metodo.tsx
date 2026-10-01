import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientParticles } from "@/components/ui/AmbientParticles";
import { IconArrowUpRight } from "@/components/icons";

const PHASES = [
  {
    n: "01",
    title: "Prima consulenza",
    body: "Analizziamo il tuo settore, i tuoi concorrenti e individuiamo le opportunità di crescita, per comprendere al meglio le tue esigenze e valutare la fattibilità del progetto.",
  },
  {
    n: "02",
    title: "Inizio lavori",
    body: "Raccogliamo tutte le informazioni necessarie per avviare il progetto in modo efficiente: dati, informazioni essenziali, obiettivi e KPI misurabili.",
  },
  {
    n: "03",
    title: "Design e interfaccia",
    body: "Creiamo un'anteprima grafica del progetto, dedicandoci allo studio dell'esperienza e dell'interfaccia utente fin dalla progettazione.",
  },
  {
    n: "04",
    title: "Sviluppo e pubblicazione",
    body: "Trasformiamo il progetto in realtà e lo pubblichiamo sul web, garantendo prestazioni, sicurezza e scalabilità.",
  },
];

export function Metodo() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" aria-hidden="true" />
      <AmbientParticles />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">Come lavoriamo</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-balance">
                Un metodo testato, modulare e orientato ai risultati.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                Un percorso trasparente e ben definito: tempistiche chiare, coordinamento efficiente e un
                go-live senza intoppi.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 hidden lg:block">
              <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[24px]">
                <Image
                  src="/generated/metodo-abstract.jpg"
                  alt="Composizione a gradini blu e nera che rappresenta il metodo in quattro fasi di Propaganda Adv"
                  fill
                  sizes="380px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {PHASES.map((phase, i) => (
                <Reveal key={phase.n} delay={0.1 + i * 0.08}>
                  <div className="h-full rounded-2xl border border-line-dark bg-white/[0.04] p-7 transition-colors hover:bg-white/[0.07]">
                    <span className="font-display text-2xl font-bold text-brand-light text-glow">{phase.n}</span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{phase.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{phase.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.2} className="mt-16 flex justify-center">
          <a
            href="/metodo"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white"
          >
            Scopri il metodo completo
            <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
