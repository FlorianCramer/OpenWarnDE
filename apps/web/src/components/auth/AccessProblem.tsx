"use client";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { Button, Card, CardTitle, CardDescription, Alert } from "@/components/ui";

export function AccessProblem() {
  const { user, profileError } = useAuth();
  const expectedPath = user
    ? `users/${user.uid}`
    : "users/<uid>";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <Alert variant="warning" className="mb-4">
          Zugriff nicht eingerichtet
        </Alert>

        <CardTitle className="mb-2 text-2xl font-bold">
          Kein Plattformprofil gefunden
        </CardTitle>
        <CardDescription className="mb-6">
          Dein Firebase Auth Account existiert, aber in Firestore fehlt das
          passende Dokument unter users/&lt;uid&gt; oder die Rolle ist nicht
          gültig.
        </CardDescription>

        <div className="mb-6 space-y-2 rounded-xl border border-border bg-surface-muted p-4 text-sm text-foreground">
          <p>
            <span className="font-semibold">
              Erwarteter Firestore-Pfad:
            </span>{" "}
            <span className="break-all font-mono text-xs">
              {expectedPath}
            </span>
          </p>
          {user?.email ? (
            <p>
              <span className="font-semibold">
                Auth E-Mail:
              </span>{" "}
              <span className="break-all">{user.email}</span>
            </p>
          ) : null}
          {profileError ? (
            <p>
              <span className="font-semibold">
                Firebase-Fehler:
              </span>{" "}
              <span className="break-all text-danger">{profileError}</span>
            </p>
          ) : null}
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            type="button"
            onClick={() => void signOut(auth)}
          >
            Abmelden
          </Button>
        </div>
      </Card>
    </main>
  );
}