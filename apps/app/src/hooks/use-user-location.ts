"use client";

import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { useCallback, useEffect, useRef, useState } from "react";

import {
	getLocationPermission,
	isLocationGranted,
	toLocationErrorMessage,
	type LocationPermission,
	type UserLocation,
} from "@/lib/user-location";

const WATCH_OPTIONS = {
	enableHighAccuracy: true,
	timeout: 15_000,
	maximumAge: 5_000,
	interval: 5_000,
	minimumUpdateInterval: 3_000,
};

export function useUserLocation() {
	const [location, setLocation] = useState<UserLocation | null>(null);
	const [permission, setPermission] = useState<LocationPermission>("prompt");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLocating, setIsLocating] = useState(false);
	const watchIdRef = useRef<string | null>(null);

	const clearWatch = useCallback(async () => {
		if (!watchIdRef.current) {
			return;
		}

		const id = watchIdRef.current;
		watchIdRef.current = null;

		try {
			await Geolocation.clearWatch({ id });
		} catch {
			// The native watch can already be gone after unmount or a permission change.
		}
	}, []);

	const startTracking = useCallback(async () => {
		setErrorMessage(null);
		setIsLocating(true);

		try {
			let currentPermission = await getLocationPermission();

			if (Capacitor.isNativePlatform() && currentPermission !== "granted") {
				const status = await Geolocation.requestPermissions({
					permissions: ["location"],
				});
				currentPermission = isLocationGranted(status)
					? "granted"
					: status.location === "denied"
						? "denied"
						: "prompt";
			}

			setPermission(currentPermission);

			if (currentPermission === "denied" || currentPermission === "unavailable") {
				setIsLocating(false);
				setErrorMessage(toLocationErrorMessage({ code: currentPermission === "denied" ? 1 : "OS-PLUG-GLOC-0007" }));
				return;
			}

			if (watchIdRef.current) {
				setIsLocating(false);
				return;
			}

			const id = await Geolocation.watchPosition(
				WATCH_OPTIONS,
				(position, error) => {
					if (error) {
						setIsLocating(false);
						setErrorMessage(toLocationErrorMessage(error));

						const code =
							typeof error === "object" && error !== null && "code" in error
								? (error as { code: unknown }).code
								: undefined;

						if (code === 1 || code === "OS-PLUG-GLOC-0003") {
							setPermission("denied");
							void clearWatch();
						}

						return;
					}

					if (!position) {
						return;
					}

					setPermission("granted");
					setIsLocating(false);
					setErrorMessage(null);
					setLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						accuracy: position.coords.accuracy,
						heading: position.coords.heading,
					});
				},
			);

			watchIdRef.current = id;
		} catch (error) {
			setIsLocating(false);
			setErrorMessage(toLocationErrorMessage(error));
		}
	}, [clearWatch]);

	useEffect(() => {
		let cancelled = false;

		void (async () => {
			const current = await getLocationPermission();

			if (cancelled) {
				return;
			}

			setPermission(current);

			if (current === "granted" || current === "prompt") {
				await startTracking();
			}

			if (current === "unavailable") {
				setErrorMessage(
					toLocationErrorMessage({ code: "OS-PLUG-GLOC-0007" }),
				);
			}
		})();

		return () => {
			cancelled = true;
			void clearWatch();
		};
	}, [clearWatch, startTracking]);

	return {
		location,
		permission,
		errorMessage,
		isLocating,
		startTracking,
	};
}
