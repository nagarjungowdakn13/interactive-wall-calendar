"use client";

import { isBefore, isSameDay } from "date-fns";
import { useMemo, useState } from "react";

import { getPreviewRange } from "@/utils/dateHelpers";

export function useDateRange() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  });
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  const previewRange = useMemo(() => {
    if (range.start && !range.end && hoveredDate) {
      return getPreviewRange(range.start, hoveredDate);
    }

    return range;
  }, [hoveredDate, range]);

  const selectDate = (date: Date) => {
    setActiveDate(date);
    setHoveredDate(null);

    if (!range.start || (range.start && range.end)) {
      setRange({ start: date, end: null });
      return;
    }

    if (isSameDay(date, range.start)) {
      setRange({ start: date, end: date });
      return;
    }

    if (isBefore(date, range.start)) {
      setRange({ start: date, end: null });
      return;
    }

    setRange({ start: range.start, end: date });
  };

  const clearRange = () => {
    setRange({ start: null, end: null });
    setHoveredDate(null);
  };

  return {
    activeDate,
    clearRange,
    previewRange,
    range,
    selectDate,
    setActiveDate,
    setHoveredDate
  };
}
