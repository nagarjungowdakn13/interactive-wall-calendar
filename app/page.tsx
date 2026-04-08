import { Calendar } from "@/components/Calendar";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.14),_transparent_30%),linear-gradient(180deg,_#f8f5ef_0%,_#f2ede4_50%,_#ebe5db_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <Calendar />
    </main>
  );
}
