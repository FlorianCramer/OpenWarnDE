"use client";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";

export function AccessProblem() {
  const { user, profileError } = useAuth();
  const expectedPath = user
    ? `users/${user.uid}`
    : "users/<uid>";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f7f9] px-5 text-[#172033]">
      <section className="w-full max-w-xl rounded-lg border border-[#dfe5ec] bg-white p-6 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase text-[#a15c00]">
          Zugriff nicht eingerichtet
        </p>
        <h1 className="mb-3 text-2xl font-bold">
          Kein Plattformprofil gefunden
        </h1>
        <p className="mb-5 text-sm leading-6 text-[#4d5b6d]">
          Dein Firebase Auth Account existiert, aber in Firestore fehlt das
          passende Dokument unter users/&lt;uid&gt; oder die Rolle ist nicht
          gueltig.
        </p>
        <div className="mb-5 space-y-2 rounded-md border border-[#dfe5ec] bg-[#f8fafc] p-3 text-sm text-[#334155]">
          <p>
            <span className="font-semibold">
              Erwarteter Firestore-Pfad:
            </span>{" "}
            <span className="break-all font-mono">
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
              <span className="break-all">
                {profileError}
              </span>
            </p>
          ) : null}
        </div>
        <button
          className="rounded-md bg-[#184e63] px-4 py-2 text-sm font-semibold text-white hover:bg-[#123e4f]"
          type="button"
          onClick={() => void signOut(auth)}
        >
          Abmelden
        </button>
      </section>
    </main>
  );
}
