"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { IconArrowUpRight, IconChevronDown } from "@/components/icons";

const VIDEO_SRC = "/generated/hero-loop.mp4";
const POSTER_SRC = "/generated/hero-loop-poster.webp";
const VIDEO_DURATION_FALLBACK = 10.08;

const HEADLINE_LINES = ["Idee veloci.", "Decisioni chiare.", "Risultati misurabili."];

// Progress ranges (0-1 across the scrub) where each headline line fades in,
// timed to the video's own three beats: wireframe del sito che prende forma
// (idea), grafico che sale (decisioni), notifica di nuovo contatto (risultati).
// Lines accumulate, none fade back out.
const LINE_BANDS: [number, number][] = [
  [0, 0.06],
  [0.28, 0.35],
  [0.58, 0.65],
];
const FINAL_RANGE: [number, number] = [0.72, 0.88];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const smoothstep = (x: number, a: number, b: number) => {
  if (a >= b) return x < a ? 0 : 1;
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

function HeroVideoScrub() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const finalRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const ctrl = new AbortController();
    let objectUrl: string | null = null;
    let watchdog: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | null = null;
    let lastTick = 0;
    let target = 0;
    let shown = 0;
    let onScreen = true; // IntersectionObserver can only ever turn this off
    let seekBusy = false;
    let pendingTime: number | null = null;
    let videoReady = false;
    const cache = new Map<HTMLElement, { o?: number; k?: number }>();

    const progress = () => {
      const r = section.getBoundingClientRect();
      const range = section.offsetHeight - window.innerHeight;
      return range > 0 ? clamp(-r.top / range, 0, 1) : 0;
    };

    const write = (
      el: HTMLElement | null,
      key: "o" | "k",
      value: number,
      apply: (el: HTMLElement, v: number) => void
    ) => {
      if (!el) return;
      const prev = cache.get(el)?.[key];
      if (prev !== undefined && Math.abs(prev - value) < 0.004) return;
      cache.set(el, { ...(cache.get(el) || {}), [key]: value });
      apply(el, value);
    };

    const paint = (p: number) => {
      LINE_BANDS.forEach(([a, b], i) => {
        const el = lineRefs.current[i];
        const f = Math.max(0.02, Math.min(0.04, (b - a) / 2));
        const op = i === 0 ? 1 : smoothstep(p, a, a + f);
        const k = clamp((p - a) / Math.max(0.02, b - a), 0, 1);
        write(el, "o", op, (e, v) => {
          e.style.opacity = v.toFixed(3);
        });
        write(el, "k", k, (e, v) => {
          e.style.transform = `translateY(${((1 - v) * 20).toFixed(2)}px)`;
        });
      });

      const [fa, fb] = FINAL_RANGE;
      const fop = smoothstep(p, fa, fb);
      write(finalRef.current, "o", fop, (e, v) => {
        e.style.opacity = v.toFixed(3);
        e.style.pointerEvents = v > 0.5 ? "auto" : "none";
      });
      write(finalRef.current, "k", fop, (e, v) => {
        e.style.transform = `translateY(${((1 - v) * 16).toFixed(2)}px)`;
      });

      write(cueRef.current, "o", 1 - smoothstep(p, 0.02, 0.07), (e, v) => {
        e.style.opacity = v.toFixed(3);
      });
    };

    const fail = () => {
      clearTimeout(watchdog);
      setFailed(true);
    };

    const requestSeek = (t: number) => {
      if (!videoReady || !video.duration) return;
      if (seekBusy) {
        pendingTime = t;
        return;
      }
      seekBusy = true;
      video.currentTime = t;
    };
    const onSeeked = () => {
      seekBusy = false;
      if (pendingTime !== null) {
        const t = pendingTime;
        pendingTime = null;
        requestSeek(t);
      }
    };
    const onVideoError = () => {
      seekBusy = false;
      pendingTime = null;
      if (!videoReady) fail();
    };
    const onCanPlay = () => {
      videoReady = true;
      setReady(true);
      requestSeek(progress() * Math.max(0, video.duration - 0.03));
    };

    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.14, dt / 16.667));
      const settled = Math.abs(target - shown) < 0.0005;
      if (settled) shown = target;
      requestSeek(shown * Math.max(0, (video.duration || VIDEO_DURATION_FALLBACK) - 0.03));
      paint(shown);
      if (settled) {
        rafId = null;
        lastTick = 0;
      } else {
        rafId = onScreen ? requestAnimationFrame(tick) : null;
      }
    };
    const kick = () => {
      if (rafId === null && onScreen) rafId = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = progress();
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) onScroll();
    });
    io.observe(section);

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("canplay", onCanPlay, { once: true });
    video.addEventListener("error", onVideoError);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Il video arriva come Blob: crossfade pulito dal poster, niente frame grezzi in caricamento.
    const loadBlob = async () => {
      const arm = () => {
        clearTimeout(watchdog);
        watchdog = setTimeout(() => ctrl.abort(), 20000);
      };
      arm();
      const res = await fetch(VIDEO_SRC, { signal: ctrl.signal });
      if (!res.ok || !res.body) throw new Error(`video ${res.status}`);
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        arm();
        chunks.push(value);
      }
      clearTimeout(watchdog);
      objectUrl = URL.createObjectURL(new Blob(chunks as BlobPart[], { type: "video/mp4" }));
      video.src = objectUrl;
      video.load();
    };

    let started = false;
    const start = () => {
      if (started || ctrl.signal.aborted) return;
      started = true;
      loadBlob().catch((err) => {
        if (err?.name === "AbortError") return;
        fail();
      });
    };
    const posterImg = posterRef.current;
    if (posterImg?.complete) start();
    else posterImg?.addEventListener("load", start, { once: true });
    posterImg?.addEventListener("error", start, { once: true });
    const safety = setTimeout(start, 4000);

    onScroll();
    kick();

    return () => {
      ctrl.abort();
      clearTimeout(watchdog);
      clearTimeout(safety);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onVideoError);
      posterImg?.removeEventListener("load", start);
      posterImg?.removeEventListener("error", start);
      if (rafId !== null) cancelAnimationFrame(rafId);
      video.removeAttribute("src");
      video.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <section ref={sectionRef} id="main" className="relative h-[420vh] bg-ink">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={posterRef}
          src={POSTER_SRC}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready && !failed ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

        <Container className="relative flex h-full flex-col justify-center">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
              Marketing che porta clienti.
            </p>

            <h1 className="font-display font-bold leading-[0.98] tracking-tightest text-[clamp(2.75rem,7vw,5.5rem)] text-white text-balance">
              {HEADLINE_LINES.map((line, i) => (
                <span
                  key={line}
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className={`block will-change-transform ${i === 1 ? "text-brand-light text-glow" : ""}`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {line}
                </span>
              ))}
            </h1>

            <div ref={finalRef} className="will-change-transform" style={{ opacity: 0, pointerEvents: "none" }}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
                Dallo sviluppo di siti web vetrina alle strategie di lead generation innovative: affianchiamo
                imprenditori e decision maker nella crescita, con un processo unico che integra strategia,
                sviluppo, advertising, SEO e analisi dei dati.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href="#contatti"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
                >
                  Richiedi una consulenza gratuita
                  <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#servizi"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white"
                >
                  Scopri i servizi
                </a>
              </div>

              <div className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm">
                <p className="font-display text-3xl font-bold text-white">+450</p>
                <p className="max-w-[12rem] text-sm leading-snug text-white/75">progetti sviluppati e creati dal 2020</p>
              </div>
            </div>
          </div>

          <a
            ref={cueRef}
            href="#progetti"
            className="mt-20 hidden items-center gap-2 text-sm font-medium text-white/70 lg:flex"
            aria-label="Scorri per saperne di più"
          >
            Scorri
            <IconChevronDown className="h-4 w-4 animate-bounce" />
          </a>
        </Container>
      </div>
    </section>
  );
}

