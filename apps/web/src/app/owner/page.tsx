"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { DashboardShell } from "@/components/platform/DashboardShell";
import { UserManagement } from "@/components/platform/UserManagement";
import { DataSources } from "@/components/platform/DataSources";
import { useAuth } from "@/providers/AuthProvider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Dynamically import the map to avoid SSR issues with Leaflet
const GermanyMap = dynamic(
  () => import("@/components/map/GermanyMap").then((m) => m.GermanyMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex items-center justify-center rounded-lg border border-border bg-surface-muted"
        style={{ height: "500px" }}
      >
        <p className="text-sm text-foreground-muted">Karte wird geladen...</p>
      </div>
    ),
  }
);

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
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(null);

  React.useEffect(() => {
    localStorage.setItem("ownerTab", activeTab);
  }, [activeTab]);

  return (
    <DashboardShell role="owner">
      <div className="mb-8">
        <p className="text-sm font-semibold text-foreground-muted">
          Angemeldet als {platformUser?.email}
        </p>
        <h2 className="mt-2 text-3xl font-bold">
          Willkommen im Owner Cockpit
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="datenquellen">Datenquellen</TabsTrigger>
          <TabsTrigger value="benutzer">Benutzerverwaltung</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="space-y-6">
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Regionsübersicht</h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  Karte mit Fokus auf Deutschland. Die OpenStreetMap zeigt die
                  Topografie, Deutschland ist farblich hervorgehoben.
                </p>
              </div>
              <GermanyMap
                height="500px"
                onRegionClick={setSelectedRegion}
                selectedRegion={selectedRegion}
              />
              {selectedRegion && (
                <div className="mt-3 rounded-md border border-border bg-surface p-3">
                  <p className="text-sm text-foreground-muted">
                    Ausgewählte Region:{" "}
                    <span className="font-semibold text-foreground">
                      {selectedRegion}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="datenquellen">
          <DataSources />
        </TabsContent>

        <TabsContent value="benutzer">
          <UserManagement />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
