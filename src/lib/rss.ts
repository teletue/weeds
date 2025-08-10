import Parser from "rss-parser";

export type NewsItem = {
  title: string;
  link: string;
  publishedAt: Date;
  source: string;
  summary?: string;
};

export const FEED_URLS: Array<{ name: string; url: string }> = [
  { name: "High Times", url: "https://hightimes.com/feed/" },
  { name: "Marijuana Moment", url: "https://www.marijuanamoment.com/feed/" },
  { name: "Leafly", url: "https://www.leafly.com/news/feed" },
  { name: "NORML", url: "https://norml.org/blog/feed/" },
];

type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
  content?: string;
};

const parser = new Parser();

export async function fetchAggregatedNews(maxItems: number = 50): Promise<NewsItem[]> {
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
        } as NewsItem;
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


