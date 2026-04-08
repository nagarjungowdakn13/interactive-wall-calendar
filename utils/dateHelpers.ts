import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek
} from "date-fns";

export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type NoteTargetType = "month" | "date" | "range";

export type NoteRecord = {
  id: string;
  type: NoteTargetType;
  label: string;
  content: string;
  monthKey: string;
  dateKey?: string;
  rangeStart?: string;
  rangeEnd?: string;
  updatedAt: string;
};

export type HolidayMarker = {
  label: string;
  month: number;
  day: number;
};

export const FALLBACK_ACCENT = "#2563eb";
export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTH_IMAGE_LIBRARY = [
  {
    src: "https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&fit=crop&w=1400&q=80",
    alt: "Winter mountain valley",
    accent: "#3b82f6"
  },
  {
    src: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=80",
    alt: "Cold sunrise landscape",
    accent: "#2563eb"
  },
  {
    src: "https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?auto=format&fit=crop&w=1400&q=80",
    alt: "Spring botanical garden",
    accent: "#16a34a"
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1400&q=80",
    alt: "Blossoming spring tree",
    accent: "#ec4899"
  },
  {
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1400&q=80",
    alt: "Lush mountain meadow",
    accent: "#22c55e"
  },
  {
    src: "https://images.unsplash.com/photo-1465146633011-14f8e0781093?auto=format&fit=crop&w=1400&q=80",
    alt: "Golden coast at sunset",
    accent: "#f59e0b"
  },
  {
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1400&q=80",
    alt: "Summer lake and mountain",
    accent: "#0ea5e9"
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    alt: "Bright seaside view",
    accent: "#fb7185"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
    alt: "Autumn lake reflection",
    accent: "#d97706"
  },
  {
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80",
    alt: "Amber hillside in fall",
    accent: "#f97316"
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    alt: "Forest path in late fall",
    accent: "#65a30d"
  },
  {
    src: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1400&q=80",
    alt: "Snowy village evening",
    accent: "#60a5fa"
  }
] as const;

export const HOLIDAYS: HolidayMarker[] = [
  { label: "New Year", month: 0, day: 1 },
  { label: "Valentine", month: 1, day: 14 },
  { label: "Earth Day", month: 3, day: 22 },
  { label: "Labor Day", month: 4, day: 1 },
  { label: "Halloween", month: 9, day: 31 },
  { label: "Christmas", month: 11, day: 25 },
  { label: "Year End", month: 11, day: 31 }
];

export function createCalendarDays(viewDate: Date) {
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map((date) => ({
    date,
    isCurrentMonth: isSameMonth(date, viewDate),
    isToday: isToday(date),
    isWeekend: date.getDay() === 0 || date.getDay() === 6
  }));
}

export function getMonthImage(monthIndex: number) {
  return MONTH_IMAGE_LIBRARY[monthIndex % MONTH_IMAGE_LIBRARY.length];
}

export function getMonthKey(date: Date) {
  return format(date, "yyyy-MM");
}

export function getDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function getRangeKey(start: Date, end: Date) {
  return `${getDateKey(start)}_${getDateKey(end)}`;
}

export function isDateWithinRange(date: Date, range: DateRange) {
  if (!range.start) {
    return false;
  }

  const end = range.end ?? range.start;

  return (
    (isAfter(date, range.start) || isSameDay(date, range.start)) &&
    (isBefore(date, end) || isSameDay(date, end))
  );
}

export function getPreviewRange(start: Date | null, hovered: Date | null): DateRange {
  if (!start || !hovered) {
    return { start, end: null };
  }

  if (isBefore(hovered, start)) {
    return { start: hovered, end: start };
  }

  return { start, end: hovered };
}

export function formatSelectionLabel(range: DateRange) {
  if (!range.start) {
    return "No dates selected";
  }

  if (!range.end) {
    return `Start date: ${format(range.start, "EEE, MMM d")}`;
  }

  if (isSameDay(range.start, range.end)) {
    return format(range.start, "EEEE, MMMM d, yyyy");
  }

  return `${format(range.start, "MMM d")} - ${format(range.end, "MMM d, yyyy")}`;
}

export function getHolidayForDate(date: Date) {
  return HOLIDAYS.find((holiday) => holiday.month === date.getMonth() && holiday.day === date.getDate()) ?? null;
}

export function buildNoteLabel(type: NoteTargetType, viewDate: Date, range: DateRange, activeDate: Date | null) {
  if (type === "month") {
    return format(viewDate, "MMMM yyyy");
  }

  if (type === "date" && activeDate) {
    return format(activeDate, "EEEE, MMMM d, yyyy");
  }

  if (type === "range" && range.start) {
    return formatSelectionLabel({ start: range.start, end: range.end ?? range.start });
  }

  return format(viewDate, "MMMM yyyy");
}

export function createNoteRecord(params: {
  type: NoteTargetType;
  content: string;
  viewDate: Date;
  range: DateRange;
  activeDate: Date | null;
}): NoteRecord | null {
  const { activeDate, content, range, type, viewDate } = params;
  const monthKey = getMonthKey(viewDate);
  const updatedAt = new Date().toISOString();

  if (type === "month") {
    return {
      id: `month:${monthKey}`,
      type,
      label: buildNoteLabel(type, viewDate, range, activeDate),
      content,
      monthKey,
      updatedAt
    };
  }

  if (type === "date" && activeDate) {
    return {
      id: `date:${getDateKey(activeDate)}`,
      type,
      label: buildNoteLabel(type, viewDate, range, activeDate),
      content,
      monthKey,
      dateKey: getDateKey(activeDate),
      updatedAt
    };
  }

  if (type === "range" && range.start) {
    const safeEnd = range.end ?? range.start;
    return {
      id: `range:${getRangeKey(range.start, safeEnd)}`,
      type,
      label: buildNoteLabel(type, viewDate, range, activeDate),
      content,
      monthKey,
      rangeStart: getDateKey(range.start),
      rangeEnd: getDateKey(safeEnd),
      updatedAt
    };
  }

  return null;
}

export function hasNoteOnDate(date: Date, notes: NoteRecord[]) {
  const key = getDateKey(date);

  return notes.some((note) => {
    if (note.type === "date") {
      return note.dateKey === key;
    }

    if (note.type === "range" && note.rangeStart && note.rangeEnd) {
      return key >= note.rangeStart && key <= note.rangeEnd;
    }

    return false;
  });
}

export async function extractAccentColor(imageUrl: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  return new Promise<string>((resolve) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.referrerPolicy = "no-referrer";
    image.src = imageUrl;

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          resolve(fallback);
          return;
        }

        canvas.width = 24;
        canvas.height = 24;
        context.drawImage(image, 0, 0, 24, 24);
        const pixels = context.getImageData(0, 0, 24, 24).data;

        let red = 0;
        let green = 0;
        let blue = 0;
        let count = 0;

        for (let index = 0; index < pixels.length; index += 16) {
          red += pixels[index];
          green += pixels[index + 1];
          blue += pixels[index + 2];
          count += 1;
        }

        resolve(`rgb(${Math.round(red / count)}, ${Math.round(green / count)}, ${Math.round(blue / count)})`);
      } catch {
        resolve(fallback);
      }
    };

    image.onerror = () => resolve(fallback);
  });
}

export function rgbStringToVars(color: string) {
  const parts = color.match(/\d+/g)?.slice(0, 3).map(Number);

  if (!parts || parts.length < 3) {
    return null;
  }

  return {
    accent: `${parts[0]} ${parts[1]} ${parts[2]}`
  };
}
