import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl p-6 text-center">
      <h1 className="text-2xl font-semibold mb-2">Siden blev ikke fundet</h1>
      <p className="text-gray-600 mb-4">Siden kan være flyttet eller findes ikke længere.</p>
      <Link href="/" className="text-blue-700 underline">Gå til forsiden</Link>
    </div>
  );
}


