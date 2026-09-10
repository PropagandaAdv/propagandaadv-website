"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { IconMail, IconArrowUpRight } from "@/components/icons";

const CONTACT_EMAIL = "commerciale@propagandaadv.com";

export function Contatti() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Richiesta consulenza — ${company || name}`;
    const body = [
      `Nome: ${name}`,
      `Email: ${email}`,
      company ? `Azienda: ${company}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contatti" className="relative overflow-hidden bg-brand py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-white/10" aria-hidden="true" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Contatti</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-balance">
                Parliamo della crescita della tua azienda.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
                Raccontaci il tuo settore e i tuoi obiettivi: la prima consulenza è gratuita e senza impegno.
                Ti rispondiamo entro un giorno lavorativo.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-8 inline-flex items-center gap-2 border-b border-white/40 pb-1 text-lg font-semibold transition-colors hover:border-white"
              >
                <IconMail className="h-5 w-5" />
                {CONTACT_EMAIL}
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="rounded-[28px] bg-white p-8 text-ink sm:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="text-sm font-medium text-ink-soft">
                    Nome e cognome
                  </label>
                  <input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="Mario Rossi"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="text-sm font-medium text-ink-soft">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="mario@azienda.it"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="company" className="text-sm font-medium text-ink-soft">
                    Azienda
                  </label>
                  <input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="Nome dell'azienda"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-ink-soft">
                    Raccontaci il tuo obiettivo
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full resize-none rounded-xl border border-line bg-paper-warm px-4 py-3 text-base outline-none transition-colors focus:border-brand"
                    placeholder="Vorremmo aumentare i contatti qualificati dal nostro sito..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-brand sm:w-auto"
              >
                Invia richiesta
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Invio tramite il tuo client email predefinito, verso {CONTACT_EMAIL}.
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
