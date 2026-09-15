import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline, type TimelineStep } from "@/components/Timeline";
import { MethodPhaseSection, type MethodPhase } from "@/components/MethodPhaseSection";
import { IconArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Metodo",
  description:
    "Il nostro metodo in 4 fasi e il percorso di 30 giorni dal kickoff al go-live: come lavoriamo con ogni cliente di Propaganda Adv.",
};

const PHASES: MethodPhase[] = [
  {
    n: "01",
    title: "Prima consulenza",
    body: "Analizziamo il tuo settore, i tuoi concorrenti ed individuiamo le opportunità di crescita. Il nostro obiettivo principale è comprendere al meglio le tue esigenze e valutare la fattibilità dei progetti proposti.",
    extra: "È il momento in cui ascoltiamo più che proporre: capire il tuo settore prima di disegnare una soluzione è ciò che ci permette, nelle fasi successive, di lavorare su obiettivi reali invece che su ipotesi.",
    image: "/generated/metodo-fase-01.jpg",
    alt: "Composizione astratta blu e nera con un fascio di luce che simboleggia l'analisi strategica",
  },
  {
    n: "02",
    title: "Inizio lavori",
    body: "Raccogliamo tutte le informazioni necessarie per avviare il progetto in modo efficiente e senza intoppi: raccolta dati, informazioni essenziali, definizione degli obiettivi e delle KPI del progetto.",
    extra: "Ogni obiettivo che fissiamo qui diventa il metro con cui misureremo il progetto anche dopo il lancio: è la base dell'approccio data-driven che guida tutto il nostro lavoro.",
    image: "/generated/metodo-fase-02.jpg",
    alt: "Composizione astratta blu e nera con linee a griglia che simboleggiano la raccolta dati",
  },
  {
    n: "03",
    title: "Design e interfaccia",
    body: "Creiamo un'anteprima grafica del progetto, dedicandoci allo studio dell'esperienza e dell'interfaccia utente fin dalla progettazione.",
    extra: "Il design nasce già pensato per convertire, non solo per piacere: gerarchia visiva, percorsi di lettura e call to action vengono definiti prima ancora di scrivere la prima riga di codice.",
    image: "/generated/metodo-fase-03.jpg",
    alt: "Composizione astratta blu e nera con pannelli traslucidi che simboleggiano la progettazione UX/UI",
  },
  {
    n: "04",
    title: "Sviluppo e pubblicazione",
    body: "Trasformiamo il progetto in realtà e lo pubblichiamo sul web, garantendo prestazioni, sicurezza e scalabilità.",
    extra: "Il sito va online solo dopo essere stato testato nel dettaglio: da qui in poi il lavoro continua con il monitoraggio dei risultati, perché ogni progetto va ottimizzato costantemente sulla base delle performance reali.",
    image: "/generated/metodo-fase-04.jpg",
    alt: "Composizione astratta blu e nera con forme in movimento che simboleggiano lo sviluppo e il lancio",
  },
];

const PATH_STEPS: TimelineStep[] = [
  {
    n: "00",
    period: "Giorno 0",
    title: "Kickoff meeting",
    body: "Definiamo obiettivi, canali di comunicazione e modalità di lavoro condivise.",
  },
  {
    n: "01",
    period: "Giorni 1–10",
    title: "Analisi e strategia",
    body: "Analisi di mercato, studio dei comportamenti utente e costruzione di una strategia digitale solida e misurabile.",
  },
  {
    n: "02",
    period: "Giorni 11–25",
    title: "Design e sviluppo",
    body: "Il team UX/UI lavora su prototipi e interfacce, mentre lo sviluppo si occupa della messa in opera tecnica e delle integrazioni.",
  },
  {
    n: "03",
    period: "Giorni 26–30",
    title: "Test, go-live, formazione",
    body: "Testiamo ogni funzionalità nel dettaglio, pubblichiamo il progetto e formiamo il cliente alla gestione autonoma.",
  },
  {
    n: "04",
    period: "Post-lancio",
    title: "Ottimizzazione & supporto",
    body: "Monitoriamo i KPI, correggiamo le criticità e implementiamo miglioramenti continui per stabilità e prestazioni.",
  },
];

export default function MetodoPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="relative bg-paper-warm lg:h-[130vh]">
          <div className="relative flex h-[100svh] items-center pt-[88px] lg:sticky lg:top-0">
            <Container>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Metodo</span>
              <h1 className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-ink text-balance">
                Un metodo testato, modulare e orientato ai risultati.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Un percorso trasparente e ben definito: tempistiche chiare, coordinamento efficiente e un go-live
                senza intoppi. Scorri per vedere come lavoriamo, fase per fase.
              </p>
            </Container>
          </div>
        </section>

        {PHASES.map((phase) => (
          <MethodPhaseSection key={phase.n} phase={phase} />
        ))}

        <section className="bg-paper-warm py-20 lg:py-28">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  Percorso progettuale
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-ink text-balance">
                  30 giorni al go-live.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Una percorso trasparente e ben definito è essenziale per garantire tempistiche chiare,
                  coordinamento efficiente e un go-live senza intoppi.
                </p>
              </Reveal>
            </div>

            <div className="mt-16">
              <Timeline steps={PATH_STEPS} />
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-ink py-24 text-center text-white lg:py-32">
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
