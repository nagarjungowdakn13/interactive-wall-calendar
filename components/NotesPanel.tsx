"use client";

import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

import {
  DateRange,
  NoteRecord,
  NoteTargetType,
  buildNoteLabel,
  createNoteRecord
} from "@/utils/dateHelpers";

type NotesPanelProps = {
  activeDate: Date | null;
  currentMonth: Date;
  notes: NoteRecord[];
  onDelete: (noteId: string) => void;
  onSave: (note: NoteRecord) => void;
  range: DateRange;
};

export function NotesPanel({
  activeDate,
  currentMonth,
  notes,
  onDelete,
  onSave,
  range
}: NotesPanelProps) {
  const defaultTarget: NoteTargetType = useMemo(() => {
    if (range.start) return "range";
    if (activeDate) return "date";
    return "month";
  }, [activeDate, range.start]);

  const [target, setTarget] = useState<NoteTargetType>(defaultTarget);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setTarget(defaultTarget);
  }, [defaultTarget]);

  const currentRecord = useMemo(() => {
    const candidate = createNoteRecord({
      type: target,
      content: draft,
      viewDate: currentMonth,
      range,
      activeDate
    });

    if (!candidate) return null;
    return notes.find((note) => note.id === candidate.id) ?? candidate;
  }, [activeDate, currentMonth, draft, notes, range, target]);

  useEffect(() => {
    setDraft(currentRecord?.content ?? "");
  }, [currentRecord?.content, currentRecord?.id]);

  const isDisabled = (target === "date" && !activeDate) || (target === "range" && !range.start);
  const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  const visibleNotes = useMemo(
    () =>
      [...notes]
        .filter((note) => note.monthKey === monthKey)
        .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)),
    [monthKey, notes]
  );

  const handleSave = () => {
    const note = createNoteRecord({
      type: target,
      content: draft.trim(),
      viewDate: currentMonth,
      range,
      activeDate
    });

    if (!note || !note.content) return;
    onSave(note);
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-black/5 bg-white/78 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.05] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Notes</p>
            <h3 className="mt-2 font-display text-3xl text-ink">Planning Space</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["month", "date", "range"] as NoteTargetType[]).map((option) => {
              const disabled =
                (option === "date" && !activeDate) || (option === "range" && !range.start);

              return (
                <button
                  key={option}
                  type="button"
                  disabled={disabled}
                  onClick={() => setTarget(option)}
                  className={clsx(
                    "rounded-full px-3 py-2 text-sm font-semibold capitalize transition",
                    target === option
                      ? "bg-[rgba(var(--accent),0.94)] text-white"
                      : "bg-black/5 text-ink hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15",
                    disabled && "cursor-not-allowed opacity-45"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5 rounded-[1.5rem] border border-dashed border-black/10 bg-black/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-muted">Current target</p>
          <p className="mt-2 text-sm font-medium text-ink sm:text-base">
            {buildNoteLabel(target, currentMonth, range, activeDate)}
          </p>
        </div>

        <div className="mt-5">
          <label htmlFor="notes" className="mb-2 block text-sm font-semibold text-ink">
            Write your note
          </label>
          <textarea
            id="notes"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            disabled={isDisabled}
            placeholder={
              isDisabled
                ? "Select a date or date range to attach a note."
                : "Capture plans, reminders, or highlights for this selection..."
            }
            className="min-h-[180px] w-full rounded-[1.5rem] border border-black/10 bg-white/80 px-4 py-4 text-sm text-ink shadow-inner placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04]"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isDisabled || !draft.trim()}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-[rgb(var(--paper))] shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save note
          </button>
          {currentRecord?.content ? (
            <button
              type="button"
              onClick={() => onDelete(currentRecord.id)}
              className="rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
            >
              Delete note
            </button>
          ) : null}
        </div>
      </section>

      <section className="rounded-[2rem] border border-black/5 bg-white/70 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.05] sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Saved this month</p>
            <h3 className="mt-2 font-display text-3xl text-ink">Note Archive</h3>
          </div>
          <span className="rounded-full bg-[rgba(var(--accent),0.12)] px-3 py-1 text-sm font-semibold text-[rgba(var(--accent),1)]">
            {visibleNotes.length}
          </span>
        </div>

        {visibleNotes.length === 0 ? (
          <div className="mt-6 flex flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-black/10 bg-black/[0.02] px-6 py-8 text-center dark:border-white/10 dark:bg-white/[0.03]">
            <Image
              src="/empty-notes.svg"
              alt="Empty notes illustration"
              width={150}
              height={120}
            />
            <p className="mt-4 font-display text-2xl text-ink">No notes yet</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Add a note for the month, a single day, or your current range and it will appear here.
            </p>
          </div>
        ) : (
          <div className="scrollbar-thin mt-6 max-h-[380px] space-y-3 overflow-auto pr-1">
            {visibleNotes.map((note) => (
              <motion.article
                layout
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[1.5rem] border border-black/5 bg-white/85 p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                      {note.type}
                    </p>
                    <h4 className="mt-1 text-sm font-semibold text-ink">{note.label}</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => onDelete(note.id)}
                    aria-label={`Delete ${note.label} note`}
                    className="rounded-full px-2 py-1 text-xs font-semibold text-muted transition hover:bg-black/5 hover:text-ink dark:hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted">{note.content}</p>
                <p className="mt-3 text-xs text-muted">
                  Updated {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </p>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}


