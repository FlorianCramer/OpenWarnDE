import { ErrorState } from "@/components/error-state";

export default function NotFound() {
  return (
    <ErrorState
      code="404"
      title="Seite nicht gefunden."
      description="Die angeforderte Seite existiert nicht oder wurde möglicherweise verschoben."
      actionLabel="Zur Startseite"
    />
  );
}