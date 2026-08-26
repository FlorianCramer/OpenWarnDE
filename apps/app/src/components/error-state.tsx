"use client";

import Link from "next/link";
import { Button } from "flowbite-react";

type ErrorStateProps = {
  code: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  homeLabel?: string;
};

export function ErrorState({
  code,
  title,
  description,
  actionLabel,
  onAction,
  homeLabel = "Zur Startseite",
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
            <svg
              className="h-12 w-12 text-red-700 dark:text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
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

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {onAction ? (
            <Button
              type="button"
              color="failure"
              size="lg"
              onClick={onAction}
              className="sm:min-w-[160px]"
            >
              {actionLabel}
            </Button>
          ) : (
            <Button
              as={Link}
              href="/"
              color="failure"
              size="lg"
              className="sm:min-w-[160px]"
            >
              {actionLabel}
            </Button>
          )}

          {onAction && (
            <Button
              as={Link}
              href="/"
              color="light"
              size="lg"
              className="sm:min-w-[160px]"
            >
              {homeLabel}
            </Button>
          )}
        </div>

        {/* Information */}
        <div className="mx-auto mt-10 max-w-md border-t border-gray-200 pt-6 dark:border-gray-800">
          <div className="flex items-start justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

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