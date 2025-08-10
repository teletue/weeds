import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://weeds.dk"),
  title: {
    default: "Weeds.dk — Cannabis Nyheder",
    template: "%s | Weeds.dk",
  },
  description:
    "Automatisk opdaterede cannabis-nyheder på dansk. Seneste nyt fra internationale kilder – oversat og samlet ét sted.",
  applicationName: "Weeds.dk",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Weeds.dk — Cannabis Nyheder",
    description:
      "Automatisk opdaterede cannabis-nyheder på dansk. Seneste nyt fra internationale kilder – oversat og samlet ét sted.",
    url: "https://weeds.dk",
    siteName: "Weeds.dk",
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weeds.dk — Cannabis Nyheder",
    description:
      "Automatisk opdaterede cannabis-nyheder på dansk. Seneste nyt fra internationale kilder – oversat og samlet ét sted.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh flex flex-col`}
      >
        <header className="border-b bg-[--color-card]">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold">Weeds.dk</Link>
            <nav className="flex gap-5 text-sm">
              <Link href="/" className="hover:underline">Forside</Link>
              <Link href="/emner" className="hover:underline">Emner</Link>
              <Link href="/kilder" className="hover:underline">Kilder</Link>
              <Link href="/om" className="hover:underline">Om</Link>
              <Link href="/kontakt" className="hover:underline">Kontakt</Link>
            </nav>
            <button
              type="button"
              className="text-sm px-3 py-1 rounded border"
              onClick={() => {
                if (typeof document !== 'undefined') {
                  const el = document.documentElement;
                  el.classList.toggle('theme-dark');
                  try {
                    localStorage.setItem('wd-theme', el.classList.contains('theme-dark') ? 'dark' : 'light');
                  } catch {}
                }
              }}
            >Tema</button>
          </div>
        </header>
        <main className="grow">{children}</main>
        <footer className="mt-12 border-t bg-[--color-card]">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Weeds.dk</p>
            <div className="flex gap-4">
              <Link href="/privatliv" className="hover:underline">Privatlivspolitik</Link>
              <Link href="/vilkar" className="hover:underline">Vilkår</Link>
              <Link href="/kilder" className="hover:underline">Kilder & ophavsret</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
