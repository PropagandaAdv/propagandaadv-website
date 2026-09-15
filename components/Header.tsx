"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { IconMenu, IconClose } from "@/components/icons";

const NAV_ITEMS = [
  { href: "/progetti", label: "Progetti" },
  { href: "/chi-siamo", label: "Chi siamo" },
  { href: "/metodo", label: "Metodo" },
  { href: "/#servizi", label: "Servizi" },
  { href: "/#numeri", label: "Numeri" },
  { href: "/#aggiornamenti", label: "Aggiornamenti" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/90 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[72px] items-center justify-between">
          <a href="/" aria-label="Propaganda Adv — Home" className="relative z-10">
            <Logo variant="blue" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.95rem] font-medium text-ink/80 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href="/#contatti"
              className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand"
            >
              Richiedi una consulenza
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-paper border-b border-line lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-card"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/#contatti"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
              >
                Richiedi una consulenza
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
