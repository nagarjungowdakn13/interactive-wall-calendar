import { Calendar } from "@/components/Calendar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.14),_transparent_30%),linear-gradient(180deg,_#f8f5ef_0%,_#f2ede4_50%,_#ebe5db_100%)] px-4 py-6 text-ink transition-colors dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_26%),linear-gradient(180deg,_#111827_0%,_#0f172a_50%,_#020617_100%)] sm:px-6 lg:px-8">
      <Calendar />
    </main>
  );
}

