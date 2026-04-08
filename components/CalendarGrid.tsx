"use client";

import { isSameDay } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

import { CalendarDay } from "@/components/CalendarDay";
import {
  DateRange,
  NoteRecord,
  WEEKDAY_LABELS,
  getHolidayForDate,
  hasNoteOnDate,
  isDateWithinRange
} from "@/utils/dateHelpers";

type CalendarGridProps = {
  animationKey: string;
  days: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
  }[];
  notes: NoteRecord[];
  onFocusDate: (date: Date) => void;
  onHoverDate: (date: Date) => void;
  onSelectDate: (date: Date) => void;
  previewRange: DateRange;
  range: DateRange;
};

export function CalendarGrid({
  animationKey,
  days,
  notes,
  onFocusDate,
  onHoverDate,
  onSelectDate,
  previewRange,
  range
}: CalendarGridProps) {
  return (
    <div>
      <div className="mb-3 grid grid-cols-7 gap-2 px-1">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="py-2 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted sm:text-[11px]"
          >
            {label}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="grid grid-cols-7 gap-2"
        >
          {days.map((day) => {
            const end = range.end ?? range.start;
            const isRangeStart = !!range.start && isSameDay(day.date, range.start);
            const isRangeEnd = !!end && isSameDay(day.date, end);

            return (
              <CalendarDay
                key={day.date.toISOString()}
                date={day.date}
                hasNote={hasNoteOnDate(day.date, notes)}
                holidayLabel={getHolidayForDate(day.date)?.label ?? null}
                isCurrentMonth={day.isCurrentMonth}
                isInRange={isDateWithinRange(day.date, previewRange)}
                isRangeEnd={isRangeEnd}
                isRangeStart={isRangeStart}
                isSelected={isRangeStart || isRangeEnd}
                isToday={day.isToday}
                isWeekend={day.isWeekend}
                onClick={() => onSelectDate(day.date)}
                onFocus={() => onFocusDate(day.date)}
                onHover={() => onHoverDate(day.date)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
