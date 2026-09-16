"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faInfo } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@openwarnde/ui";

type ErrorStateProps = {
  code: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  homeLabel?: string;
  details?: string;
};

export function ErrorState({
  code,
  title,
  description,
  actionLabel,
  onAction,
  homeLabel = "Zur Startseite",
  details,
}: ErrorStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6">
      <section
        className="w-full max-w-xl text-center"
        aria-labelledby="error-state-title"
      >
        {/* OpenWarnDE Branding */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-500">
            OpenWarnDE
          </p>
        </div>

        {/* Status / Error Code */}
        <div className="mb-8">
          <div
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-950"
            aria-hidden="true"
          >
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="h-12 w-12 text-red-700 dark:text-red-500"
            />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
            {code}
          </p>
        </div>

        {/* Error Message */}
        <div role="alert" aria-live="polite">
          <h1
            id="error-state-title"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          >
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {details && (
          <div className="mt-8 rounded-lg border border-border bg-surface p-6 text-left">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              Technische Fehlerdetails
            </h2>
            <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-100 p-3 font-mono text-xs leading-5 text-red-700 dark:bg-gray-900 dark:text-red-300">
              {details}
            </pre>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {onAction ? (
            <Button
              type="button"
              variant="danger"
              size="lg"
              onClick={onAction}
              className="sm:min-w-[160px]"
            >
              {actionLabel}
            </Button>
          ) : (
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-danger px-6 py-3 text-base font-semibold text-danger-foreground transition-colors hover:bg-danger-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-w-[160px]"
            >
              {actionLabel}
            </Link>
          )}

          {onAction && (
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-w-[160px]"
            >
              {homeLabel}
            </Link>
          )}
        </div>

        {/* Information */}
        <div className="mx-auto mt-10 max-w-md border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="flex items-start justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <FontAwesomeIcon
              icon={faInfo}
              className="mt-0.5 h-4 w-4 shrink-0"
            />

            <p>
              OpenWarnDE stellt aktuelle Warn- und
              Lageinformationen zentral bereit.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}