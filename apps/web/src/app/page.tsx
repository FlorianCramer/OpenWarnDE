"use client";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
          OpenWarnDE
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Platform
        </h1>
        <p className="text-lg text-gray-700 mb-3">
          Die OpenWarnDE Platform wurde erfolgreich über Firebase Hosting deployed.
        </p>
        <p className="text-lg text-gray-700">
          Developer-, Verwaltungs- und Plattformfunktionen werden hier zukünftig
          bereitgestellt.
        </p>
      </section>
    </main>
  );
}