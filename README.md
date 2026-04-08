# Interactive Wall Calendar

A polished wall calendar built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, `date-fns`, and `localStorage`. The UI is inspired by a physical hanging calendar, with a large hero image, a monthly date grid, and an integrated notes area for month, date, and range-based planning.

## Requirement Audit

This project implements the PDF requirements:

- Physical wall-calendar inspired layout with a strong hero image and printed-sheet feel
- Start and end date range selection with clear start, end, and in-between states
- Integrated notes area for month, single date, and selected range
- Fully responsive desktop and mobile layouts
- Frontend-only persistence via `localStorage`
- Creative enhancements including dynamic theme accents, dark mode, holiday markers, and motion

## Features

- Physical wall-calendar inspired layout with spiral binding detail
- Monthly hero image that changes with each month
- Dynamic accent color derived from the current hero image with blue fallback
- Monday-first monthly calendar grid
- Today highlight, weekend highlight, holiday markers, and note indicators
- Date range selection with hover preview and animated transitions
- Notes for the full month, a single date, or a selected range
- `localStorage` persistence for notes and theme preference
- Fully responsive desktop, tablet, and mobile layout
- Dark/light mode toggle
- Framer Motion transitions, hover states, and subtle elevation
- Keyboard accessible controls and ARIA labels

## Tech Stack

- Next.js 14+ / App Router
- React 18+
- TypeScript
- Tailwind CSS
- Framer Motion
- date-fns
- localStorage

## Project Structure

```text
interactive-calendar/
+-- app/
|   +-- globals.css
|   +-- layout.tsx
|   +-- page.tsx
+-- components/
|   +-- Calendar.tsx
|   +-- CalendarDay.tsx
|   +-- CalendarGrid.tsx
|   +-- DateRangePicker.tsx
|   +-- HeroImage.tsx
|   +-- MonthNavigator.tsx
|   +-- NotesPanel.tsx
|   +-- ThemeToggle.tsx
+-- hooks/
|   +-- useCalendar.ts
|   +-- useDateRange.ts
|   +-- useLocalStorage.ts
+-- public/
|   +-- empty-notes.svg
+-- styles/
|   +-- texture.css
+-- utils/
|   +-- dateHelpers.ts
+-- README.md
+-- .eslintrc.json
+-- next-env.d.ts
+-- next.config.js
+-- package.json
+-- postcss.config.js
+-- tailwind.config.ts
+-- tsconfig.json
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build For Production

```bash
npm run build
npm start
```

## Deployment

### Vercel

1. Push the project to GitHub.
2. Import it in Vercel.
3. Keep the default Next.js settings.
4. Deploy.

### Netlify

1. Push the project to GitHub.
2. Import it in Netlify.
3. Set the build command to `npm run build`.
4. Use the Next.js runtime/plugin supported by Netlify.
5. Deploy.

## Submission Checklist

The PDF asks for these handoff items:

1. Source code repository
   Add your public GitHub or GitLab link here after pushing the project.
2. Video demonstration
   Record a short walkthrough showing month navigation, range selection, notes, and responsive behavior.
3. Live demo
   Add a deployed Vercel or Netlify link if you publish one.

Example placeholders:

- Repository: `https://github.com/your-name/interactive-wall-calendar`
- Video demo: `https://www.loom.com/share/your-demo-id`
- Live demo: `https://interactive-wall-calendar.vercel.app`

## Architecture

- `components/Calendar.tsx` composes the full experience and manages interactions between sections.
- `hooks/useCalendar.ts` handles month navigation, hero image state, theme persistence, accent syncing, and notes storage.
- `hooks/useDateRange.ts` manages selection logic, earlier-date resets, same-day one-day ranges, and hover preview.
- `utils/dateHelpers.ts` centralizes date math, note creation, note lookup, holiday markers, and accent extraction.
- `components/NotesPanel.tsx` provides month/date/range note editing plus archive display.

## Screenshots

Add real screenshots after running locally:

- `docs/desktop-calendar.png`
- `docs/mobile-calendar.png`

## Notes

- Notes and theme preferences live entirely in the browser through `localStorage`.
- No backend or database is used.
- If image color extraction is blocked by cross-origin restrictions, the accent falls back gracefully.
