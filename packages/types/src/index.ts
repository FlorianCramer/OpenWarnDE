export type WarningSeverity = "low" | "moderate" | "high" | "severe" | "extreme";

export interface Warning {
  id: string;
  title: string;
  description: string;
  severity: WarningSeverity;
  regionIds: string[];
  issuedAt: string;
  validUntil?: string;
}

export interface Region {
  id: string;
  name: string;
  state?: string;
}