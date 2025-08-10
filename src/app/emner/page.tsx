import Link from "next/link";
import { fetchAggregatedNews, FEED_URLS } from "@/lib/rss";

export const dynamic = "force-dynamic";

export default async function Emner() {
  const news = await fetchAggregatedNews(60);
  const sources = new Set(news.map((n) => n.source));
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Emner & kilder</h1>
      <p className="text-sm text-gray-600 mb-6">
        Filtrer ved at vælge en kilde. (Første version — emne‑tagging kommer
        senere.)
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {Array.from(sources).map((s) => (
          <span key={s} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {s}
          </span>
        ))}
      </div>
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.link} className="border rounded-lg p-4">
            <div className="text-sm text-gray-500">{item.source}</div>
            <Link href={item.link} target="_blank" className="text-lg font-semibold text-blue-700 hover:underline">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


