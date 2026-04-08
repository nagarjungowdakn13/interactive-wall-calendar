"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

type MonthNavigatorProps = {
  currentMonth: Date;
  onNext: () => void;
  onPrevious: () => void;
};

export function MonthNavigator({
  currentMonth,
  onNext,
  onPrevious
}: MonthNavigatorProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">Calendar</p>
        <motion.h2
          key={format(currentMonth, "yyyy-MM")}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 font-display text-4xl leading-none text-ink sm:text-[3.2rem]"
        >
          {format(currentMonth, "MMMM yyyy")}
        </motion.h2>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrevious}
          aria-label="Show previous month"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/80 text-lg font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
        >
          &lt;
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Show next month"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white/80 text-lg font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
