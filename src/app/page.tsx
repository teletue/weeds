// Render dynamically at request time to avoid build-time external fetches
export const dynamic = "force-dynamic";

import Link from "next/link";
import { fetchAggregatedNews } from "@/lib/rss";

// aggregator moved to `@/lib/rss`

function formatDate(date: Date) {
  try {
    return new Date(date).toLocaleString("da-DK", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Europe/Copenhagen",
    });
  } catch {
    return String(date);
  }
}

function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
}

export default async function HomePage() {
  const news = await fetchAggregatedNews(50);
  const hasNews = news.length > 0;
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold mb-2">Weeds.dk — Cannabis‑nyheder</h1>
      <p className="text-gray-600 mb-6 text-sm">Seneste artikler fra udvalgte kilder. Titler og resumé kan være automatisk oversat.</p>
      {!hasNews ? (
        <div className="text-gray-600">Ingen artikler lige nu. Prøv igen om et øjeblik.</div>
      ) : (
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.link} className="border border-[--color-border] bg-[--color-card] rounded-lg p-4 hover:bg-[--color-muted]">
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">Kilde: {item.source}</span>
              <span>•</span>
              <span>{formatDate(item.publishedAt)}</span>
            </div>
            <Link href={item.link} target="_blank" className="text-lg font-semibold text-blue-700 hover:underline">
              {item.title}
            </Link>
            {item.summary ? (
              <p className="text-gray-700 mt-1">{stripHtml(item.summary)}</p>
            ) : null}
            <div className="mt-2 text-xs text-gray-500">Automatisk oversat • <Link href={item.link} target="_blank" className="underline">Læs hos kilden</Link></div>
          </li>
        ))}
      </ul>
      )}
    </main>
  );
}
