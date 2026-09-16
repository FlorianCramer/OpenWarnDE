"use client";

import * as React from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Polygon,
  useMap,
} from "react-leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  buildBorderLines,
  buildGrayMaskPositions,
  GERMANY_BOUNDS,
  GERMANY_CENTER,
  isGermanyBoundary,
  type GermanyBoundary,
} from "@openwarnde/map";
import { apiConfig } from "@openwarnde/config";

// GeoJSON: [lon, lat], Leaflet: [lat, lon]. OSM coords converted via toLatLng().

const MIN_ZOOM = 5;
const MAX_ZOOM = 15;
const DEFAULT_ZOOM = 7;
const GERMANY_BORDER_COLOR = "#2563EB";
const DIMMED_COLOR = "#94A3B8";

interface GermanyMapProps {
  className?: string;
  height?: string;
  onRegionClick?: (region: string) => void;
  selectedRegion?: string | null;
}

interface BoundaryState {
  boundary: GermanyBoundary | null;
  loading: boolean;
  error: boolean;
  debug: string;
}

function useGermanyBoundary(): BoundaryState {
  const [state, setState] = React.useState<BoundaryState>({
    boundary: null,
    loading: true,
    error: false,
    debug: "",
  });

  React.useEffect(() => {
    let cancelled = false;

    async function loadBoundary() {
      try {
        const response = await fetch(apiConfig.germanyBoundaryPath);
        if (!response.ok) throw new Error(`API returned ${response.status}`);
        const data = await response.json();
        if (cancelled) return;
        if (!isGermanyBoundary(data)) {
          throw new Error(data?.error ?? "Invalid GeoJSON response");
        }
        const geomType = data.geometry.type;
        const polyCount = data.geometry.coordinates?.length ?? 0;
        setState({ boundary: data, loading: false, error: false, debug: `${geomType} (${polyCount} Polygone)` });
      } catch (err) {
        if (cancelled) return;
        console.warn("[GermanyMap] Failed to load boundary:", err);
        setState({ boundary: null, loading: false, error: true, debug: "" });
      }
    }

    void loadBoundary();
    return () => { cancelled = true; };
  }, []);

  return state;
}

function MapController({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap();
  React.useEffect(() => {
    map.setMaxBounds(bounds);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, bounds]);
  return null;
}

const grayMaskPathOptions = {
  fillColor: DIMMED_COLOR,
  fillOpacity: 0.5,
  color: "transparent",
  weight: 0,
  fill: true,
  fillRule: "evenodd" as const,
  stroke: false,
  interactive: false,
} as const;

const borderPathOptions = {
  color: GERMANY_BORDER_COLOR,
  weight: 3,
  opacity: 1,
  fill: false,
  interactive: true,
} as const;

export function GermanyMap({
  className = "",
  height = "400px",
  onRegionClick,
}: GermanyMapProps) {
  const { boundary, loading, error, debug } = useGermanyBoundary();
  const grayMaskPositions = React.useMemo(() => buildGrayMaskPositions(boundary), [boundary]);
  const borderLines = React.useMemo(() => buildBorderLines(boundary), [boundary]);

  const handleBorderClick = () => {
    onRegionClick?.("Deutschland");
  };

  return (
    <div className={`relative overflow-hidden rounded-lg border border-border ${className}`} style={{ height }}>
      <MapContainer
        center={GERMANY_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
        zoomControl
        attributionControl
        maxBounds={GERMANY_BOUNDS}
        maxBoundsViscosity={1.0}
        zoomSnap={0.5}
        wheelDebounceTime={20}
        wheelPxPerZoomLevel={120}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {grayMaskPositions && (
          <Polygon key="gray-mask" positions={grayMaskPositions} pathOptions={grayMaskPathOptions} />
        )}

        {borderLines && (
          <GeoJSON key="border-lines" data={borderLines} style={() => borderPathOptions} eventHandlers={{ click: handleBorderClick }} />
        )}

        <MapController bounds={GERMANY_BOUNDS} />
      </MapContainer>

      {loading && (
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-surface-muted px-2 py-1 text-xs text-foreground-muted">
          Grenze wird geladen...
        </div>
      )}

      {error && !loading && (
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-danger/90 px-2 py-1 text-xs text-danger-foreground">
          Grenze nicht verfügbar
        </div>
      )}

      {!loading && !error && boundary && (
        <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-surface-muted px-2 py-1 text-xs text-foreground-muted">
          {debug}
        </div>
      )}
    </div>
  );
}
