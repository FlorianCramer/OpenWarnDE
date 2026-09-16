# Dokumentation

Übergeordnete Dokumentation für OpenWarnDE 2.0.

## Struktur

- [`definition.md`](definition.md) – Vollständige Architektur- und Repository-Definition
- [`firebase.md`](firebase.md) – Firebase-Konzept und -Setup
- [`school-project/`](school-project/) – Schulprojekt-bezogene Dokumentation

## Aktuelle Implementierungsdokumentation

Die laufende Implementierung folgt der Monorepo-Struktur aus `definition.md`:

- `apps/app` – eigenständige OpenWarnDE-App für Web und Capacitor
- `apps/web` – eigenständige Web Platform für Betreiber- und Entwicklerfunktionen
- `packages/ui` – gemeinsames UI-Package `@openwarnde/ui` für Komponenten und Design-Tokens
- `packages/map` – gemeinsame, frameworkfreie Deutschland-Geometrie für die Kartenadapter
- `packages/types` – gemeinsame Domänentypen
- `packages/validation` – gemeinsame Validierung
- `packages/config` – gemeinsame Laufzeit- und API-Konfiguration
- `packages/api-contract` – gemeinsame API-Verträge
- `services/` – vorgesehene serverseitige Service-Grenzen
- `tests/` und `scripts/` – repositoryweite Tests und Automatisierung

Die Apps bleiben getrennte Anwendungen. Gemeinsame UI- und Fachgrundlagen werden
über Packages bezogen; app-spezifische Laufzeitlogik, Plattformintegration und
Seiten bleiben innerhalb der jeweiligen App.
