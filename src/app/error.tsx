'use client';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="text-2xl font-semibold mb-2">Der opstod en fejl</h1>
      <p className="text-gray-600">Prøv igen om lidt. Hvis fejlen fortsætter, kontakt os gerne.</p>
      {error?.digest ? (
        <p className="text-xs text-gray-500 mt-3">Fejlkode: {error.digest}</p>
      ) : null}
    </div>
  );
}


