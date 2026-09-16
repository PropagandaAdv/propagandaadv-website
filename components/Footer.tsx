import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { IconMail, IconPhone, IconPin } from "@/components/icons";

const NAV_COLUMNS = [
  {
    title: "Agenzia",
    links: [
      { label: "Progetti", href: "/progetti" },
      { label: "Chi siamo", href: "/chi-siamo" },
      { label: "Come lavoriamo", href: "/metodo" },
      { label: "Servizi", href: "/#servizi" },
      { label: "Numeri", href: "/#numeri" },
    ],
  },
  {
    title: "Risorse",
    links: [
      { label: "Aggiornamenti", href: "/aggiornamenti" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contatti", href: "/#contatti" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/propagandaadv/" },
  { label: "Instagram", href: "https://www.instagram.com/propagandaadv____/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCgzXaxN4dsALRs9ukOAI2CQ" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo variant="white" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Marketing che porta clienti. Idee veloci, decisioni chiare, risultati misurabili — il partner
              digitale per la crescita delle PMI italiane.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                <a href="mailto:info@propagandaadv.com" className="hover:text-white">
                  info@propagandaadv.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                <a href="tel:+393513973029" className="hover:text-white">
                  +39 351 397 3029
                </a>
              </li>
              <li className="flex items-start gap-2">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-light" />
                <span>Via Giacomo Matteotti 102/e, 42046 Reggiolo (RE)</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-2">
            {NAV_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/40">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/40">Social</p>
            <ul className="mt-5 space-y-3">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/#contatti"
              className="mt-8 inline-flex items-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Richiedi una consulenza
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line-dark pt-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Propaganda Adv S.R.L. — P.IVA 02901570354 — REA RE-323285</p>
          <p>Reggiolo (RE), Italia</p>
        </div>
      </Container>
    </footer>
  );
}
