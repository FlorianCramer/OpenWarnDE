"use client";

import * as React from "react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardShell } from "@/components/platform/DashboardShell";
import { UserManagement } from "@/components/platform/UserManagement";
import { useAuth } from "@/providers/AuthProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function OwnerPage() {
  return (
    <ProtectedRoute allowedRole="owner">
      <OwnerContent />
    </ProtectedRoute>
  );
}

function OwnerContent() {
  const { platformUser } = useAuth();
  const [activeTab, setActiveTab] = React.useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ownerTab") ?? "dashboard";
    }
    return "dashboard";
  });

  React.useEffect(() => {
    localStorage.setItem("ownerTab", activeTab);
  }, [activeTab]);

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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="benutzer">Benutzerverwaltung</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
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
        </TabsContent>

        <TabsContent value="benutzer">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}