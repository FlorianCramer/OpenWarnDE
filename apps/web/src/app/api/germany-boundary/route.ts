import { NextResponse } from "next/server";
import { fetchOverpassGermany, buildGermanyFeature } from "@/lib/osm-utils";

// Cache the response for 24 hours (in production, this is handled by Next.js ISR)
export const revalidate = 86400;

export const runtime = "nodejs";

export async function GET() {
  try {
    // Fetch from Overpass API
    const overpassData = await fetchOverpassGermany();

    // Build the GeoJSON Feature<MultiPolygon>
    const germanyFeature = buildGermanyFeature(overpassData);

    return NextResponse.json(germanyFeature, {
      status: 200,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("[germany-boundary] Overpass API failed:", error);

    // Do not fall back to a manual approximation — that would defeat the
    // whole point of loading the real OSM geometry. Instead, signal
    // unavailability so the client can show a graceful error state.
    return NextResponse.json(
      { error: "Boundary data unavailable" },
      {
        status: 503,
        headers: {
          "Cache-Control": "public, max-age=60",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
