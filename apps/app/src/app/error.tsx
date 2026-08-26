"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/error-state";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("OpenWarnDE application error:", error);
  }, [error]);

  return (
    <ErrorState
      code="Anwendungsfehler"
      title="Etwas ist schiefgelaufen."
      description="Die Seite konnte gerade nicht geladen werden. Bitte versuche es erneut."
      actionLabel="Erneut versuchen"
      onAction={reset}
    />
  );
}