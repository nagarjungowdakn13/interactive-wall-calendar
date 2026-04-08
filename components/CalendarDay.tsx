"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";
import { clsx } from "clsx";

type CalendarDayProps = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  hasNote: boolean;
  holidayLabel: string | null;
  onClick: () => void;
  onHover: () => void;
  onFocus: () => void;
};

export function CalendarDay({
  date,
  hasNote,
  holidayLabel,
  isCurrentMonth,
  isInRange,
  isRangeEnd,
  isRangeStart,
  isSelected,
  isToday,
  isWeekend,
  onClick,
  onFocus,
  onHover
}: CalendarDayProps) {
  return (
    <motion.button
      layout
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      aria-label={`Select ${format(date, "EEEE, MMMM d, yyyy")}`}
      onClick={onClick}
      onMouseEnter={onHover}
      onFocus={onFocus}
      className={clsx(
        "group relative flex min-h-[72px] flex-col justify-between rounded-2xl border px-2.5 py-3 text-left transition sm:min-h-[78px] sm:px-3",
        isCurrentMonth
          ? "border-black/5 bg-white text-ink dark:border-white/10 dark:bg-white/[0.05]"
          : "border-transparent bg-stone-100/60 text-muted dark:bg-white/[0.02]",
        isInRange && "bg-[rgba(var(--accent),0.12)]",
        (isRangeStart || isRangeEnd || isSelected) &&
          "border-transparent bg-[rgba(var(--accent),0.94)] text-white shadow-lg shadow-[rgba(var(--accent),0.25)]",
        isToday && !isSelected && "ring-2 ring-[rgba(var(--accent),0.45)]",
        "hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={clsx(
            "text-sm font-semibold sm:text-[15px]",
            isWeekend && !isSelected && "text-[rgba(var(--accent),1)]"
          )}
        >
          {format(date, "d")}
        </span>
        {hasNote ? (
          <span
            aria-hidden="true"
            className={clsx("mt-1 h-2.5 w-2.5 rounded-full", isSelected ? "bg-white" : "bg-[rgba(var(--accent),1)]")}
          />
        ) : null}
      </div>

      <div className="space-y-1">
        {holidayLabel ? (
          <span
            className={clsx(
              "inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
              isSelected ? "bg-white/15 text-white/90" : "bg-black/5 text-muted dark:bg-white/10"
            )}
          >
            {holidayLabel}
          </span>
        ) : null}
        {isToday ? (
          <p className={clsx("text-[11px]", isSelected ? "text-white/80" : "text-muted")}>Today</p>
        ) : null}
      </div>
    </motion.button>
  );
}
