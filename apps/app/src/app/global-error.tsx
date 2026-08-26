"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/error-state";

type GlobalErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function GlobalError({
  error,
  reset,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error("OpenWarnDE global application error:", error);
  }, [error]);

  return (
    <html lang="de">
      <body>
        <ErrorState
          code="Systemfehler"
          title="Ein unerwarteter Fehler ist aufgetreten."
          description="OpenWarnDE konnte die Anwendung gerade nicht vollständig laden. Bitte versuche es erneut."
          actionLabel="Erneut versuchen"
          onAction={reset}
        />
      </body>
    </html>
  );
}