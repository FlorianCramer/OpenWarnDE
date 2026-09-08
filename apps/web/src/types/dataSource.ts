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

export type DataSourceFormat =
  | "json"
  | "xml"
  | "geojson"
  | "rss"
  | "atom";

export type HttpMethod = "GET" | "POST";

export type GeographicCoverageType =
  | "point"
  | "bbox"
  | "polygon"
  | "country"
  | "unknown";

interface GeoJsonPoint {
  type: "Point";
  coordinates: [number, number];
}

interface GeoJsonPolygon {
  type: "Polygon";
  coordinates: [number, number][][];
}

interface GeoJsonMultiPolygon {
  type: "MultiPolygon";
  coordinates: [number, number][][][];
}

export type GeoJsonGeometry =
  | GeoJsonPoint
  | GeoJsonPolygon
  | GeoJsonMultiPolygon;

interface Endpoint {
  url: string;
  method: HttpMethod;
}

interface GeographicCoverage {
  type: GeographicCoverageType;
  geometry: GeoJsonGeometry | null;
}

interface Capabilities {
  realtime: boolean;
  historical: boolean;
  spatial: boolean;
}

export interface DataSource {
  id: string;
  name: string;
  description: string;
  type: DataSourceType;
  endpoint: Endpoint;
  format: DataSourceFormat;
  enabled: boolean;
  status: DataSourceStatus;
  refreshInterval: number;
  geographicCoverage: GeographicCoverage;
  capabilities: Capabilities;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastFetch: Timestamp | null;
  lastSuccess: Timestamp | null;
  errorMessage: string | null;
}

export type CreateDataSourceData = {
  name: string;
  description?: string;
  type: DataSourceType;
  endpoint: Endpoint;
  format: DataSourceFormat;
  enabled?: boolean;
  status?: DataSourceStatus;
  refreshInterval?: number;
  geographicCoverage?: GeographicCoverage;
  capabilities?: Capabilities;
};

export type UpdateDataSourceData = {
  name?: string;
  description?: string | null;
  type?: DataSourceType;
  endpoint?: Endpoint;
  format?: DataSourceFormat;
  enabled?: boolean;
  status?: DataSourceStatus;
  refreshInterval?: number;
  geographicCoverage?: GeographicCoverage;
  capabilities?: Capabilities;
  errorMessage?: string | null;
};
