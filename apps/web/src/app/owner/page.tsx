"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardShell } from "@/components/platform/DashboardShell";
import { useAuth } from "@/providers/AuthProvider";

export default function OwnerPage() {
  return (
    <ProtectedRoute allowedRole="owner">
      <OwnerContent />
    </ProtectedRoute>
  );
}

function OwnerContent() {
  const { platformUser } = useAuth();

  return (
    <DashboardShell role="owner">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#5d6878]">
          Angemeldet als {platformUser?.email}
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Willkommen im Owner Cockpit
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          "Developer Verwaltung",
          "API Nutzung",
          "Plattform Einstellungen",
        ].map((title) => (
          <article
            className="rounded-lg border border-[#dfe5ec] bg-white p-5 shadow-sm"
            key={title}
          >
            <h3 className="mb-2 text-lg font-semibold">
              {title}
            </h3>
            <p className="text-sm leading-6 text-[#5d6878]">
              Dieser Bereich ist vorbereitet und kann spaeter mit
              Owner-Funktionen erweitert werden.
            </p>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
