"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";

type CounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

export function Counter({ to, prefix = "", suffix = "", className, duration = 1.6 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!inView || !ref.current) return;

    if (reduceMotion) {
      ref.current.textContent = `${prefix}${to.toLocaleString("it-IT")}${suffix}`;
      return;
    }

    const controls = animate(motionValue, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString("it-IT")}${suffix}`;
        }
      },
    });

    return () => controls.stop();
  }, [inView, motionValue, to, prefix, suffix, duration, reduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {prefix}0{suffix}
    </motion.span>
  );
}
