import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconWeb, IconAds, IconSeo, IconMailMarketing, IconData } from "@/components/icons";

const SERVICES = [
  {
    icon: IconWeb,
    title: "Sviluppo siti web",
    body: "Siti vetrina e piattaforme 100% personalizzate su WordPress, con design UX/UI responsive orientato ai dati e integrazioni avanzate con CRM, ERP e piattaforme di advertising.",
  },
  {
    icon: IconAds,
    title: "Advertising",
    body: "Campagne a performance su Google Ads e Meta Ads, costruite sugli obiettivi definiti in fase di consulenza e ottimizzate costantemente sui dati reali.",
  },
  {
    icon: IconSeo,
    title: "SEO",
    body: "Posizionamento organico su architettura, contenuti e aspetti tecnici del sito, monitorato con strumenti come Semrush per una crescita duratura nel tempo.",
  },
  {
    icon: IconMailMarketing,
    title: "Email marketing",
    body: "Automazioni collegate al sito per nutrire i contatti generati e trasformarli in clienti, dalla prima interazione fino alla fidelizzazione.",
  },
  {
    icon: IconData,
    title: "Analisi dei dati",
    body: "Monitoriamo KPI e comportamento utenti con Google Analytics e Clarity: ogni scelta successiva nasce dai numeri, non dalle opinioni.",
  },
];

export function Servizi() {
  return (
    <section id="servizi" className="relative bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Servizi</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
              Un processo integrato, non una lista di servizi scollegati.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Sviluppo web, advertising, SEO, email marketing e analisi dei dati lavorano insieme dentro lo
              stesso processo: ogni disciplina alimenta le altre con gli stessi dati e gli stessi obiettivi.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={0.08 + i * 0.06} className={i === 3 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-paper p-8 transition-all hover:border-brand/30 hover:shadow-[0_20px_50px_-25px_rgba(35,61,255,0.35)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.body}</p>
                <span className="mt-6 block text-xs font-semibold text-ink/30">
                  {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
