"use client";

import { useEffect, useRef } from "react";

type Scene = {
  id: "s1" | "s2" | "s3";
  kicker: string;
  title: string;
  sub: string;
  reveal?: string;
  label: string;
};

const SCENES: Scene[] = [
  {
    id: "s1",
    kicker: "01 · L'innesco",
    title: "In questo preciso istante, un tuo potenziale cliente è seduto davanti a uno schermo.",
    sub: "Ha un problema da risolvere, e sta cercando l'azienda giusta a cui affidarsi.",
    reveal: "La vera domanda è: riuscirà a trovare te, o andrà dai tuoi concorrenti?",
    label: "Scrivania con laptop in luce calda",
  },
  {
    id: "s2",
    kicker: "02 · L'infrastruttura",
    title: "Dimentica i semplici “siti web”.",
    sub: "Quello che realizzo è la filiale più strategica della tua azienda. Costruisco la tua vetrina su strada, aperta 24 ore su 24, 7 giorni su 7.",
    reveal: "Mentre tu riposi, le luci del tuo business rimangono accese. Ad accogliere, informare e vendere.",
    label: "Capannone industriale illuminato di notte",
  },
  {
    id: "s3",
    kicker: "03 · La conquista",
    title: "Non si tratta di avere una bella grafica online.",
    sub: "Si tratta di presidiare il tuo mercato. Faccio in modo che chi cerca il tuo lavoro su Google trovi una porta spalancata, non un cartello Chiuso.",
    label: "Veduta aerea della città al tramonto",
  },
];

const clamp = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
const ramp = (x: number, a: number, b: number) => 1 - Math.pow(1 - clamp((x - a) / (b - a)), 3);

function put(el: HTMLElement | null, o: number, y: number) {
  if (!el) return;
  el.style.opacity = o.toFixed(3);
  el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const sceneEls = Array.from(hero.querySelectorAll<HTMLElement>("[data-scene]"));
    const parts = sceneEls.map((el) => ({
      el,
      bg: el.querySelector<HTMLElement>(".hs-bg"),
      heads: Array.from(el.querySelectorAll<HTMLElement>('[data-a="head"]')),
      sub: el.querySelector<HTMLElement>('[data-a="sub"]'),
      rev: el.querySelector<HTMLElement>('[data-a="rev"]'),
      cta: el.querySelector<HTMLElement>('[data-a="cta"]'),
    }));

    let ticking = false;
    let last = -1;

    const render = () => {
      ticking = false;
      const range = hero.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const rect = hero.getBoundingClientRect();
      const p = clamp(-rect.top / range) * 3; // 0..3, una unita' per scena
      if (Math.abs(p - last) < 0.0005) return;
      last = p;

      const cur = Math.min(2, Math.floor(p));
      dotsRef.current?.querySelectorAll("b").forEach((d, i) => d.classList.toggle("on", i === cur));
      if (hintRef.current) hintRef.current.style.opacity = String(0.7 * (1 - ramp(p, 0, 0.12)));

      parts.forEach((S, i) => {
        const s = p - i;
        const first = i === 0;
        const final = i === parts.length - 1;
        const vis = (first ? 1 : ramp(s, -0.14, 0.12)) * (final ? 1 : 1 - ramp(s, 0.88, 1.12));
        const l = clamp(s);

        if (S.bg) {
          S.bg.style.opacity = vis.toFixed(3);
          S.bg.style.transform = `translate3d(0,${((0.5 - l) * 60).toFixed(1)}px,0) scale(${(1.02 + l * 0.1).toFixed(4)})`;
        }
        S.el.style.zIndex = String(Math.round(vis * 10) + i);
        S.el.classList.toggle("is-active", vis > 0.5);

        const inH = first ? 1 : ramp(s, 0.02, 0.2);
        const out = final ? 0 : ramp(s, 0.9, 1);
        const rev = S.rev ? ramp(s, 0.5, 0.64) : 0;
        const dim = 1 - 0.55 * rev;
        const base = vis > 0.01 ? inH * (1 - out) : 0;

        S.heads.forEach((h) => put(h, base * dim, (1 - inH) * 44 - out * 36));
        const inS = first ? 1 : ramp(s, 0.08, 0.26);
        put(S.sub, (vis > 0.01 ? inS : 0) * (1 - out) * dim, (1 - inS) * 44 - out * 36);
        if (S.rev) put(S.rev, rev * (1 - out), (1 - rev) * 44 - out * 36);
        if (S.cta) {
          const c = ramp(s, 0.4, 0.58);
          put(S.cta, c, (1 - c) * 44);
        }
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(render);
    };

    const clear = () => {
      parts.forEach((S) => {
        [S.bg, S.sub, S.rev, S.cta, ...S.heads].forEach((el) => {
          if (el) {
            el.style.opacity = "";
            el.style.transform = "";
          }
        });
        S.el.style.zIndex = "";
        S.el.classList.remove("is-active");
      });
      if (hintRef.current) hintRef.current.style.opacity = "";
    };

    const setup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (mq.matches) {
        last = -1;
        render();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
      } else {
        clear();
      }
    };

    mq.addEventListener("change", setup);
    setup();
    return () => {
      mq.removeEventListener("change", setup);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="hs" aria-label="Introduzione">
      <div className="hs-stage">
        {SCENES.map((s, i) => {
          const H = i === 0 ? "h1" : "h2";
          return (
            <div key={s.id} data-scene className={`hs-scene hs-${s.id}`}>
              <div className="hs-bg" role="img" aria-label={s.label} />
              <div className="hs-copy">
                <p className="hs-kicker" data-a="head">{s.kicker}</p>
                <H className="hs-h" data-a="head">{s.title}</H>
                <p className="hs-sub" data-a="sub">{s.sub}</p>
                {s.reveal && (
                  <p className="hs-reveal" data-a="rev">{s.reveal}</p>
                )}
                {s.id === "s3" && (
                  <div className="hs-ctas" data-a="cta">
                    <a className="hs-btn" href="/#contatti">
                      Inizia ora <span aria-hidden="true">→</span>
                    </a>
                    <a className="hs-link" href="/progetti">Guarda i miei lavori</a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={hintRef} className="hs-hint" aria-hidden="true">
          Scorri<i />
        </div>
        <div ref={dotsRef} className="hs-dots" aria-hidden="true">
          <b className="on" /><b /><b />
        </div>
      </div>
    </section>
  );
}
