"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardShell } from "@/components/platform/DashboardShell";
import { useAuth } from "@/providers/AuthProvider";

export default function DeveloperPage() {
  return (
    <ProtectedRoute allowedRole="developer">
      <DeveloperContent />
    </ProtectedRoute>
  );
}

function DeveloperContent() {
  const { platformUser } = useAuth();

  return (
    <DashboardShell role="developer">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#5d6878]">
          Angemeldet als {platformUser?.email}
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Developer Console
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {["API Keys", "Billing"].map((title) => (
          <article
            className="rounded-lg border border-[#dfe5ec] bg-white p-5 shadow-sm"
            key={title}
          >
            <h3 className="mb-2 text-lg font-semibold">
              {title}
            </h3>
            <p className="text-sm leading-6 text-[#5d6878]">
              Placeholder fuer die geplanten Developer-Funktionen.
            </p>
          </article>
        ))}
      </div>
    </DashboardShell>
  );
}
