import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

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

const TIMELINE = [
  { range: "Giorno 0", title: "Kickoff meeting", body: "Definiamo obiettivi, canali di comunicazione e modalità di lavoro condivise." },
  { range: "Giorni 1–10", title: "Analisi e strategia", body: "Analisi di mercato, studio dei comportamenti utente e costruzione di una strategia digitale solida e misurabile." },
  { range: "Giorni 11–25", title: "Design e sviluppo", body: "Il team UX/UI lavora su prototipi e interfacce, mentre lo sviluppo si occupa della messa in opera tecnica e delle integrazioni." },
  { range: "Giorni 26–30", title: "Test, go-live, formazione", body: "Testiamo ogni funzionalità nel dettaglio, pubblichiamo il progetto e formiamo il cliente alla gestione autonoma." },
  { range: "Post-lancio", title: "Ottimizzazione & supporto", body: "Monitoriamo i KPI, correggiamo le criticità e implementiamo miglioramenti continui per stabilità e prestazioni." },
];

export function Metodo() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" aria-hidden="true" />
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
                    <span className="font-display text-2xl font-bold text-brand-light">{phase.n}</span>
                    <h3 className="mt-4 font-display text-lg font-semibold">{phase.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{phase.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.2} className="mt-20">
          <div className="hairline mb-10 h-px w-full opacity-20" />
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">
            Percorso progettuale — 30 giorni al go-live
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {TIMELINE.map((step) => (
              <div key={step.range} className="border-t border-line-dark pt-5">
                <p className="text-sm font-semibold text-brand-light">{step.range}</p>
                <h4 className="mt-2 font-display text-base font-semibold">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
