import type { Feature, MultiPolygon, Position } from "geojson";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { point as turfPoint, polygon as turfPolygon } from "@turf/helpers";

// ─── Overpass API Types ────────────────────────────────────────────────────────

export interface OverpassElementBase {
  type: "node" | "way" | "relation";
  id: number;
}

export interface OverpassNode extends OverpassElementBase {
  type: "node";
  lat: number;
  lon: number;
}

export interface OverpassWay extends OverpassElementBase {
  type: "way";
  nodes: number[];
  geometry?: { lat: number; lon: number }[];
}

export interface OverpassRelationMember {
  type: "node" | "way" | "relation";
  ref: number;
  role: string;
}

export interface OverpassRelation extends OverpassElementBase {
  type: "relation";
  members: OverpassRelationMember[];
  tags?: Record<string, string>;
}

export interface OverpassResponse {
  version: number;
  generator: string;
  elements: (OverpassNode | OverpassWay | OverpassRelation)[];
}

// ─── Overpass Query ────────────────────────────────────────────────────────────

export const GERMANY_OVERPASS_QUERY = `
[out:json][timeout:120];
relation(51477);
out body;
>;
out geom;
`;

// ─── Geometry Helpers ─────────────────────────────────────────────────────────

/**
 * Builds a coordinate map from all ways' geometries.
 * node-id -> [lon, lat]
 */
function buildNodeCoordinateMap(
  ways: OverpassWay[]
): Map<number, Position> {
  const nodeMap = new Map<number, Position>();
  for (const way of ways) {
    if (!way.geometry) continue;
    for (let i = 0; i < way.nodes.length && i < way.geometry.length; i++) {
      nodeMap.set(way.nodes[i], [way.geometry[i].lon, way.geometry[i].lat]);
    }
  }
  return nodeMap;
}

/**
 * Converts a node-id chain to positions, closes the ring, and validates.
 * Returns null if the ring is invalid (< 4 positions).
 */
function chainToRing(
  nodeIds: number[],
  nodeMap: Map<number, Position>
): Position[] | null {
  if (nodeIds.length < 4) return null;
  const positions: Position[] = [];
  for (const nodeId of nodeIds) {
    const coord = nodeMap.get(nodeId);
    if (coord) positions.push(coord);
  }
  if (positions.length < 4) return null;

  const first = positions[0];
  const last = positions[positions.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) {
    positions.push(first);
  }
  return positions;
}

/**
 * Builds a closed ring from a list of way references by walking the relation
 * members in order, connecting ways through shared node-ids.
 *
 * The relation members are typically ordered such that consecutive ways share
 * a common node-id (forming a continuous chain). This function walks through
 * the chain, connecting ways that share endpoints, and forming a single closed
 * ring.
 *
 * Returns the ring as a Position[] (closed, with first === last), or null if
 * no closed ring could be formed.
 */
function buildRingFromRelationOrder(
  refs: number[],
  wayMap: Map<number, OverpassWay>,
  nodeMap: Map<number, Position>,
  usedWayIds: Set<number>
): Position[] | null {
  if (refs.length === 0) return null;

  // Find the first unused way to start the chain
  let startRef: number | null = null;
  for (const ref of refs) {
    if (!usedWayIds.has(ref) && wayMap.has(ref)) {
      startRef = ref;
      break;
    }
  }
  if (startRef === null) return null;

  const startWay = wayMap.get(startRef)!;
  if (!startWay.nodes || startWay.nodes.length < 2) {
    usedWayIds.add(startRef);
    return null;
  }

  const chain: number[] = [...startWay.nodes];
  usedWayIds.add(startRef);

  let extended = true;
  let safety = 0;
  const maxIterations = refs.length * 2;

  while (extended && safety < maxIterations) {
    safety++;
    extended = false;

    const tailNode = chain[chain.length - 1];
    const headNode = chain[0];

    for (const ref of refs) {
      if (usedWayIds.has(ref)) continue;
      const way = wayMap.get(ref);
      if (!way || !way.nodes || way.nodes.length < 2) continue;

      const ws = way.nodes[0];
      const we = way.nodes[way.nodes.length - 1];

      // Extend at tail
      if (ws === tailNode) {
        chain.push(...way.nodes.slice(1));
        usedWayIds.add(ref);
        extended = true;
        break;
      } else if (we === tailNode) {
        chain.push(...[...way.nodes].reverse().slice(1));
        usedWayIds.add(ref);
        extended = true;
        break;
      }
      // Extend at head
      else if (ws === headNode) {
        chain.unshift(...way.nodes.slice(1));
        usedWayIds.add(ref);
        extended = true;
        break;
      } else if (we === headNode) {
        chain.unshift(...[...way.nodes].reverse().slice(1));
        usedWayIds.add(ref);
        extended = true;
        break;
      }
    }
  }

  return chainToRing(chain, nodeMap);
}

/**
 * Builds closed rings from OSM way references.
 *
 * For each connection component (typically one for the main boundary),
 * walks through the ways in relation-order to form a closed ring.
 *
 * Returns an array of closed rings.
 */
