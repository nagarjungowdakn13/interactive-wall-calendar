"use client";

import { format } from "date-fns";
import { motion } from "framer-motion";

import { CalendarGrid } from "@/components/CalendarGrid";
import { DateRangePicker } from "@/components/DateRangePicker";
import { HeroImage } from "@/components/HeroImage";
import { MonthNavigator } from "@/components/MonthNavigator";
import { NotesPanel } from "@/components/NotesPanel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useCalendar } from "@/hooks/useCalendar";
import { useDateRange } from "@/hooks/useDateRange";
import { NoteRecord, formatSelectionLabel } from "@/utils/dateHelpers";

function BindingStrip() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-2 z-20 flex -translate-x-1/2 flex-col items-center">
      <div className="h-5 w-px bg-black/20 dark:bg-white/25" />
      <div className="flex items-center gap-[3px] rounded-full px-2 py-1">
        {Array.from({ length: 28 }).map((_, index) => (
          <span
            key={index}
            className="h-3 w-1 rounded-full border border-black/45 bg-white/80 dark:border-white/35 dark:bg-white/10"
          />
        ))}
      </div>
    </div>
  );
}

export function Calendar() {
  const {
    accentHex,
    calendarDays,
    currentMonth,
    heroImage,
    imageLoading,
    nextMonth,
    notes,
    previousMonth,
    setImageLoading,
    setNotes,
    setTheme,
    theme
  } = useCalendar();

  const {
    activeDate,
    clearRange,
    previewRange,
    range,
    selectDate,
    setActiveDate,
    setHoveredDate
  } = useDateRange();

  const handleSaveNote = (note: NoteRecord) => {
    setNotes((current) => {
      const filtered = current.filter((entry) => entry.id !== note.id);
      return [note, ...filtered];
    });
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((current) => current.filter((note) => note.id !== noteId));
  };

  return (
    <div className="mx-auto max-w-6xl py-8 lg:py-12">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="calendar-holes texture-paper relative overflow-hidden rounded-[2.5rem] border border-white/70 paper-surface p-4 shadow-paper sm:p-6 lg:p-8"
      >
        <BindingStrip />

        <div className="mb-6 mt-6 flex flex-wrap items-center justify-between gap-4 lg:mt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-muted">
              Frontend engineering challenge
            </p>
            <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
              Interactive Wall Calendar
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-full border border-black/5 bg-white/75 px-4 py-2 text-sm text-muted shadow-sm dark:border-white/10 dark:bg-white/5">
              Accent <span className="font-semibold text-ink">{accentHex}</span>
            </div>
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-[rgba(255,255,255,0.42)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur dark:bg-white/[0.03]">
          <div className="grid gap-0 xl:grid-cols-[1.05fr_0.95fr]">
            <HeroImage
              currentMonth={currentMonth}
              image={heroImage}
              loading={imageLoading}
              onLoadComplete={() => setImageLoading(false)}
            />

            <section className="flex flex-col gap-4 px-4 py-5 sm:px-5 sm:py-6">
              <div className="grid gap-4 rounded-[1.75rem] bg-white/65 p-4 shadow-sm dark:bg-white/[0.03]">
                <MonthNavigator
                  currentMonth={currentMonth}
                  onNext={() => {
                    setImageLoading(true);
                    nextMonth();
                  }}
                  onPrevious={() => {
                    setImageLoading(true);
                    previousMonth();
                  }}
                />

                <DateRangePicker label={formatSelectionLabel(range)} onClear={clearRange} />
              </div>

              <div className="rounded-[1.75rem] bg-white/78 p-4 shadow-sm dark:bg-white/[0.04]">
                <CalendarGrid
                  animationKey={format(currentMonth, "yyyy-MM")}
                  days={calendarDays}
                  notes={notes}
                  onFocusDate={setActiveDate}
                  onHoverDate={setHoveredDate}
                  onSelectDate={selectDate}
                  previewRange={previewRange}
                  range={range}
                />
              </div>
            </section>
          </div>

          <div className="border-t border-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(255,255,255,0.55))] px-4 py-5 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] sm:px-5 sm:py-6">
            <NotesPanel
              activeDate={activeDate}
              currentMonth={currentMonth}
              notes={notes}
              onDelete={handleDeleteNote}
              onSave={handleSaveNote}
              range={range}
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
