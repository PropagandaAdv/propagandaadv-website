"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { POST_CATEGORIES, type Post } from "@/lib/posts";

function FilterBar({ active, onChange }: { active: string; onChange: (value: string) => void }) {
  const options = ["Tutti", ...POST_CATEGORIES];

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Filtra gli aggiornamenti per categoria">
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
              isActive
                ? "border-brand bg-brand text-white"
                : "border-line text-ink/70 hover:border-ink/40 hover:text-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

function ArticleCell({ post, isOpen, onToggle }: { post: Post; isOpen: boolean; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();

  return (
    <Reveal y={20}>
      <article className="group">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="block w-full text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-brand">
              {post.title}
            </h3>
          </div>
          <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted">{post.date}</p>
        </button>

        <div
          className={`relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink transition-all duration-300 ${
            reduceMotion
              ? "opacity-100"
              : "opacity-100 lg:scale-95 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100 lg:group-focus-within:scale-100 lg:group-focus-within:opacity-100"
          }`}
        >
          <Image
            src={post.image}
            alt=""
            fill
            loading="lazy"
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover"
          />
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-5">
                <span className="inline-flex rounded-full bg-card px-3 py-1 text-xs font-semibold text-ink/70">
                  {post.category}
                </span>
                <p className="mt-3 text-base leading-relaxed text-muted">{post.excerpt}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

export function AggiornamentiList({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState("Tutti");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const visible = active === "Tutti" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="mt-10">
        <FilterBar active={active} onChange={setActive} />
      </div>

      <div className="mt-14 grid grid-cols-1 items-start gap-x-8 gap-y-14 lg:grid-cols-3">
        {visible.map((post) => (
          <ArticleCell
            key={post.slug}
            post={post}
            isOpen={openSlug === post.slug}
            onToggle={() => setOpenSlug((s) => (s === post.slug ? null : post.slug))}
          />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-muted">Nessun aggiornamento per questa categoria al momento.</p>
      )}
    </>
  );
}
