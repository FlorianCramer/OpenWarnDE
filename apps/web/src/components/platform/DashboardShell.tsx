"use client";

import {
  useMemo,
  type ReactNode,
} from "react";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import type { UserRole } from "@/types/user";

type DashboardShellProps = {
  children: ReactNode;
  role: UserRole;
};

export function DashboardShell({
  children,
  role,
}: DashboardShellProps) {
  const { platformUser } = useAuth();
  const initials = useMemo(() => {
    const source =
      platformUser?.displayName ||
      platformUser?.email ||
      role;

    return source
      .split(/[ @._-]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [platformUser, role]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-sm font-semibold uppercase text-primary">
              OpenWarnDE Platform
            </p>
            <h1 className="text-xl font-bold">
              {role === "owner"
                ? "Owner Bereich"
                : "Developer Bereich"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {initials}
            </div>
            <button
              className="rounded-md border border-border bg-surface px-3 py-2 text-sm font-semibold text-foreground hover:bg-surface-muted"
              type="button"
              onClick={() => void signOut(auth)}
            >
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        {children}
      </section>
    </main>
  );
}