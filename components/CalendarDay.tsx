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
  const isHoliday = Boolean(holidayLabel);

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
        "group relative flex min-h-[78px] flex-col justify-between overflow-hidden rounded-2xl border px-2.5 py-3 text-left transition sm:min-h-[92px] sm:px-3",
        isCurrentMonth
          ? "border-black/5 bg-white text-ink dark:border-slate-700 dark:bg-slate-100"
          : "border-black/5 bg-stone-100/90 text-muted dark:border-slate-700 dark:bg-slate-200/85 dark:text-slate-500",
        isInRange && !isSelected && "bg-[rgba(var(--accent),0.14)] dark:bg-[rgba(var(--accent),0.2)]",
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
            !isSelected && isCurrentMonth && "text-ink dark:text-slate-900",
            !isSelected && !isCurrentMonth && "text-muted dark:text-slate-500",
            !isSelected && isWeekend && isCurrentMonth && "text-[rgba(var(--accent),1)]"
          )}
        >
          {format(date, "d")}
        </span>
        {hasNote ? (
          <span
            aria-hidden="true"
            className={clsx(
              "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
              isSelected ? "bg-white" : "bg-[rgba(var(--accent),1)]"
            )}
          />
        ) : null}
      </div>

      <div className="mt-2 flex min-h-[28px] flex-col justify-end gap-1 sm:min-h-[34px]">
        {isHoliday ? (
          <span
            className={clsx(
              "inline-flex max-w-full rounded-xl px-2 py-1 text-[9px] font-bold uppercase leading-[1.05rem] tracking-[0.16em]",
              "whitespace-normal break-words",
              isSelected
                ? "bg-white/15 text-white/95"
                : "bg-black/6 text-slate-600 dark:bg-slate-700 dark:text-slate-100"
            )}
          >
            {holidayLabel}
          </span>
        ) : null}
        {isToday ? (
          <p
            className={clsx(
              "text-[11px] leading-none",
              isSelected ? "text-white/80" : "text-muted dark:text-slate-500"
            )}
          >
            Today
          </p>
        ) : null}
      </div>
    </motion.button>
  );
}

