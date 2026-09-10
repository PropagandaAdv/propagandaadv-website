"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconChevronDown } from "@/components/icons";

const FAQS = [
  {
    q: "Quanto tempo serve per lanciare un nuovo sito web?",
    a: "Il nostro percorso standard porta al go-live in 30 giorni: kickoff il giorno 0, analisi e strategia nei primi 10 giorni, design e sviluppo tra il giorno 11 e il 25, poi test, pubblicazione e formazione entro il giorno 30. Progetti più complessi vengono pianificati insieme in fase di prima consulenza.",
  },
  {
    q: "Quanto costa lavorare con Propaganda Adv?",
    a: "Ogni progetto ha un ambito diverso, quindi non usiamo listini standard. Dopo la prima consulenza gratuita, in cui analizziamo settore, concorrenti e obiettivi, ricevi un preventivo dettagliato basato su ciò che serve davvero al tuo business — senza costi nascosti.",
  },
  {
    q: "Come funziona il processo, dal primo contatto al lancio?",
    a: "Quattro fasi: prima consulenza per capire fattibilità e obiettivi, inizio lavori per raccogliere dati e definire le KPI, design e interfaccia per validare l'esperienza utente prima di scrivere codice, infine sviluppo e pubblicazione con test su prestazioni, sicurezza e scalabilità.",
  },
  {
    q: "Cosa succede dopo il lancio del sito?",
    a: "Il lavoro non finisce al go-live. Monitoriamo costantemente i KPI, correggiamo eventuali criticità e implementiamo ottimizzazioni continue su performance, SEO e conversioni, così il progetto migliora nel tempo invece di restare fermo.",
  },
  {
    q: "Lavorate anche con aziende che non hanno mai fatto marketing digitale?",
    a: "Sì, è il nostro pubblico principale: PMI italiane che vogliono strutturare per la prima volta (o rimettere in ordine) la propria presenza online. Ti guidiamo passo passo, dalla definizione degli obiettivi fino alla scelta dei canali più adatti al tuo settore.",
  },
  {
    q: "Su quali piattaforme sviluppate i siti web?",
    a: "Sviluppiamo principalmente su WordPress, sia siti vetrina che progetti 100% personalizzati, con integrazioni avanzate verso CRM, ERP e piattaforme di advertising. In base alle esigenze del progetto valutiamo insieme anche soluzioni su misura.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">FAQ</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Le domande che ci fanno più spesso le PMI.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-muted">
                Non hai trovato risposta a una domanda? Scrivici, ti rispondiamo entro un giorno lavorativo.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-line border-y border-line">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-lg font-semibold text-ink">{faq.q}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink"
                      >
                        <IconChevronDown className="h-4 w-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-6 max-w-xl text-base leading-relaxed text-muted">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
