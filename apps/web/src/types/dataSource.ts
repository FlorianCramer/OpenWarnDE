import type { Timestamp } from "firebase/firestore";

export type DataSourceStatus =
  | "active"
  | "inactive"
  | "error"
  | "pending";

export type DataSourceType =
  | "dwd"
  | "pegel"
  | "weather"
  | "earthquake"
  | "custom";

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  url: string;
  description: string;
  status: DataSourceStatus;
  refreshInterval: number; // in minutes
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastFetch?: Timestamp | null;
  errorMessage?: string | null;
}

export type CreateDataSourceData = {
  name: string;
  type: DataSourceType;
  url: string;
  description?: string;
  refreshInterval?: number;
};

export type UpdateDataSourceData = {
  name?: string;
  type?: DataSourceType;
  url?: string;
  description?: string | null;
  status?: DataSourceStatus;
  refreshInterval?: number;
  errorMessage?: string | null;
};
