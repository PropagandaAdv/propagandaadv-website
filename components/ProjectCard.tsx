import Image from "next/image";
import { PLACEHOLDER_IMAGE, type Project } from "@/lib/projects";
import { IconArrowUpRight } from "@/components/icons";

export function ProjectCard({
  project,
  size = "half",
  priority = false,
  thumbnailSrc,
}: {
  project: Project;
  size?: "full" | "half";
  priority?: boolean;
  /** Overrides the default on-brand placeholder — pass a real screenshot path once one is available for this project. */
  thumbnailSrc?: string;
}) {
  const src = thumbnailSrc ?? PLACEHOLDER_IMAGE[project.placeholder];

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl bg-ink ${
        size === "full" ? "aspect-[16/9]" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={src}
        alt={
          thumbnailSrc
            ? `Screenshot della homepage del sito realizzato per ${project.name} (${project.sector})`
            : `Immagine grafica astratta on-brand per il progetto ${project.name} (${project.sector}), in attesa dello screenshot reale`
        }
        fill
        priority={priority}
        sizes={size === "full" ? "(min-width: 1024px) 90vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-brand/0 transition-colors duration-300 group-hover:bg-brand/20" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
        <div>
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {project.sector}
          </span>
          <h3 className="mt-3 font-display text-xl font-semibold text-white sm:text-2xl">{project.name}</h3>
          <p className="mt-1 text-sm text-white/70">{project.service}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1">
          <IconArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}
