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
    <main className="min-h-screen bg-[#f6f7f9] text-[#172033]">
      <header className="border-b border-[#dfe5ec] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="text-sm font-semibold uppercase text-[#1d6f8f]">
              OpenWarnDE Platform
            </p>
            <h1 className="text-xl font-bold">
              {role === "owner"
                ? "Owner Bereich"
                : "Developer Bereich"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#184e63] text-sm font-bold text-white">
              {initials}
            </div>
            <button
              className="rounded-md border border-[#cfd8e3] bg-white px-3 py-2 text-sm font-semibold text-[#334155] hover:bg-[#eef2f5]"
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
