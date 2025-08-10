import Link from "next/link";
import { fetchAggregatedNews } from "@/lib/rss";

export const dynamic = "force-dynamic";

type SearchParams = { kilde?: string | string[] };

export default async function Emner({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const params = (await (searchParams as Promise<SearchParams>)) ?? (searchParams as SearchParams) ?? {};
  const selectedRaw = params.kilde;
  const selected = Array.isArray(selectedRaw) ? selectedRaw[0] : selectedRaw;

  const news = await fetchAggregatedNews(60);
  const sources = Array.from(new Set(news.map((n) => n.source)));
  const filtered = selected ? news.filter((n) => n.source === selected) : news;
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Emner & kilder</h1>
      <p className="text-sm text-gray-600 mb-6">
        Filtrer ved at vælge en kilde. (Første version — emne‑tagging kommer
        senere.)
      </p>
      <form className="mb-6">
        <label className="text-sm mr-2">Kilde:</label>
        <select className="border rounded px-2 py-1" name="kilde" defaultValue={selected || ""} onChange={(e)=>{
          if (typeof window !== 'undefined') {
            const val = e.currentTarget.value;
            const url = new URL(window.location.href);
            if (val) url.searchParams.set('kilde', val); else url.searchParams.delete('kilde');
            window.location.href = url.toString();
          }
        }}>
          <option value="">Alle</option>
          {sources.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </form>
      <ul className="space-y-4">
        {filtered.map((item) => (
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