function buildRingsFromWays(
  refs: number[],
  wayMap: Map<number, OverpassWay>,
  nodeMap: Map<number, Position>
): Position[][] {
  const usedWayIds = new Set<number>();
  const rings: Position[][] = [];

  // First pass: try to build a single large ring from relation-order chaining
  const mainRing = buildRingFromRelationOrder(
    refs,
    wayMap,
    nodeMap,
    usedWayIds
  );
  if (mainRing) {
    rings.push(mainRing);
  }

  // Second pass: handle any remaining ways (closed ways, isolated segments)
  // This handles self-closed ways (first node === last node)
  for (const ref of refs) {
    if (usedWayIds.has(ref)) continue;
    const way = wayMap.get(ref);
    if (!way || !way.nodes || way.nodes.length < 4) continue;

    // Check if the way is already closed
    if (way.nodes[0] === way.nodes[way.nodes.length - 1]) {
      const ring = chainToRing(way.nodes, nodeMap);
      if (ring) {
        rings.push(ring);
        usedWayIds.add(ref);
      }
    }
  }

  return rings;
}

// ─── Inner Ring Assignment ────────────────────────────────────────────────────

/**
 * Assigns inner rings (holes) to the outer ring that contains them.
 *
 * Uses Turf's booleanPointInPolygon with a sample point from each inner ring
 * to determine which outer ring it belongs to.
 */
function assignInnerRingsToOuters(
  outerRings: Position[][],
  innerRings: Position[][]
): Position[][][] {
  if (outerRings.length === 0) return [];

  const polygons: Position[][][] = [];

  for (const outerRing of outerRings) {
    const outerPolygon = turfPolygon([outerRing]);
    const assignedInners: Position[][] = [];

    for (const innerRing of innerRings) {
      if (innerRing.length < 4) continue;

      const sampleIndex = Math.floor(innerRing.length / 2);
      const sampleCoord = innerRing[sampleIndex];
      const testPoint = turfPoint(sampleCoord);

      if (booleanPointInPolygon(testPoint, outerPolygon, { ignoreBoundary: true })) {
        assignedInners.push(innerRing);
      }
    }

    polygons.push([outerRing, ...assignedInners]);
  }

  return polygons;
}

// ─── Build Germany Feature ────────────────────────────────────────────────────

/**
 * Takes a parsed Overpass response and builds a GeoJSON Feature<MultiPolygon>
 * representing the Germany administrative boundary.
 *
 * The Germany relation is typically a single connected ring with possibly
 * some inner holes. We use a relation-order chaining approach to walk
 * through the ways in their natural order, producing the main ring.
 *
 * Inner rings (holes) are assigned to their containing outer ring.
 */
export function buildGermanyFeature(
  response: OverpassResponse
): Feature<MultiPolygon> {
  const relation = response.elements.find(
    (e): e is OverpassRelation => e.type === "relation"
  );
  if (!relation) {
    throw new Error("No relation found in Overpass response");
  }

  const allWays = response.elements.filter(
    (e): e is OverpassWay => e.type === "way"
  );
  const wayMap = new Map<number, OverpassWay>();
  for (const way of allWays) {
    wayMap.set(way.id, way);
  }

  const nodeMap = buildNodeCoordinateMap(allWays);

  // Group members by role
  const outerMemberRefs: number[] = [];
  const innerMemberRefs: number[] = [];

  for (const member of relation.members) {
    if (member.type !== "way") continue;
    const role = member.role || "outer";
    if (role === "outer") {
      outerMemberRefs.push(member.ref);
    } else if (role === "inner") {
      innerMemberRefs.push(member.ref);
    }
  }

  // Build outer rings by walking through ways in relation-order
  const outerRings = buildRingsFromWays(outerMemberRefs, wayMap, nodeMap);

  // Build inner rings (holes)
  const innerRings = buildRingsFromWays(innerMemberRefs, wayMap, nodeMap);

  // Assign inner rings to their containing outer rings
  const polygons = assignInnerRingsToOuters(outerRings, innerRings);

  if (polygons.length === 0) {
    throw new Error("Failed to build any valid polygons from Overpass ways");
  }

  return {
    type: "Feature",
    properties: {
      name: "Deutschland",
      source: "OpenStreetMap",
      osmRelationId: relation.id,
    },
    geometry: {
      type: "MultiPolygon",
      coordinates: polygons,
    },
  };
}

// ─── Fetch Overpass API ────────────────────────────────────────────────────────

const OVERPASS_API_URL = "https://overpass-api.de/api/interpreter";

export async function fetchOverpassGermany(): Promise<OverpassResponse> {
  const response = await fetch(OVERPASS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "OpenWarnDE-Platform/1.0 (https://openwarnde.de)",
    },
    body: `data=${encodeURIComponent(GERMANY_OVERPASS_QUERY)}`,
  });

  if (!response.ok) {
    throw new Error(
      `Overpass API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as OverpassResponse;

  if (!data.elements || data.elements.length === 0) {
    throw new Error("Overpass returned empty response");
  }

  return data;
}
