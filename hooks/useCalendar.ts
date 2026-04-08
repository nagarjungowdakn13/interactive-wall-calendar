"use client";

import { addMonths, subMonths } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  FALLBACK_ACCENT,
  NoteRecord,
  createCalendarDays,
  extractAccentColor,
  getMonthImage,
  rgbStringToVars
} from "@/utils/dateHelpers";

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [imageLoading, setImageLoading] = useState(true);
  const [accentHex, setAccentHex] = useState(FALLBACK_ACCENT);

  const heroImage = useMemo(() => getMonthImage(currentMonth.getMonth()), [currentMonth]);
  const calendarDays = useMemo(() => createCalendarDays(currentMonth), [currentMonth]);
  const notesStorage = useLocalStorage<NoteRecord[]>("interactive-wall-calendar-notes", []);
  const themeStorage = useLocalStorage<"light" | "dark">("interactive-wall-calendar-theme", "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", themeStorage.value === "dark");
  }, [themeStorage.value]);

  useEffect(() => {
    let cancelled = false;

    const syncAccent = async () => {
      const nextAccent = await extractAccentColor(heroImage.src, heroImage.accent);
      if (cancelled) {
        return;
      }

      setAccentHex(nextAccent);
      const vars = rgbStringToVars(nextAccent);
      if (vars) {
        document.documentElement.style.setProperty("--accent", vars.accent);
      }
    };

    void syncAccent();

    return () => {
      cancelled = true;
    };
  }, [heroImage]);

  return {
    accentHex,
    calendarDays,
    currentMonth,
    heroImage,
    imageLoading,
    nextMonth: () => setCurrentMonth((value) => addMonths(value, 1)),
    notes: notesStorage.value,
    previousMonth: () => setCurrentMonth((value) => subMonths(value, 1)),
    setImageLoading,
    setNotes: notesStorage.setValue,
    setTheme: themeStorage.setValue,
    theme: themeStorage.value
  };
}
