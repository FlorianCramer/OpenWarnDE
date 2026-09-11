"use client";

import "leaflet/dist/leaflet.css";

import type { GeoJsonObject } from "geojson";
import L from "leaflet";
import type { Map as LeafletMap, PathOptions } from "leaflet";
import { useEffect, useRef } from "react";

export type MapLayer = {
	id: string;
	data: GeoJsonObject;
	style?: PathOptions;
};

type GermanyMapProps = {
	layers?: MapLayer[];
};

const germanyCenter: [number, number] = [51.1657, 10.4515];
const emptyLayers: MapLayer[] = [];

export default function GermanyMap({ layers = emptyLayers }: GermanyMapProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<LeafletMap | null>(null);
	const layerGroupRef = useRef<L.LayerGroup | null>(null);

	useEffect(() => {
		const container = containerRef.current;

		if (!container || mapRef.current) {
			return;
		}

		const map = L.map(container, {
			center: germanyCenter,
			zoom: 6,
			minZoom: 5,
			maxZoom: 18,
			zoomControl: false,
		});

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
		L.control.zoom({ position: "bottomright" }).addTo(map);

		mapRef.current = map;
		layerGroupRef.current = L.layerGroup().addTo(map);

		return () => {
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
		layers.forEach((layer) => {
			L.geoJSON(layer.data, { style: layer.style }).addTo(layerGroup);
		});
	}, [layers]);

	return (
		<div
			ref={containerRef}
			className="h-full w-full"
			aria-label="OpenStreetMap-Karte"
		/>
	);
}