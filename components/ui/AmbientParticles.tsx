// Whisper-level ambient light particles for dark (bg-ink) sections — pure
// CSS drift, no JS loop. A fixed, deterministic layout (no Math.random())
// avoids any SSR/client hydration mismatch. prefers-reduced-motion is
// already handled globally (app/globals.css zeroes all animation durations),
// and the layer is skipped below lg: to keep mobile light.
const PARTICLES = [
  { left: "6%", top: "18%", size: 7, delay: "0s", duration: "11s" },
  { left: "14%", top: "62%", size: 5, delay: "-3s", duration: "13s" },
  { left: "22%", top: "35%", size: 9, delay: "-7s", duration: "9s" },
  { left: "31%", top: "80%", size: 5, delay: "-1s", duration: "12s" },
  { left: "40%", top: "12%", size: 6, delay: "-9s", duration: "10s" },
  { left: "48%", top: "50%", size: 5, delay: "-5s", duration: "14s" },
  { left: "57%", top: "28%", size: 8, delay: "-11s", duration: "11s" },
  { left: "65%", top: "70%", size: 5, delay: "-2s", duration: "10s" },
  { left: "73%", top: "40%", size: 7, delay: "-8s", duration: "14s" },
  { left: "81%", top: "20%", size: 5, delay: "-4s", duration: "9s" },
  { left: "88%", top: "60%", size: 8, delay: "-13s", duration: "12s" },
  { left: "94%", top: "85%", size: 5, delay: "-6s", duration: "11s" },
  { left: "10%", top: "90%", size: 6, delay: "-10s", duration: "13s" },
  { left: "53%", top: "88%", size: 5, delay: "-12s", duration: "10s" },
  { left: "77%", top: "8%", size: 6, delay: "-15s", duration: "13s" },
  { left: "35%", top: "55%", size: 5, delay: "-14s", duration: "9s" },
];

export function AmbientParticles({ variant = "blue" }: { variant?: "blue" | "white" }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      aria-hidden="true"
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={`ambient-particle ${variant === "white" ? "ambient-particle-white" : ""}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
