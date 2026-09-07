"use client";

import * as React from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Polygon,
  useMap,
} from "react-leaflet";
import type {
  LatLngBoundsExpression,
  LatLngTuple,
  LeafletMouseEvent,
  LatLngExpression,
} from "leaflet";
import type {
  Feature,
  MultiPolygon,
  FeatureCollection,
  LineString,
  Position,
} from "geojson";
import simplify from "@turf/simplify";
import { lineString as turfLineString } from "@turf/helpers";
import "leaflet/dist/leaflet.css";

// ─── Coordinate System Convention ──────────────────────────────────────────────
//
// GeoJSON uses [longitude, latitude] (e.g. [13.4, 52.5] for Berlin).
// Leaflet uses [latitude, longitude] (e.g. [52.5, 13.4] for Berlin).
//
// All coordinates that come from the OSM API (GeoJSON) MUST be converted via
// toLatLng() before being passed to react-leaflet components.
//
// Hard-coded Leaflet coordinates (like WORLD_MASK_RING) are defined directly
// in [latitude, longitude] order.

// ─── Constants ─────────────────────────────────────────────────────────────────

const GERMANY_BOUNDS: LatLngBoundsExpression = [
  [47.0, 5.5],   // SW: lat=47, lon=5.5
  [55.5, 15.5],  // NE: lat=55.5, lon=15.5
];

const GERMANY_CENTER: LatLngTuple = [51.1657, 10.4515]; // [lat, lon]

const MIN_ZOOM = 5;
const MAX_ZOOM = 20;
const DEFAULT_ZOOM = 6;

const GERMANY_BORDER_COLOR = "#2563EB";
const DIMMED_COLOR = "#94A3B8";

const WORLD_MASK_RING: LatLngTuple[] = [
  [30, -30],   // SW: 30°N, 30°W
  [30, 75],    // SE: 30°N, 75°E
  [75, 75],    // NE: 75°N, 75°E
  [75, -30],   // NW: 75°N, 30°W
  [30, -30],   // close
];

/**
 * Simplification tolerance for the Germany boundary.
 *
 * 0.005 degrees ≈ 500m at this latitude. The OSM boundary has ~156,000
 * raw points; this brings it down to ~1,000 points. Visually identical
 * at the zoom levels the map supports (max 12), but renders reliably.
 */
const SIMPLIFY_TOLERANCE = 0.005;

// ─── Types ──────────────────────────────────────────────────────────────────────

interface GermanyMapProps {
  className?: string;
  height?: string;
  onRegionClick?: (region: string) => void;
  selectedRegion?: string | null;
}

interface BoundaryState {
  boundary: Feature<MultiPolygon> | null;
  loading: boolean;
  error: boolean;
  debug: string;
}

// ─── Hook: Load Germany Boundary from API ──────────────────────────────────────

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
        const response = await fetch("/api/germany-boundary");
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }

        const data = await response.json();

        if (cancelled) return;

        if (data?.error || !data?.geometry || data?.type !== "Feature") {
          throw new Error(data?.error ?? "Invalid GeoJSON response");
        }

        const geomType = data.geometry.type;
        const polyCount = data.geometry.coordinates?.length ?? 0;
        const debugInfo = `${geomType} (${polyCount} Polygone)`;
        setState({ boundary: data, loading: false, error: false, debug: debugInfo });
      } catch (err) {
        if (cancelled) return;
        console.warn("[GermanyMap] Failed to load boundary from API:", err);
        setState({ boundary: null, loading: false, error: true, debug: "" });
      }
    }

    void loadBoundary();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

// ─── Coordinate conversion ────────────────────────────────────────────────────

/**
 * Converts a single GeoJSON [lon, lat] position to a Leaflet [lat, lon] tuple.
 */
function geoJsonToLeaflet([lon, lat]: Position): LatLngTuple {
  return [lat, lon];
}

/**
 * Converts an array of GeoJSON positions to a Leaflet LatLngTuple array.
 */
function toLatLng(positions: Position[]): LatLngTuple[] {
  return positions.map(geoJsonToLeaflet);
}

/**
 * Simplifies a ring of positions using Turf's simplify algorithm.
 *
 * A 156,000-point boundary is reduced to ~1,000 visually-equivalent points.
 * Returns the original ring if simplification fails or result is invalid.
 */
function simplifyRing(ring: Position[]): Position[] {
  if (ring.length < 10) return ring;
  try {
    const line = turfLineString(ring);
    const simplified = simplify(line, {
      tolerance: SIMPLIFY_TOLERANCE,
      highQuality: false,
      mutate: false,
    });
    const coords = simplified.geometry.coordinates;
    if (coords.length >= 4) {
      // Re-close if needed
      const first = coords[0];
      const last = coords[coords.length - 1];
      if (first[0] !== last[0] || first[1] !== last[1]) {
        coords.push(first);
      }
      return coords;
    }
  } catch (e) {
    console.warn("[GermanyMap] Simplify failed, using original ring:", e);
  }
  return ring;
}

// ─── Build Border Lines ────────────────────────────────────────────────────────

