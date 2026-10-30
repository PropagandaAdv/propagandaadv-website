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
    sub: "Quello che realizziamo è la filiale più strategica della tua azienda. Costruiamo la tua vetrina su strada, aperta 24 ore su 24, 7 giorni su 7.",
    reveal: "Mentre tu riposi, le luci del tuo business rimangono accese. Ad accogliere, informare e vendere.",
    label: "Capannone industriale illuminato di notte",
  },
  {
    id: "s3",
    kicker: "03 · La conquista",
    title: "Non si tratta di avere una bella grafica online.",
    sub: "Si tratta di presidiare il tuo mercato. Facciamo in modo che chi cerca il tuo lavoro su Google trovi una porta spalancata, non un cartello Chiuso.",
    label: "Veduta aerea della città al tramonto",
  },
];

const FRAME_COUNT = 144;
const frameSrc = (i: number) => `/hero-frames/f${String(i + 1).padStart(3, "0")}.webp`;
// Confini di scena lungo il percorso: coincidono con i due agganci tra le tre clip.
const BOUNDS = [0, 0.34, 0.66, 1];

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    let target = 0;
    let shown = 0;
    let rafId: number | null = null;
    let drawn = -1;

    // --- fotogrammi: caricamento progressivo + disegno su canvas ---
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;
    const frames: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let loadStarted = false;
    let disposed = false;

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        const a = frames[i - d];
        if (a) return { img: a, idx: i - d };
        const b = frames[i + d];
        if (b) return { img: b, idx: i + d };
      }
      return null;
    };

    const draw = (i: number) => {
      if (!canvas || !ctx) return;
      const hit = nearestLoaded(i);
      if (!hit) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        drawn = -1;
      }
      if (drawn === hit.idx) return;
      drawn = hit.idx;
      const img = hit.img;
      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh);
    };

    const loadFrames = () => {
      if (loadStarted) return;
      loadStarted = true;
      const order: number[] = [];
      // prima i frame di riferimento (ogni 8), poi il resto: lo scrub funziona subito, poi si infittisce
      for (let i = 0; i < FRAME_COUNT; i += 8) order.push(i);
      for (let i = 0; i < FRAME_COUNT; i++) if (i % 8 !== 0) order.push(i);
      let cursor = 0;
      const next = () => {
        if (disposed || cursor >= order.length) return;
        const i = order[cursor++];
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          frames[i] = img;
          drawn = -1;
          draw(Math.round(shown));
          next();
        };
        img.onerror = next;
        img.src = frameSrc(i);
      };
      for (let k = 0; k < 4; k++) next();
    };

    const tickLoop = () => {
      rafId = null;
      const diff = target - shown;
      shown = Math.abs(diff) < 0.02 ? target : shown + diff * 0.14;
      draw(Math.round(shown));
      if (shown !== target) rafId = requestAnimationFrame(tickLoop);
    };
    const startLoop = () => {
      if (rafId === null) rafId = requestAnimationFrame(tickLoop);
    };

    const render = () => {
      ticking = false;
      const range = hero.offsetHeight - window.innerHeight;
      if (range <= 0) return;
      const rect = hero.getBoundingClientRect();
      const raw = clamp(-rect.top / range); // 0..1 lungo tutto il percorso
      target = raw * (FRAME_COUNT - 1);
      startLoop();
      const p = raw * 3 + 0; // usato solo per il rilevamento di cambio
      if (Math.abs(raw - last) < 0.0003) return;
      last = raw;

      const cur = raw < BOUNDS[1] ? 0 : raw < BOUNDS[2] ? 1 : 2;
      dotsRef.current?.querySelectorAll("b").forEach((d, i) => d.classList.toggle("on", i === cur));
      if (hintRef.current) hintRef.current.style.opacity = String(0.7 * (1 - ramp(p, 0, 0.12)));

      void p;
      parts.forEach((S, i) => {
        const s = (raw - BOUNDS[i]) / (BOUNDS[i + 1] - BOUNDS[i]);
        const first = i === 0;
        const final = i === parts.length - 1;
        const vis = (first ? 1 : ramp(s, -0.14, 0.12)) * (final ? 1 : 1 - ramp(s, 0.88, 1.12));

        if (S.bg) S.bg.style.opacity = vis.toFixed(3);
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
        loadFrames();
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
      disposed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      mq.removeEventListener("change", setup);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="hs" aria-label="Introduzione">
      <div className="hs-stage">
        <canvas ref={canvasRef} className="hs-canvas" aria-hidden="true" />
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
                    <a className="hs-link" href="/progetti">Guarda i nostri lavori</a>
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
