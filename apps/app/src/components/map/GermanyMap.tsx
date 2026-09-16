"use client";

import "leaflet/dist/leaflet.css";

import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import type { Map as LeafletMap, PathOptions } from "leaflet";
import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleExclamation,
	faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import {
	buildBorderLines,
	buildGrayMaskPositions,
	GERMANY_CENTER,
	isGermanyBoundary,
	type GermanyBoundary,
} from "@openwarnde/map";
import { apiConfig } from "@openwarnde/config";

import { Button } from "@openwarnde/ui";

import { useUserLocation } from "@/hooks/use-user-location";
import { USER_LOCATION_COLOR } from "@/lib/user-location";


export type MapLayer = {
	id: string;
	data: GeoJsonObject;
	style?: PathOptions;
};

type GermanyMapProps = {
	layers?: MapLayer[];
};

const emptyLayers: MapLayer[] = [];
const userLocationZoom = 14;

const userLocationIcon = L.divIcon({
	className: "ow-user-location",
	html: '<span class="ow-user-location__pulse"></span><span class="ow-user-location__dot"></span>',
	iconSize: [24, 24],
	iconAnchor: [12, 12],
});

export default function GermanyMap({ layers = emptyLayers }: GermanyMapProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<LeafletMap | null>(null);
	const layerGroupRef = useRef<L.LayerGroup | null>(null);
	const userAccuracyRef = useRef<L.Circle | null>(null);
	const userMarkerRef = useRef<L.Marker | null>(null);
	const didCenterOnUserRef = useRef(false);
	const [mapReady, setMapReady] = useState(false);
	const [boundary, setBoundary] = useState<GermanyBoundary | null>(null);

	const { location, errorMessage, isLocating, startTracking } =
		useUserLocation();

	useEffect(() => {
		let cancelled = false;

		void fetch(`${apiConfig.platformOrigin}${apiConfig.germanyBoundaryPath}`)
			.then((response) => {
				if (!response.ok) throw new Error(`Boundary request failed: ${response.status}`);
				return response.json();
			})
			.then((data: unknown) => {
				if (!cancelled && isGermanyBoundary(data)) setBoundary(data);
			})
			.catch(() => {
				if (!cancelled) setBoundary(null);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	useEffect(() => {
		const container = containerRef.current;

		if (!container || mapRef.current) {
			return;
		}

		const map = L.map(container, {
			center: GERMANY_CENTER,
			zoom: 6,
			minZoom: 5,
			maxZoom: 18,
			zoomControl: false,
		});

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
		L.control.zoom({ position: "bottomleft" }).addTo(map);

		mapRef.current = map;
		layerGroupRef.current = L.layerGroup().addTo(map);
		setMapReady(true);

		return () => {
			userAccuracyRef.current = null;
			userMarkerRef.current = null;
			layerGroupRef.current?.clearLayers();
			layerGroupRef.current = null;
			map.remove();
			mapRef.current = null;
		};
	}, []);

	useEffect(() => {
		const layerGroup = layerGroupRef.current;

		if (!layerGroup) {
			return;
		}

		layerGroup.clearLayers();
		if (boundary) {
			const mask = buildGrayMaskPositions(boundary);
			if (mask) {
				L.polygon(mask, {
					fillColor: "#94A3B8",
					fillOpacity: 0.5,
					color: "transparent",
					weight: 0,
					fillRule: "evenodd",
					interactive: false,
				}).addTo(layerGroup);
			}
			const border = buildBorderLines(boundary);
			if (border) {
				L.geoJSON(border, {
					style: { color: "#2563EB", weight: 3, fill: false },
				}).addTo(layerGroup);
			}
		}
		layers.forEach((layer) => {
			L.geoJSON(layer.data, { style: layer.style }).addTo(layerGroup);
		});
	}, [boundary, layers]);

	const centerOnUser = useCallback((animate: boolean) => {
		const map = mapRef.current;

		if (!map || !location) {
			return;
		}

		const nextView: [number, number] = [location.latitude, location.longitude];
		const nextZoom = Math.max(map.getZoom(), userLocationZoom);

		if (animate) {
			map.flyTo(nextView, nextZoom, { duration: 0.75 });
			return;
		}

		map.setView(nextView, nextZoom);
	}, [location]);

	useEffect(() => {
		const map = mapRef.current;

		if (!mapReady || !map || !location) {
			return;
		}

		const latLng: L.LatLngExpression = [location.latitude, location.longitude];

		if (!userAccuracyRef.current) {
			userAccuracyRef.current = L.circle(latLng, {
				radius: Math.max(location.accuracy, 20),
				color: USER_LOCATION_COLOR,
				weight: 1,
				opacity: 0.45,
				fillColor: USER_LOCATION_COLOR,
				fillOpacity: 0.12,
				interactive: false,
			}).addTo(map);
		} else {
			userAccuracyRef.current.setLatLng(latLng);
			userAccuracyRef.current.setRadius(Math.max(location.accuracy, 20));
		}

		if (!userMarkerRef.current) {
			userMarkerRef.current = L.marker(latLng, {
				icon: userLocationIcon,
				interactive: false,
				keyboard: false,
				zIndexOffset: 1000,
			})
				.bindTooltip("Dein Standort", {
					direction: "top",
					offset: [0, -10],
					opacity: 0.9,
				})
				.addTo(map);
		} else {
			userMarkerRef.current.setLatLng(latLng);
		}

		if (!didCenterOnUserRef.current) {
			didCenterOnUserRef.current = true;
			centerOnUser(true);
		}
	}, [centerOnUser, location, mapReady]);

	const handleLocate = () => {
		if (location) {
			centerOnUser(true);
			return;
		}

		didCenterOnUserRef.current = false;
		void startTracking();
	};

	return (
		<div className="relative h-full w-full">
			<div
				ref={containerRef}
				className="h-full w-full"
				aria-label="OpenStreetMap-Karte"
			/>

			<button
				type="button"
				className="ow-locate-button"
				onClick={handleLocate}
				disabled={isLocating && !location}
				aria-label="Auf meinen Standort zentrieren"
				title="Auf meinen Standort zentrieren"
			>
				<FontAwesomeIcon
					icon={faLocationCrosshairs}
					className={isLocating && !location ? "animate-pulse" : undefined}
				/>
			</button>

			{errorMessage && !location && (
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1100] p-4 sm:p-6">
					<div
						className="pointer-events-auto mx-auto max-w-lg rounded-lg border border-white/80 bg-surface/95 p-4 shadow-lg shadow-foreground/10 backdrop-blur-md"
						role="alert"
						aria-live="polite"
					>
						<p className="flex items-start gap-2 text-sm font-semibold text-foreground">
							<FontAwesomeIcon
								icon={faCircleExclamation}
								className="mt-0.5 h-4 w-4 shrink-0 text-red-700"
							/>
							Standort nicht verfügbar
						</p>
						<p className="mt-1 text-sm text-foreground-muted">{errorMessage}</p>
						<Button
							type="button"
							variant="outline"
							className="mt-3"
							onClick={() => {
								didCenterOnUserRef.current = false;
								void startTracking();
							}}
						>
							Erneut versuchen
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
