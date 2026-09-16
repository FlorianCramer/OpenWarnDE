"use client";

import dynamic from "next/dynamic";
import { SearchInput } from "@openwarnde/ui";

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
    <main className="h-dvh w-full overflow-hidden bg-background text-foreground">
      <div className="relative h-dvh w-full overflow-hidden bg-surface-muted">
        <div className="absolute inset-0 z-0">
          <GermanyMap />
        </div>

        <header className="pointer-events-none absolute inset-x-0 top-0 z-[1000] px-3 pt-3 sm:px-6 sm:pt-6">
          <div className="pointer-events-auto mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-xl border border-white/80 bg-surface/95 p-3 shadow-lg shadow-foreground/10 backdrop-blur-md sm:gap-4 sm:p-4">
            <h1 className="text-center text-base font-bold uppercase tracking-[0.18em] text-primary sm:text-lg">
              OpenWarnDE
            </h1>
            <SearchInput placeholder="Nach Warnungen, Regionen oder Orten suchen" />
          </div>
        </header>
      </div>
    </main>
  );
}