"use client";

import { useState, type FormEvent } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import type { UserRole } from "@/types/user";

type AuthMode = "login" | "register";

type AuthFormState = {
  displayName: string;
  email: string;
  password: string;
};

const initialFormState: AuthFormState = {
  displayName: "",
  email: "",
  password: "",
};

function getAuthErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = String(error.code);

    if (code === "auth/invalid-credential") {
      return "E-Mail oder Passwort ist nicht korrekt.";
    }

    if (code === "auth/email-already-in-use") {
      return "Für diese E-Mail existiert bereits ein Account.";
    }

    if (code === "auth/weak-password") {
      return "Das Passwort muss mindestens 6 Zeichen lang sein.";
    }
  }

  return "Die Anmeldung konnte nicht abgeschlossen werden.";
}

export function AuthPanel() {
  const { refreshPlatformUser } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [formState, setFormState] =
    useState<AuthFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRegisterMode = mode === "register";

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        const credential =
          await createUserWithEmailAndPassword(
            auth,
            formState.email,
            formState.password
          );

        const trimmedDisplayName =
          formState.displayName.trim();

        if (trimmedDisplayName) {
          await updateProfile(credential.user, {
            displayName: trimmedDisplayName,
          });
        }

        await setDoc(
          doc(db, "users", credential.user.uid),
          {
            createdAt: serverTimestamp(),
            displayName:
              trimmedDisplayName ||
              credential.user.email,
            email: credential.user.email,
            role: "developer" satisfies UserRole,
            updatedAt: serverTimestamp(),
          }
        );

        await refreshPlatformUser(credential.user);
        return;
      }

      const credential =
        await signInWithEmailAndPassword(
          auth,
          formState.email,
          formState.password
        );

      await refreshPlatformUser(credential.user);
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(
    field: keyof AuthFormState,
    value: string
  ) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase text-primary">
              OpenWarnDE Platform
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-normal text-foreground sm:text-5xl">
              Zugang
            </h1>
            <p className="max-w-xl text-lg leading-8 text-foreground-muted">
              Melde dich mit deinem bestehenden Account an oder registriere dich
              fuer einen neuen Account.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 shadow-sm">
            <div className="mb-6 grid grid-cols-2 rounded-md bg-surface-muted p-1">
              <button
                className={`rounded px-3 py-2 text-sm font-semibold ${
                  mode === "login"
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-foreground-muted"
                }`}
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
              >
                Login
              </button>
              <button
                className={`rounded px-3 py-2 text-sm font-semibold ${
                  mode === "register"
                    ? "bg-surface text-foreground shadow-sm"
                    : "text-foreground-muted"
                }`}
                type="button"
                onClick={() => {
                  setMode("register");
                  setError(null);
                }}
              >
                Registrieren
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {isRegisterMode ? (
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-foreground">
                    Name
                  </span>
                  <input
                    className="w-full rounded-md border border-border px-3 py-2 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                    required
                    type="text"
                    value={formState.displayName}
                    onChange={(event) =>
                      updateField(
                        "displayName",
                        event.target.value
                      )
                    }
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-foreground">
                  E-Mail
                </span>
                <input
                  autoComplete="email"
                  className="w-full rounded-md border border-border px-3 py-2 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  required
                  type="email"
                  value={formState.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-foreground">
                  Passwort
                </span>
                <input
                  autoComplete={
                    isRegisterMode
                      ? "new-password"
                      : "current-password"
                  }
                  className="w-full rounded-md border border-border px-3 py-2 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  required
                  type="password"
                  value={formState.password}
                  onChange={(event) =>
                    updateField(
                      "password",
                      event.target.value
                    )
                  }
                />
              </label>

              {error ? (
                <p className="rounded-md border border-danger bg-danger-muted px-3 py-2 text-sm text-danger-text">
                  {error}
                </p>
              ) : null}

              <button
                className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting
                  ? "Bitte warten..."
                  : isRegisterMode
                    ? "Developer Account erstellen"
                    : "Einloggen"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}