import Link from "next/link";
import { FEED_URLS } from "@/lib/rss";

export const metadata = { title: "Kilder" };

export default function Kilder() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Kilder</h1>
      <ul className="list-disc pl-6 space-y-2">
        {FEED_URLS.map((s) => (
          <li key={s.url}>
            <Link href={s.url} target="_blank" className="text-blue-700 hover:underline">
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


