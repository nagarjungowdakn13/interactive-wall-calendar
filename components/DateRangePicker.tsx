"use client";

import { motion } from "framer-motion";

type DateRangePickerProps = {
  label: string;
  onClear: () => void;
};

export function DateRangePicker({ label, onClear }: DateRangePickerProps) {
  return (
    <motion.div
      layout
      className="flex flex-col gap-3 rounded-[1.5rem] border border-black/5 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Selected Range</p>
        <p className="mt-1 text-sm font-medium text-ink sm:text-base">{label}</p>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="rounded-full bg-[rgba(var(--accent),0.12)] px-4 py-2 text-sm font-semibold text-[rgba(var(--accent),1)] transition hover:-translate-y-0.5 hover:bg-[rgba(var(--accent),0.18)]"
      >
        Clear
      </button>
    </motion.div>
  );
}
