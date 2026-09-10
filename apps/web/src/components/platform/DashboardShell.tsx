"use client";

import {
  useMemo,
  type ReactNode,
} from "react";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { Avatar, AvatarFallback, Button } from "@/components/ui";
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
      <header className="border-b border-border bg-surface shadow-xs sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              OpenWarnDE Platform
            </p>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              {role === "owner"
                ? "Owner Bereich"
                : "Developer Bereich"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Avatar size="md">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => void signOut(auth)}
            >
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        {children}
      </section>
    </main>
  );
}