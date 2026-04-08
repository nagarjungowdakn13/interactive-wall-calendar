"use client";

import Image from "next/image";
import { format } from "date-fns";
import { motion } from "framer-motion";

type HeroImageProps = {
  currentMonth: Date;
  image: {
    src: string;
    alt: string;
  };
  loading: boolean;
  onLoadComplete: () => void;
};

export function HeroImage({
  currentMonth,
  image,
  loading,
  onLoadComplete
}: HeroImageProps) {
  return (
    <motion.section
      layout
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-[2rem] shadow-paper"
    >
      <div className="relative min-h-[360px] bg-slate-200 lg:min-h-[520px]">
        {loading ? (
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(120deg,rgba(255,255,255,0.12),rgba(255,255,255,0.36),rgba(255,255,255,0.12))] bg-[length:200%_100%]" />
        ) : null}

        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 52vw"
          onLoad={onLoadComplete}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white [clip-path:polygon(0_100%,0_55%,20%_100%,58%_100%,74%_66%,100%_100%,100%_100%)] dark:bg-[rgb(29,25,23)]" />
        <div className="absolute bottom-6 right-6 rounded-[1.75rem] bg-[rgba(var(--accent),0.95)] px-5 py-4 text-right text-white shadow-lg shadow-[rgba(var(--accent),0.35)]">
          <p className="text-sm uppercase tracking-[0.3em] text-white/75">{format(currentMonth, "yyyy")}</p>
          <h1 className="font-display text-4xl uppercase leading-none sm:text-5xl">
            {format(currentMonth, "LLLL")}
          </h1>
        </div>
      </div>
    </motion.section>
  );
}