function buildBorderLines(
  boundary: Feature<MultiPolygon> | null
): FeatureCollection<LineString> | null {
  if (!boundary) return null;

  const features: Feature<LineString>[] = [];

  for (const polygon of boundary.geometry.coordinates) {
    for (const ring of polygon) {
      if (ring.length > 0) {
        features.push({
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: ring,
          },
        });
      }
    }
  }

  return {
    type: "FeatureCollection",
    features,
  };
}

// ─── Build Gray Mask Polygon (as LatLng) ───────────────────────────────────────

/**
 * Builds the gray mask as a Leaflet Polygon positions array.
 *
 * The first element is the world-covering rectangle (outer ring).
 * Each subsequent element is a Germany outer ring (hole).
 * With `fillRule: "evenodd"`, the world area is filled with gray
 * while the Germany "holes" remain transparent, letting the OSM
 * tiles show through.
 *
 * Both the mainland ring AND any island rings are used as holes,
 * so the entire German territory (mainland + islands) is excluded
 * from the gray mask.
 *
 * The Germany hole coordinates come directly from the OSM boundary
 * (no manual approximation, no bounding boxes, no fallback geometry).
 */
function buildGrayMaskPositions(
  boundary: Feature<MultiPolygon> | null
): LatLngExpression[][] | null {
  if (!boundary) return null;

  // Each polygon in the MultiPolygon has its first ring as the outer ring.
  // These outer rings represent the German territory (mainland + islands).
  // All of them should be holes in the mask.
  const outerRingsGeoJson: Position[][] = [];
  for (const poly of boundary.geometry.coordinates) {
    if (poly.length > 0 && poly[0].length >= 4) {
      // Simplify the ring for performance — 156k points -> ~1k points
      const simplified = simplifyRing(poly[0]);
      outerRingsGeoJson.push(simplified);
    }
  }

  if (outerRingsGeoJson.length === 0) return null;

  // WORLD_MASK_RING is already in Leaflet format [lat, lon].
  // The Germany rings come from GeoJSON [lon, lat] and need conversion.
  return [
    WORLD_MASK_RING,
    ...outerRingsGeoJson.map(toLatLng),
  ];
}

// ─── MapController Component ───────────────────────────────────────────────────

function MapController({ bounds }: { bounds: LatLngBoundsExpression }) {
  const map = useMap();

  React.useEffect(() => {
    map.setMaxBounds(bounds);
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, bounds]);

  return null;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// PathOptions for the gray mask polygon (world rect with DE holes).
// fillRule: "evenodd" makes the holes transparent in SVG.
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

// PathOptions for the blue border lines.
const borderPathOptions = {
  color: GERMANY_BORDER_COLOR,
  weight: 3,
  opacity: 1,
  fill: false,
  interactive: true,
} as const;

// ─── Main Component ─────────────────────────────────────────────────────────────

export function GermanyMap({
  className = "",
  height = "400px",
  onRegionClick,
  selectedRegion: _selectedRegion,
}: GermanyMapProps) {
  const { boundary, loading, error, debug } = useGermanyBoundary();

  const grayMaskPositions = React.useMemo(
    () => buildGrayMaskPositions(boundary),
    [boundary]
  );
  const borderLines = React.useMemo(
    () => buildBorderLines(boundary),
    [boundary]
  );

  const handleBorderClick = (_e: LeafletMouseEvent) => {
    if (onRegionClick) {
      onRegionClick("Deutschland");
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-border ${className}`}
      style={{ height }}
    >
      <MapContainer
        center={GERMANY_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
        attributionControl={true}
        maxBounds={GERMANY_BOUNDS}
        maxBoundsViscosity={1.0}
        zoomSnap={0.5}
        wheelDebounceTime={20}
        wheelPxPerZoomLevel={120}
        preferCanvas={false}
      >
        {/* 1. Base OSM tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 2. Gray mask: world rectangle with Germany as holes.
            Rendered as a Leaflet <Polygon> (not <GeoJSON>) so the holes
            render reliably via fillRule: "evenodd".
            The mask covers the visible area with semi-transparent gray;
            the Germany "holes" let the OSM tiles show through. */}
        {grayMaskPositions && (
          <Polygon
            key="gray-mask"
            positions={grayMaskPositions}
            pathOptions={grayMaskPathOptions}
          />
        )}

        {/* 3. Germany border lines (over the mask) */}
        {borderLines && (
          <GeoJSON
            key="border-lines"
            data={borderLines}
            style={() => borderPathOptions}
            eventHandlers={{
              click: handleBorderClick,
            }}
          />
        )}

        <MapController bounds={GERMANY_BOUNDS} />
      </MapContainer>

      {/* Loading indicator */}
      {loading && (
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-surface-muted px-2 py-1 text-xs text-foreground-muted">
          Grenze wird geladen...
        </div>
      )}

      {/* Error indicator */}
      {error && !loading && (
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-red-500/90 px-2 py-1 text-xs text-white">
          Grenze nicht verfügbar
        </div>
      )}

      {/* Debug info */}
      {!loading && !error && boundary && (
        <div className="pointer-events-none absolute bottom-2 left-2 rounded bg-surface-muted px-2 py-1 text-xs text-foreground-muted">
          {debug}
        </div>
      )}
    </div>
  );
}
