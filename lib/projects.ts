export type Project = {
  slug: string;
  name: string;
  url: string;
  sector: string;
  service: string;
  featured: boolean;
};

export const PROJECTS: Project[] = [
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