function HeroStatic() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="main" className="relative isolate overflow-hidden bg-ink pt-[132px] pb-24 lg:pt-[168px] lg:pb-32">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={POSTER_SRC}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-light" />
            Marketing che porta clienti.
          </motion.p>

          <h1 className="font-display font-bold leading-[0.98] tracking-tightest text-[clamp(2.75rem,7vw,5.5rem)] text-white text-balance">
            {HEADLINE_LINES.map((line, i) => (
              <motion.span
                key={line}
                initial={reduceMotion ? undefined : { opacity: 0, y: 28 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${i === 1 ? "text-brand-light text-glow" : ""}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-white/80"
          >
            Dallo sviluppo di siti web vetrina alle strategie di lead generation innovative: affianchiamo
            imprenditori e decision maker nella crescita, con un processo unico che integra strategia,
            sviluppo, advertising, SEO e analisi dei dati.
          </motion.p>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contatti"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              Richiedi una consulenza gratuita
              <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#servizi"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white"
            >
              Scopri i servizi
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-12 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm"
          >
            <p className="font-display text-3xl font-bold text-white">+450</p>
            <p className="max-w-[12rem] text-sm leading-snug text-white/75">progetti sviluppati e creati dal 2020</p>
          </motion.div>
        </div>

        <motion.a
          href="#chi-siamo"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-20 hidden items-center gap-2 text-sm font-medium text-white/70 lg:flex"
          aria-label="Scorri per saperne di più"
        >
          Scorri
          <motion.span
            animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <IconChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </Container>
    </section>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [scrubOn, setScrubOn] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setScrubOn(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!mounted || !scrubOn || reduceMotion) return <HeroStatic />;
  return <HeroVideoScrub />;
}
