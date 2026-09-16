import type {
  Feature,
  FeatureCollection,
  LineString,
  MultiPolygon,
  Position,
} from "geojson";

export type LatLngTuple = [number, number];
export type GermanyBoundary = Feature<MultiPolygon>;

export const GERMANY_CENTER: LatLngTuple = [51.1657, 10.4515];
export const GERMANY_BOUNDS: [LatLngTuple, LatLngTuple] = [
  [47, 5.5],
  [55.5, 15.5],
];

const WORLD_MASK_RING: LatLngTuple[] = [
  [30, -30],
  [30, 75],
  [75, 75],
  [75, -30],
  [30, -30],
];

export function isGermanyBoundary(value: unknown): value is GermanyBoundary {
  if (!value || typeof value !== "object") return false;
  const feature = value as Partial<GermanyBoundary>;
  return feature.type === "Feature" && feature.geometry?.type === "MultiPolygon";
}

function toLatLng([longitude, latitude]: Position): LatLngTuple {
  return [latitude, longitude];
}

export function buildBorderLines(
  boundary: GermanyBoundary | null,
): FeatureCollection<LineString> | null {
  if (!boundary) return null;
  const features: Feature<LineString>[] = [];

  for (const polygon of boundary.geometry.coordinates) {
    for (const ring of polygon) {
      if (ring.length > 0) {
        features.push({
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates: ring },
        });
      }
    }
  }

  return { type: "FeatureCollection", features };
}

export function buildGrayMaskPositions(
  boundary: GermanyBoundary | null,
): LatLngTuple[][] | null {
  if (!boundary) return null;
  const outerRings: LatLngTuple[][] = [];

  for (const polygon of boundary.geometry.coordinates) {
    const outerRing = polygon[0];
    if (outerRing && outerRing.length >= 4) {
      outerRings.push(outerRing.map(toLatLng));
    }
  }

  return outerRings.length > 0 ? [WORLD_MASK_RING, ...outerRings] : null;
}