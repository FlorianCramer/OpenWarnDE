import type { Region, Warning } from "@openwarnde/types";

export interface ApiMeta {
  requestId: string;
  generatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiErrorResponse {
  error: { code: string; message: string };
  meta: Pick<ApiMeta, "requestId">;
}

export type WarningsResponse = ApiResponse<Warning[]>;
export type RegionsResponse = ApiResponse<Region[]>;