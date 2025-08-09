// Render dynamically at request time to avoid build-time external fetches
export const dynamic = "force-dynamic";

import Link from "next/link";
import Parser from "rss-parser";

type NewsItem = {
  title: string;
  link: string;
  publishedAt: Date;
  source: string;
  summary?: string;
};

type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
};

const FEED_URLS: Array<{ name: string; url: string }> = [
  { name: "High Times", url: "https://hightimes.com/feed/" },
  { name: "Marijuana Moment", url: "https://www.marijuanamoment.com/feed/" },
  { name: "Leafly", url: "https://www.leafly.com/news/feed" },
  { name: "NORML", url: "https://norml.org/blog/feed/" },
];

async function fetchAggregatedNews(maxItems: number = 50): Promise<NewsItem[]> {
  const parser = new Parser();
  const results = await Promise.allSettled(
    FEED_URLS.map(async (f) => {
      const feed = await parser.parseURL(f.url);
      const items: FeedItem[] = (feed.items ?? []) as FeedItem[];
      return items.map((item) => {
        const dateString: string = item.isoDate ?? item.pubDate ?? "";
        const publishedAt: Date = dateString ? new Date(dateString) : new Date();
        return {
          title: item.title ?? "Untitled",
          link: item.link ?? "#",
          publishedAt,
          source: f.name,
          summary: item.contentSnippet ?? item.content ?? undefined,
        } satisfies NewsItem;
      });
    })
  );

  const allItems: NewsItem[] = results
    .flatMap((res) => (res.status === "fulfilled" ? res.value : []))
    .filter((i) => Boolean(i.link));

  const seen = new Set<string>();
  const deduped = allItems.filter((i) => {
    if (seen.has(i.link)) return false;
    seen.add(i.link);
    return true;
  });

  deduped.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  return deduped.slice(0, maxItems);
}

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
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold mb-2">Weeds.dk — Cannabis‑nyheder</h1>
      <p className="text-gray-600 mb-6 text-sm">Seneste artikler fra udvalgte kilder. Titler og resumé kan være automatisk oversat.</p>
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.link} className="border rounded-lg p-4 hover:bg-gray-50">
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
    </main>
  );
}
