export type Post = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
};

export const POSTS: Post[] = [
  {
    slug: "seo-per-pmi-2026",
    category: "SEO",
    date: "Set 2026",
    title: "SEO per PMI: le leve che contano davvero nel 2026",
    excerpt:
      "Perché il posizionamento organico resta l'investimento più duraturo per un'azienda italiana, e da dove iniziare senza disperdere budget.",
    image: "/generated/news-seo.jpg",
  },
  {
    slug: "dal-kickoff-al-go-live-in-30-giorni",
    category: "Metodo",
    date: "Ago 2026",
    title: "Come portiamo un progetto dal kickoff al go-live in 30 giorni",
    excerpt:
      "Uno sguardo dentro il nostro metodo in quattro fasi: cosa succede davvero tra la prima consulenza e la pubblicazione del sito.",
    image: "/generated/news-lancio.jpg",
  },
  {
    slug: "advertising-data-driven",
    category: "Advertising",
    date: "Ago 2026",
    title: "Advertising data-driven: smettere di sparare nel mucchio",
    excerpt:
      "Come costruiamo campagne Google e Meta Ads partendo dagli obiettivi reali dell'azienda invece che da budget genericamente allocati.",
    image: "/generated/news-advertising.jpg",
  },
];

export const POST_CATEGORIES: string[] = Array.from(new Set(POSTS.map((p) => p.category)));
