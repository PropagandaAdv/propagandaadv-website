export type PlaceholderVariant = "grid" | "arrow" | "shatter";

export type Project = {
  slug: string;
  name: string;
  url: string;
  sector: string;
  service: string;
  featured: boolean;
  placeholder: PlaceholderVariant;
};

const VARIANTS: PlaceholderVariant[] = ["grid", "arrow", "shatter"];

const RAW_PROJECTS: Omit<Project, "placeholder">[] = [
  {
    slug: "centro-medico-reggiolo",
    name: "Centro Medico Reggiolo",
    url: "https://centromedicoreggiolo.it/",
    sector: "Sanità",
    service: "Sito vetrina",
    featured: true,
  },
  {
    slug: "agripm",
    name: "AgriPM",
    url: "http://agripm.it/",
    sector: "Agricoltura",
    service: "E-commerce",
    featured: true,
  },
  {
    slug: "piccola-osteria-andes",
    name: "Piccola Osteria Andes",
    url: "http://www.piccolaosteriaandes.it/",
    sector: "Ristorazione",
    service: "Sito vetrina",
    featured: true,
  },
  {
    slug: "mantua-gin-experience",
    name: "Mantua Gin Experience",
    url: "https://mantuaginexperience.com/",
    sector: "Food & Beverage",
    service: "E-commerce",
    featured: true,
  },
  {
    slug: "studio-elle",
    name: "Studio Elle",
    url: "https://studioelle.design/",
    sector: "Interior Design",
    service: "Sito vetrina",
    featured: true,
  },
  {
    slug: "baschieri",
    name: "Baschieri",
    url: "https://baschieri.com/",
    sector: "Edilizia",
    service: "Sito vetrina",
    featured: true,
  },
  {
    slug: "magface",
    name: "MagFace",
    url: "https://magface.it/",
    sector: "Edilizia & Interior Tech",
    service: "Sito vetrina B2B",
    featured: false,
  },
  {
    slug: "biochem-solution",
    name: "Biochem Solution",
    url: "http://www.biochemsolution.it/",
    sector: "Scientifico / Laboratori",
    service: "Sito vetrina B2B",
    featured: false,
  },
  {
    slug: "implementa-group",
    name: "Implementa Group",
    url: "https://www.implementagroup.com/",
    sector: "Cybersecurity",
    service: "Sito vetrina B2B",
    featured: false,
  },
  {
    slug: "reggiolo-factory",
    name: "Reggiolo Factory",
    url: "https://www.reggiolofactory.it/",
    sector: "Eventi & Spazi",
    service: "Sito vetrina",
    featured: false,
  },
  {
    slug: "come-una-volta",
    name: "Come Una Volta",
    url: "https://comeunavolta.shop/",
    sector: "Food & Beverage",
    service: "E-commerce",
    featured: false,
  },
];

// Assigning placeholder variants by index keeps the rotation deterministic
// and guarantees no two adjacent cards (in either the 6-featured or the
// full 11-project order) share the same variant.
export const PROJECTS: Project[] = RAW_PROJECTS.map((p, i) => ({
  ...p,
  placeholder: VARIANTS[i % VARIANTS.length],
}));

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

/**
 * Splits a project list into rows following a repeating 1-2-2 rhythm
 * (one full-width card, then two half-width cards, then two more) —
 * the same alternating logic used by kina.it's project grid.
 */
export function chunkIntoRows(projects: Project[]): Project[][] {
  const pattern = [1, 2, 2];
  const rows: Project[][] = [];
  let i = 0;
  let p = 0;
  while (i < projects.length) {
    const size = pattern[p % pattern.length];
    rows.push(projects.slice(i, i + size));
    i += size;
    p += 1;
  }
  return rows;
}

export type ShowreelCrop = {
  src: string;
  alt: string;
  projectName: string;
};

// Curated crops for the "Progetti & Clienti" showreel — 1-2 hand-picked
// sections per client site (not full-page scroll captures). Order is
// deliberately interleaved so the two projects with two crops each don't
// play back-to-back.
export const SHOWREEL_CROPS: ShowreelCrop[] = [
  {
    src: "/projects/centro-medico-reggiolo.jpg",
    alt: "Sezione hero del sito di Centro Medico Reggiolo",
    projectName: "Centro Medico Reggiolo",
  },
  {
    src: "/projects/agripm.jpg",
    alt: "Sezione hero del sito di AgriPM",
    projectName: "AgriPM",
  },
  {
    src: "/projects/piccola-osteria-andes.jpg",
    alt: "Sezione hero del sito di Piccola Osteria Andes",
    projectName: "Piccola Osteria Andes",
  },
  {
    src: "/projects/mantua-gin-experience.jpg",
    alt: "Sezione hero del sito di Mantua Gin Experience",
    projectName: "Mantua Gin Experience",
  },
  {
    src: "/projects/studio-elle.jpg",
    alt: "Sezione hero del sito di Studio Elle",
    projectName: "Studio Elle",
  },
  {
    src: "/projects/baschieri.jpg",
    alt: "Sezione hero del sito di Baschieri",
    projectName: "Baschieri",
  },
  {
    src: "/projects/magface.jpg",
    alt: "Sezione hero del sito di MagFace",
    projectName: "MagFace",
  },
  {
    src: "/projects/crops/agripm-2.jpg",
    alt: "Dettaglio prodotto dal sito di AgriPM",
    projectName: "AgriPM",
  },
  {
    src: "/projects/biochem-solution.jpg",
    alt: "Sezione hero del sito di Biochem Solution",
    projectName: "Biochem Solution",
  },
  {
    src: "/projects/implementa-group.jpg",
    alt: "Sezione hero del sito di Implementa Group",
    projectName: "Implementa Group",
  },
  {
    src: "/projects/crops/mantua-gin-experience-2.jpg",
    alt: "Dettaglio prodotto dal sito di Mantua Gin Experience",
    projectName: "Mantua Gin Experience",
  },
  {
    src: "/projects/reggiolo-factory.jpg",
    alt: "Sezione hero del sito di Reggiolo Factory",
    projectName: "Reggiolo Factory",
  },
  {
    src: "/projects/come-una-volta.jpg",
    alt: "Sezione hero del sito di Come Una Volta",
    projectName: "Come Una Volta",
  },
];

export const PLACEHOLDER_IMAGE: Record<PlaceholderVariant, string> = {
  grid: "/generated/placeholder-grid.jpg",
  arrow: "/generated/placeholder-arrow.jpg",
  shatter: "/generated/placeholder-shatter.jpg",
};
