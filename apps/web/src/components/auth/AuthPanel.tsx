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
    <main className="min-h-screen bg-[#f6f7f9] text-[#172033]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase text-[#1d6f8f]">
              OpenWarnDE Platform
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-normal text-[#101827] sm:text-5xl">
              Zugang
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#4d5b6d]">
              Melde dich mit deinem bestehenden Account an oder registriere dich
              fuer einen neuen Account.
            </p>
          </div>

          <div className="rounded-lg border border-[#dfe5ec] bg-white p-6 shadow-sm">
            <div className="mb-6 grid grid-cols-2 rounded-md bg-[#eef2f5] p-1">
              <button
                className={`rounded px-3 py-2 text-sm font-semibold ${
                  mode === "login"
                    ? "bg-white text-[#172033] shadow-sm"
                    : "text-[#5d6878]"
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
                    ? "bg-white text-[#172033] shadow-sm"
                    : "text-[#5d6878]"
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
                  <span className="mb-1 block text-sm font-medium text-[#334155]">
                    Name
                  </span>
                  <input
                    className="w-full rounded-md border border-[#cfd8e3] px-3 py-2 text-[#101827] outline-none transition focus:border-[#1d6f8f] focus:ring-2 focus:ring-[#1d6f8f]/15"
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
                <span className="mb-1 block text-sm font-medium text-[#334155]">
                  E-Mail
                </span>
                <input
                  autoComplete="email"
                  className="w-full rounded-md border border-[#cfd8e3] px-3 py-2 text-[#101827] outline-none transition focus:border-[#1d6f8f] focus:ring-2 focus:ring-[#1d6f8f]/15"
                  required
                  type="email"
                  value={formState.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-[#334155]">
                  Passwort
                </span>
                <input
                  autoComplete={
                    isRegisterMode
                      ? "new-password"
                      : "current-password"
                  }
                  className="w-full rounded-md border border-[#cfd8e3] px-3 py-2 text-[#101827] outline-none transition focus:border-[#1d6f8f] focus:ring-2 focus:ring-[#1d6f8f]/15"
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
                <p className="rounded-md border border-[#f0b7b7] bg-[#fff1f1] px-3 py-2 text-sm text-[#9b1c1c]">
                  {error}
                </p>
              ) : null}

              <button
                className="w-full rounded-md bg-[#184e63] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#123e4f] disabled:cursor-not-allowed disabled:bg-[#8aa5b0]"
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
