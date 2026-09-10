import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const POSTS = [
  {
    tag: "SEO",
    date: "Set 2026",
    title: "SEO per PMI: le leve che contano davvero nel 2026",
    excerpt: "Perché il posizionamento organico resta l'investimento più duraturo per un'azienda italiana, e da dove iniziare senza disperdere budget.",
    image: "/generated/news-seo.jpg",
  },
  {
    tag: "Metodo",
    date: "Ago 2026",
    title: "Come portiamo un progetto dal kickoff al go-live in 30 giorni",
    excerpt: "Uno sguardo dentro il nostro metodo in quattro fasi: cosa succede davvero tra la prima consulenza e la pubblicazione del sito.",
    image: "/generated/news-lancio.jpg",
  },
  {
    tag: "Advertising",
    date: "Ago 2026",
    title: "Advertising data-driven: smettere di sparare nel mucchio",
    excerpt: "Come costruiamo campagne Google e Meta Ads partendo dagli obiettivi reali dell'azienda invece che da budget genericamente allocati.",
    image: "/generated/news-advertising.jpg",
  },
];

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
            <Reveal key={post.title} delay={0.1 + i * 0.08}>
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
                    {post.tag}
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
      </Container>
    </section>
  );
}
