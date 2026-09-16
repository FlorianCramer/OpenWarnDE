import type { Warning, WarningSeverity } from "@openwarnde/types";

const severities: WarningSeverity[] = ["low", "moderate", "high", "severe", "extreme"];

export function isWarning(value: unknown): value is Warning {
  if (!value || typeof value !== "object") return false;
  const warning = value as Partial<Warning>;
  return (
    typeof warning.id === "string" &&
    typeof warning.title === "string" &&
    typeof warning.description === "string" &&
    typeof warning.severity === "string" &&
    severities.includes(warning.severity as WarningSeverity) &&
    Array.isArray(warning.regionIds) &&
    typeof warning.issuedAt === "string"
  );
}