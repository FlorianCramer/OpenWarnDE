"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/providers/AuthProvider";
import type { UserRole } from "@/types/user";
import { AccessProblem } from "./AccessProblem";

type ProtectedRouteProps = {
  allowedRole: UserRole;
  children: ReactNode;
};

const rolePath: Record<UserRole, string> = {
  owner: "/owner",
  developer: "/developer",
};

function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p className="text-sm font-semibold">
        OpenWarnDE Platform wird geladen...
      </p>
    </main>
  );
}

export function ProtectedRoute({
  allowedRole,
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, platformUser, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace("/");
      return;
    }

    if (
      platformUser &&
      platformUser.role !== allowedRole
    ) {
      router.replace(rolePath[platformUser.role]);
    }
  }, [
    allowedRole,
    loading,
    platformUser,
    router,
    user,
  ]);

  if (loading || !user) {
    return <LoadingScreen />;
  }

  if (!platformUser) {
    return <AccessProblem />;
  }

  if (platformUser.role !== allowedRole) {
    return <LoadingScreen />;
  }

  return children;
}