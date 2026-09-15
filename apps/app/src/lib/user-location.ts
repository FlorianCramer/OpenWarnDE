import { Geolocation } from "@capacitor/geolocation";
import type { PermissionStatus } from "@capacitor/geolocation";

export type LocationPermission = "granted" | "denied" | "prompt" | "unavailable";

export type UserLocation = {
	latitude: number;
	longitude: number;
	accuracy: number;
	heading: number | null;
};

export const USER_LOCATION_COLOR = "#2563EB";

export function isLocationGranted(status: PermissionStatus): boolean {
	return status.location === "granted" || status.coarseLocation === "granted";
}

export async function getLocationPermission(): Promise<LocationPermission> {
	try {
		const status = await Geolocation.checkPermissions();

		if (isLocationGranted(status)) {
			return "granted";
		}

		if (status.location === "denied") {
			return "denied";
		}

		return "prompt";
	} catch (error) {
		if (isLocationServicesDisabled(error)) {
			return "unavailable";
		}

		// Safari and some WebViews have no Permissions API for geolocation.
		return "prompt";
	}
}

export function toLocationErrorMessage(error: unknown): string {
	const code = getErrorCode(error);

	if (code === 1 || code === "OS-PLUG-GLOC-0003" || code === "OS-PLUG-GLOC-0008") {
		return "Der Standortzugriff wurde verweigert. Du kannst die Berechtigung in den Einstellungen des Browsers oder Geräts ändern.";
	}

	if (code === 2 || code === "OS-PLUG-GLOC-0002" || code === "OS-PLUG-GLOC-0017") {
		return "Dein Standort ist derzeit nicht verfügbar. Prüfe, ob die Standortdienste aktiviert sind.";
	}

	if (code === 3 || code === "OS-PLUG-GLOC-0010") {
		return "Die Standortbestimmung hat zu lange gedauert. Bitte versuche es erneut.";
	}

	if (
		code === "OS-PLUG-GLOC-0007" ||
		code === "OS-PLUG-GLOC-0009" ||
		code === "OS-PLUG-GLOC-0016" ||
		isLocationServicesDisabled(error)
	) {
		return "Die Standortdienste sind deaktiviert. Bitte aktiviere sie in den Geräteeinstellungen.";
	}

	if (code === "OS-PLUG-GLOC-0018") {
		return "Die Standortberechtigungen fehlen in der App-Konfiguration.";
	}

	return "Dein Standort konnte nicht ermittelt werden. Bitte versuche es erneut.";
}

function isLocationServicesDisabled(error: unknown): boolean {
	const message = getErrorMessage(error).toLowerCase();
	return (
		message.includes("location services") ||
		message.includes("not enabled") ||
		message.includes("disabled")
	);
}

function getErrorCode(error: unknown): number | string | undefined {
	if (typeof error !== "object" || error === null || !("code" in error)) {
		return undefined;
	}

	const code = (error as { code: unknown }).code;

	if (typeof code === "number" || typeof code === "string") {
		return code;
	}

	return undefined;
}

function getErrorMessage(error: unknown): string {
	if (error instanceof Error) {
		return error.message;
	}

	if (typeof error === "object" && error !== null && "message" in error) {
		return String((error as { message: unknown }).message);
	}

	return "";
}
