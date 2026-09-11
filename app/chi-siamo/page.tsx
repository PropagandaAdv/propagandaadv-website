import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { Timeline, type TimelineStep } from "@/components/Timeline";
import { IconArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Chi Siamo",
  description:
    "La storia di Propaganda Adv: dal primo e-commerce del fondatore Giovanni Bertoni alla nascita dell'agenzia, fino a oggi.",
};

const TIMELINE_STEPS: TimelineStep[] = [
  {
    n: "01",
    period: "Estate 2018",
    title: "Le prime basi",
    body: "Finita la sessione d'esami con largo anticipo, Giovanni inizia a formarsi sul funzionamento delle inserzioni pubblicitarie su Meta e su Google.",
  },
  {
    n: "02",
    period: "2018",
    title: "Il primo caso studio",
    body: "Apre un e-commerce che si rivela un vero successo: diventa il primo caso studio che porta in giro per promuoversi, e gli fa capire cosa vuole fare nella vita.",
  },
  {
    n: "03",
    period: "2018 – 2019",
    title: "La svolta",
    body: "L'attività di marketing costruita attorno all'e-commerce lo conquista. Decide di trasformare la passione in professione e inizia a proporsi alle aziende.",
  },
  {
    n: "04",
    period: "Fine 2019",
    title: "L'incontro con i soci",
    body: "Giovanni entra in contatto con quelli che diventeranno gli altri 3 soci di Propaganda Adv, titolari di una software house dal 2014. Nasce subito una collaborazione.",
  },
  {
    n: "05",
    period: "2020, durante la pandemia",
    title: "La collaborazione decolla",
    body: "La domanda di servizi di marketing e comunicazione cresce, e la collaborazione tra i quattro ha una forte impennata.",
  },
  {
    n: "06",
    period: "Dopo la prima ondata Covid",
    title: "Nasce Propaganda Adv",
    body: "I quattro si mettono a tavolino e decidono di dare un nome e un cognome alla collaborazione, fondando Propaganda Adv: una realtà verticale sul settore.",
  },
  {
    n: "07",
    period: "Oggi",
    title: "Continuiamo a crescere",
    body: "Propaganda Adv lavora esclusivamente nel marketing e nella comunicazione, verticalizzandosi sempre di più con l'obiettivo di aumentare il parco clienti di chi ci interpella, attraverso strategie pubblicitarie personalizzate.",
  },
];

export default function ChiSiamoPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-paper-warm pb-20 pt-[132px] lg:pb-24 lg:pt-[168px]">
          <Container>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Chi Siamo</span>
            <h1 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
              La storia dietro Propaganda Adv.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Da un e-commerce nato per curiosità a un'agenzia verticale su marketing e comunicazione: ecco come
              siamo arrivati fin qui.
            </p>
          </Container>
        </section>

        <section className="bg-paper py-20 lg:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <Reveal>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                    Il nostro fondatore
                  </span>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-ink text-balance">
                    Chi è il nostro fondatore
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
                    <p>
                      Dietro Propaganda Adv c&apos;è una storia semplice: quella del nostro fondatore, Giovanni
                      Bertoni, che ha deciso di trasformare la sua passione per il marketing e la comunicazione in
                      un lavoro.
                    </p>
                    <p>
                      Tutto è iniziato nell&apos;estate del 2018. Finita la sessione d&apos;esami con largo
                      anticipo, Giovanni ha iniziato a formarsi sul funzionamento delle inserzioni pubblicitarie su
                      Meta e Google. Sempre più incuriosito, ha deciso di buttarsi e aprire un e-commerce — che si
                      è rivelato un successo vero e proprio. È diventato il suo primo caso studio, quello che ha
                      portato in giro per promuoversi, e soprattutto gli ha fatto capire cosa voleva fare nella
                      vita: marketing e comunicazione per le aziende.
                    </p>
                    <p>
                      L&apos;attività di marketing costruita attorno a quell&apos;e-commerce lo aveva
                      letteralmente rapito. Così ha preso una decisione: perché non provare a farne un lavoro? Da
                      quel momento ha iniziato a proporsi alle aziende, per replicare quanto fatto con il suo
                      progetto. E la cosa ha preso piede.
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.15} className="lg:col-span-4">
                <div className="rounded-2xl border border-line bg-card p-8 text-center lg:sticky lg:top-32">
                  <Counter
                    to={5}
                    suffix="+"
                    className="numeral font-display text-6xl font-bold text-ink"
                  />
                  <p className="mt-3 text-base font-medium text-muted">Anni di esperienza</p>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        <section className="bg-paper-warm py-20 lg:py-28">
          <Container>
            <div className="max-w-2xl">
              <Reveal>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                  La nostra storia
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-ink text-balance">
                  Come nasce Propaganda Adv.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 text-lg leading-relaxed text-muted">
                  Il sogno che ci muove è lo stesso sogno che muove il nostro fondatore: fare in modo che tutte le
                  collaborazioni con Propaganda Adv portino a scambi di valore, senza dimenticarsi dei rapporti
                  umani.
                </p>
              </Reveal>
            </div>

            <div className="mt-16">
              <Timeline steps={TIMELINE_STEPS} />
            </div>
          </Container>
        </section>

        <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
          <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" aria-hidden="true" />
          <Container className="relative text-center">
            <Reveal>
              <p className="mx-auto max-w-3xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-balance">
                Il sogno che ci muove è fare in modo che ogni collaborazione porti a uno scambio di valore, senza
                dimenticarsi dei rapporti umani.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contatti"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Richiedi una consulenza
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <a
                href="https://usercontent.one/wp/www.propagandaadv.com/wp-content/uploads/2025/11/Copia-di-Company-Profile-Presentazione-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
              >
                Scarica la Company Profile (PDF)
              </a>
              <a
                href="https://usercontent.one/wp/www.propagandaadv.com/wp-content/uploads/2025/11/Portfolio-Propaganda-Adv-1.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white"
              >
                Scarica il Portfolio (PDF)
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
