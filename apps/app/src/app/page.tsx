"use client";

import dynamic from "next/dynamic";
import { Card } from "flowbite-react";

const GermanyMap = dynamic(() => import("@/components/map/GermanyMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
      Karte wird geladen ...
    </div>
  ),
});

export default function Home() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-slate-950 text-white">
      <div className="relative h-dvh w-full overflow-hidden bg-slate-200">
        <div className="absolute inset-0 z-0">
          <GermanyMap />
        </div>

        <header className="pointer-events-none absolute inset-x-0 top-0 z-[1000] p-4 sm:p-6">
          <Card className="pointer-events-auto border border-white/70 bg-white/90 shadow-lg shadow-slate-900/10 backdrop-blur">
            <h1 className="text-center text-lg font-semibold uppercase tracking-[0.2em] text-cyan-700 sm:text-xl">
              OpenWarnDE
            </h1>
          </Card>
        </header>
      </div>
    </main>
  );
}