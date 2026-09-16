import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS } from "@/lib/posts";
import { IconArrowUpRight } from "@/components/icons";

export function Aggiornamenti() {
  return (
    <section id="aggiornamenti" className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Aggiornamenti</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-tight text-ink text-balance">
                Cosa stiamo facendo in agenzia.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Note, metodo e osservazioni dal lavoro quotidiano con le PMI che seguiamo.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POSTS.map((post, i) => (
            <Reveal key={post.slug} delay={0.1 + i * 0.08}>
              <article className="group h-full overflow-hidden rounded-2xl border border-line bg-paper transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.2)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-xs font-semibold text-ink">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">{post.date}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <a
            href="/aggiornamenti"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink"
          >
            Vedi tutti gli aggiornamenti
            <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
