import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";

const STATS = [
  { static: "Dal 2020", label: "aiutiamo le aziende a crescere" },
  { to: 450, prefix: "+", suffix: "", label: "progetti sviluppati e creati" },
  { to: 30, prefix: "", suffix: " gg", label: "dal kickoff al go-live" },
] as const;

const SETTORI = [
  "Sanità",
  "Agricoltura",
  "Ristorazione",
  "Food & Beverage",
  "Interior Design",
  "Edilizia",
];

export function Numeri() {
  return (
    <section id="numeri" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/generated/numeri-texture.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      </div>

      <Container className="relative">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-light">Numeri</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-balance">
            I risultati parlano più delle promesse.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={0.1 + i * 0.1}>
              <div className="border-t border-line-dark pt-6">
                {"static" in stat ? (
                  <span className="numeral font-display text-5xl font-bold text-white sm:text-6xl">
                    {stat.static}
                  </span>
                ) : (
                  <Counter
                    to={stat.to}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="numeral font-display text-5xl font-bold text-white sm:text-6xl"
                  />
                )}
                <p className="mt-3 text-base text-white/65">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-20">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
            Settori in cui abbiamo portato risultati misurabili
          </p>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
            <div className="flex w-max animate-marquee gap-12 py-2">
              {[...SETTORI, ...SETTORI, ...SETTORI].map((settore, i) => (
                <span
                  key={`${settore}-${i}`}
                  className="whitespace-nowrap font-display text-2xl font-semibold text-white/25"
                >
                  {settore}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
