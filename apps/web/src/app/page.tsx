"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthPanel } from "@/components/auth/AuthPanel";
import { AccessProblem } from "@/components/auth/AccessProblem";
import { useAuth } from "@/providers/AuthProvider";

function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <p className="text-sm font-semibold">
        OpenWarnDE Platform wird geladen...
      </p>
    </main>
  );
}

export default function Home() {
  const router = useRouter();
  const { user, platformUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && platformUser) {
      router.replace(`/${platformUser.role}`);
    }
  }, [loading, platformUser, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <AuthPanel />;
  }

  if (!platformUser) {
    return <AccessProblem />;
  }

  return <LoadingScreen />;
}