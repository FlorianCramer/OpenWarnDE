"use client";

import { Card } from "flowbite-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="max-w-2xl mx-auto p-4">
        <Card className="text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
            OpenWarnDE
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            App
          </h1>
          <p className="text-lg text-gray-700 mb-3">
            Die OpenWarnDE Anwendung wurde erfolgreich über Firebase Hosting deployed.
          </p>
          <p className="text-lg text-gray-700">
            Hier werden zukünftig aktuelle Warnungen und relevante Informationen
            für Nutzer bereitgestellt.
          </p>
        </Card>
      </section>
    </main>
  );
}