import type { Metadata } from "next";

export const metadata: Metadata = { title: "Kontakt" };

export default function Kontakt() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-3">Kontakt</h1>
      <p className="text-gray-700">Skriv til os på kontakt@weeds.dk.</p>
    </div>
  );
}


