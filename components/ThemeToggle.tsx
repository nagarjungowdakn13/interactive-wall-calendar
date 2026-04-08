"use client";

type ThemeToggleProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

export function ThemeToggle({ onToggle, theme }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/75 px-4 py-2 text-sm font-semibold text-ink shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <span>{theme === "light" ? "Light" : "Night"}</span>
      <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs dark:bg-white/10">
        {theme === "light" ? "AM" : "PM"}
      </span>
    </button>
  );
}
