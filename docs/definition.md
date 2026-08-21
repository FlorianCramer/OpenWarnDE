# OpenWarn 2.0 – Projektgrundlage

**Status:** Entwurf / Planungsgrundlage  
**Projekt:** OpenWarn  
**Zweck:** Professioneller Neustart des bestehenden OpenWarnDEV-Projekts als strukturiertes Ausbildungs- und Portfolio-Projekt

---

## 1. Projektidee

OpenWarn ist eine modulare Warn-, Karten- und Lageinformationsplattform für Deutschland.

Das System soll öffentliche Warninformationen und perspektivisch einsatzrelevante Informationen zentral erfassen, verarbeiten, bewerten und für unterschiedliche Nutzergruppen bereitstellen.

Das neue Projekt soll nicht einfach eine Kopie des bestehenden `OpenWarnDEV` werden. Die bestehende Anwendung wird als **Vorprojekt / Prototyp / Wissensbasis** betrachtet. Aus den Erfahrungen der bisherigen Entwicklung soll eine sauber geplante und professionell strukturierte Version entstehen.

Ziel ist neben der Software selbst auch ein nachvollziehbarer professioneller Entwicklungsprozess:

> Anforderungsanalyse → Planung → Konzeption → Architektur → Umsetzung → Testing → Deployment → Dokumentation → Release → Retrospektive

Das Projekt dient gleichzeitig als persönliches Selbst-Ausbildungsprojekt und als langfristiges Portfolio-Projekt.

---

# 2. Ausgangssituation

Das bestehende Repository `OpenWarnDEV` enthält bereits eine umfangreiche technische Basis.

Dazu gehören unter anderem:

- Next.js
- React
- TypeScript
- Capacitor
- MapLibre GL JS
- Firebase Hosting
- Android / iOS
- Geolocation
- Karten- und 3D-Funktionen
- verschiedene geplante Datenquellen
- eine geplante Server-/Verarbeitungsschicht
- ein eigener Admin-Bereich
- umfangreiche Kartenanforderungen

Die bestehende Architektur beschreibt bereits eine Trennung zwischen Client, Server, Datenintegration, Warnlogik und Administration.

Die aktuelle Codebasis und Dokumentation sind jedoch historisch gewachsen. Anforderungen, technische Entscheidungen, Feature-Ideen und Implementierungsdetails sind teilweise vermischt.

Deshalb wird OpenWarn neu geplant.

---

# 3. Ziel des Neustarts

Der Neustart verfolgt folgende Ziele:

- klare Produktdefinition
- saubere Anforderungsanalyse
- professionelles Lastenheft
- professionelles Pflichtenheft
- nachvollziehbare Architektur
- klare Trennung der Verantwortlichkeiten
- sauberer Git- und GitHub-Workflow
- reproduzierbare Entwicklung
- automatisierte Qualitätssicherung
- dokumentierte Technologieentscheidungen
- sauberes Deployment
- nachvollziehbare Releases
- langfristig wartbare Codebasis

Die neue Version soll bewusst so entwickelt werden, wie ein reales Softwareprojekt strukturiert werden würde.

---

# 4. Grundprinzip

Die wichtigste Änderung gegenüber dem bisherigen Projekt ist die klare Trennung zwischen:

1. **OpenWarn App**
2. **OpenWarn Admin**
3. **OpenWarn Backend / Processing**

Diese drei Komponenten gehören zu einer gemeinsamen Plattform, haben aber unterschiedliche Verantwortlichkeiten.

---

# 5. Systemkontext

```text
                         OpenWarn Plattform
                                │
              ┌─────────────────┼─────────────────┐
              │                 │                 │
              ▼                 ▼                 ▼
        OpenWarn App      OpenWarn Admin     Backend Services
        /app              /admin             Verarbeitung
              │                 │                 │
              │                 │                 │
              │                 └───────┐         │
              │                         │         │
              │                         ▼         │
              │                  Konfiguration   │
              │                  Monitoring      │
              │                  Auswertung      │
              │                                   │
              │                         ┌─────────┘
              │                         ▼
              │                  Datenquellen
              │                  DWD / Pegel /
              │                  Wetter / weitere
              │                         │
              │                         ▼
              │                  Verarbeitung
              │                  Normalisierung
              │                  Bewertung
              │                  Aggregation
              │                         │
              └─────────────────────────┘
                         │
                         ▼
                  veröffentlichte Daten
```

---

# 6. OpenWarn App

## Zweck

Die App ist die Nutzeranwendung für die Öffentlichkeit und perspektivisch für Einsatzkräfte.

## Zielgruppen

- Bevölkerung
- Einsatzkräfte
- perspektivisch weitere berechtigte Nutzergruppen

## Plattformen

Die App soll als:

- Web-App
- Android-App
- iOS-App

bereitgestellt werden.

Für die nativen Plattformen wird Capacitor verwendet.

## Hauptaufgaben

- Kartenanzeige
- Darstellung veröffentlichter Warnungen
- Anzeige des Nutzerstandorts
- Darstellung relevanter Kartenlayer
- Anzeige von Warnungsdetails
- Push-Benachrichtigungen
- perspektivisch BOS-/Einsatzmodus
- perspektivisch weitere Lageinformationen

## Grundprinzip

Die App soll möglichst wenig komplexe Datenverarbeitung selbst durchführen.

Sie erhält bereits zentral aufbereitete Daten und konzentriert sich auf:

```text
Daten abrufen
    ↓
Daten darstellen
    ↓
Interaktion ermöglichen
```

Die App soll nicht für jeden Nutzer externe Datenquellen selbst abrufen und umfangreiche Warn- oder Risikoberechnungen durchführen.

---

# 7. OpenWarn Admin

## Zweck

Der Admin-Bereich ist die zentrale Verwaltungs-, Monitoring- und Auswertungsoberfläche von OpenWarn.

Er ist ausschließlich für autorisierte Betreiber / Administratoren vorgesehen.

Die geplante Rolle des Bereichs ist:

> **Control Plane der OpenWarn-Plattform**

## Aufgaben

Der Admin-Bereich soll langfristig unter anderem ermöglichen:

- Systemstatus überwachen
- Datenquellen verwalten
- Datenquellen aktivieren/deaktivieren
- Abrufintervalle konfigurieren
- Warnregeln konfigurieren
- Schwellwerte verwalten
- Regionen konfigurieren
- veröffentlichte Warnungen überwachen
- Nutzer verwalten
- Geräte verwalten
- Push-Versand überwachen
- Systemereignisse einsehen
- Datenqualität überwachen
- Warn- und Systemdaten auswerten
- Statistiken und Kennzahlen anzeigen
- Konfiguration zentral verwalten

## Wichtiger Grundsatz

Der Admin-Bereich ist **nicht selbst der Hintergrundprozess**.

Das System darf nicht davon abhängig sein, dass `/admin` geöffnet ist.

Stattdessen:

```text
Zeitgesteuerter Backend-Prozess
        ↓
Datenabruf
        ↓
Verarbeitung
        ↓
Speicherung
        ↓
Admin überwacht / konfiguriert
```

Der Admin ist somit die Kommandozentrale, nicht der eigentliche Worker.

---

# 8. OpenWarn Backend / Processing

Das Backend bildet die zentrale serverseitige Verarbeitungsschicht.

## Aufgaben

- Datenquellen abrufen
- Daten normalisieren
- Daten validieren
- Daten zusammenführen
- Regionen bestimmen
- Warnungen erzeugen
- Regeln anwenden
- Schwellenwerte prüfen
- Risikowerte berechnen
- Daten aggregieren
- veröffentlichte Daten erzeugen
- Push-Benachrichtigungen auslösen
- Systemstatus erfassen
- Daten für App und Admin bereitstellen

## Grundprinzip

Die zentrale Verarbeitung erfolgt serverseitig.

Beispiel:

```text
DWD
 │
Pegel
 │
Wetter
 │
weitere Quellen
 │
 ▼
Data Ingestion
 │
 ▼
Normalisierung
 │
 ▼
Validierung
 │
 ▼
Verarbeitung / Bewertung
 │
 ▼
Aggregation
 │
 ▼
Published Data
 │
 ├──────────────► OpenWarn App
 │
 └──────────────► OpenWarn Admin
```

---

# 9. Datenverarbeitung

Die Daten sollen konzeptionell in mehrere Stufen getrennt werden.

```text
RAW DATA
    ↓
NORMALIZED DATA
    ↓
PROCESSED DATA
    ↓
PUBLISHED DATA
```

## Raw Data

Originaldaten der externen Quelle.

Beispiele:

- DWD-Daten
- Pegeldaten
- Wetterdaten
- weitere externe Datenquellen

## Normalized Data

Die Daten werden in ein gemeinsames internes Format überführt.

Beispiel:

```json
{
  "source": "dwd",
  "event": "storm",
  "severity": 3,
  "validFrom": "...",
  "validUntil": "..."
}
```

## Processed Data

Mehrere Datenquellen und Regeln können zusammengeführt werden.

Beispiel:

```text
Warnung
+
Region
+
weitere Messwerte
+
Regeln
        ↓
Bewertung
```

## Published Data

Nur die für die App notwendigen, bereits aufbereiteten Informationen werden veröffentlicht.

Die App muss nicht wissen, wie das Ergebnis entstanden ist.

---

# 10. Intervallbasierte Verarbeitung

Die Datenverarbeitung soll zeitgesteuert erfolgen.

Beispiel:

```text
Alle X Minuten
       ↓
Processing Job
       ↓
Datenquellen abrufen
       ↓
Daten verarbeiten
       ↓
Ergebnisse speichern
       ↓
Published Data aktualisieren
       ↓
optional Push versenden
```

Das Intervall wird später je Datenquelle und Verarbeitungstyp festgelegt.

Nicht jede Datenquelle muss zwingend dasselbe Intervall verwenden.

---

# 11. Firebase als zentrale Plattform

Die grundsätzliche Infrastrukturidee ist:

> Ein gemeinsames Firebase-Projekt für die OpenWarn-Plattform mit mehreren Hosting-Zielen und zentralen Backend-Diensten.

Vorgesehene Struktur:

```text
Firebase Project
│
├── Hosting: App
│      └── OpenWarn App
│
├── Hosting: Admin
│      └── OpenWarn Admin
│
├── Authentication
│
├── Firestore / Datenhaltung
│
├── Cloud Functions / Backend Services
│
├── Scheduler / zeitgesteuerte Jobs
│
├── Cloud Messaging
│
└── weitere benötigte Firebase-Dienste
```

Die konkrete Auswahl und Nutzung der Firebase-Dienste wird erst in der Architektur- und Technologiephase final festgelegt.

Firebase ist dabei die Infrastrukturplattform und nicht automatisch gleichbedeutend mit der gesamten fachlichen Backend-Architektur.

---

# 12. Hosting

Die beiden Webanwendungen sollen getrennt bereitgestellt werden.

```text
Firebase Project
│
├── Hosting Target: app
│      └── OpenWarn App
│
└── Hosting Target: admin
       └── OpenWarn Admin
```

Die App besitzt zusätzlich Anforderungen für:

- Capacitor
- Android
- iOS
- native Builds

Der Admin ist ausschließlich als Web-Anwendung vorgesehen.

---

# 13. Repository-Struktur

Als Zielstruktur ist ein Monorepo vorgesehen.

Beispiel:

```text
openwarn/
│
├── apps/
│   ├── app/
│   │   ├── src/
│   │   ├── public/
│   │   └── ...
│   │
│   └── admin/
│       ├── src/
│       ├── public/
│       └── ...
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   └── ...
│
├── services/
│   ├── ingestion/
│   ├── processing/
│   ├── warnings/
│   └── ...
│
├── docs/
│   ├── 01-project/
│   ├── 02-requirements/
│   ├── 03-concept/
│   ├── 04-architecture/
│   ├── 05-development/
│   ├── 06-testing/
│   └── 07-operations/
│
├── tests/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE
```

Die endgültige Struktur wird erst nach der Architekturplanung festgelegt.

---

# 14. Gemeinsame Packages

Wenn App und Admin gemeinsame Bestandteile benötigen, sollen diese nicht doppelt implementiert werden.

Mögliche gemeinsame Packages:

```text
packages/
├── ui/
├── types/
├── config/
└── validation/
```

Beispiele:

- gemeinsame TypeScript-Typen
- API-Modelle
- Validierungsschemas
- Designsystem
- gemeinsame UI-Komponenten
- Konfigurationswerte

Dabei muss trotzdem darauf geachtet werden, dass App und Admin fachlich voneinander getrennt bleiben.

---

# 15. Sicherheitskonzept

Der Admin-Bereich ist hochsensibel.

Ziel:

> Ausschließlich autorisierte Personen dürfen administrative Funktionen ausführen.

Vorgesehene Rollenstruktur:

```text
PUBLIC
  │
  └── normale App-Nutzung

BOS_USER
  │
  └── zusätzliche Einsatzfunktionen

ADMIN
  │
  └── administrative Funktionen

OWNER
  │
  └── vollständige Systemverwaltung
```

Die genaue Rollen- und Berechtigungsstruktur wird im Sicherheitskonzept definiert.

Wichtig:

Clientseitige UI-Ausblendungen sind **keine Sicherheitsmaßnahme**.

Administrative Berechtigungen müssen serverseitig geprüft werden.

---

# 16. Datenzugriff

Die App soll grundsätzlich nur die Daten erhalten, die sie für ihre Funktion benötigt.

Beispiel:

```text
OpenWarn Backend
       ↓
Published Data
       ↓
OpenWarn App
```

Der Admin erhält zusätzliche Informationen:

```text
Backend
   ↓
Admin API / Admin Data
   ↓
OpenWarn Admin
```

Die App darf nicht automatisch Zugriff auf interne Rohdaten, Systemkonfigurationen oder administrative Informationen erhalten.

---

# 17. API-Grundidee

Die genaue API wird später spezifiziert.

Prinzipiell sind mindestens zwei fachliche Zugriffsbereiche denkbar:

```text
/api/v1/...
```

für öffentliche bzw. App-relevante Funktionen.

und:

```text
/api/v1/admin/...
```

für administrative Funktionen.

Beispiele:

```text
GET /api/v1/warnings
GET /api/v1/regions
GET /api/v1/status

GET /api/v1/admin/warnings
GET /api/v1/admin/sources
PUT /api/v1/admin/sources/{id}
GET /api/v1/admin/system
```

Die tatsächliche API-Struktur wird im Pflichtenheft und API-Konzept festgelegt.

---

# 18. GitHub und Entwicklungsprozess

Das neue Repository soll bewusst wie ein professionelles Softwareprojekt geführt werden.

## Grundworkflow

```text
Anforderung
    ↓
GitHub Issue
    ↓
Milestone
    ↓
Branch
    ↓
Implementierung
    ↓
Tests
    ↓
Pull Request
    ↓
Review
    ↓
Merge
```

## Branch-Konzept

Beispiele:

```text
main

feature/req-023-user-location
feature/req-042-warning-api
fix/map-rendering
refactor/data-processing
docs/architecture
```

## Commit-Konvention

Eine einheitliche Commit-Konvention soll festgelegt werden, beispielsweise Conventional Commits.

Beispiele:

```text
feat(app): add warning layer
fix(admin): correct warning filter
docs(requirements): add warning requirements
refactor(processing): separate normalization pipeline
test(api): add warning endpoint tests
```

---

# 19. GitHub Issues

Features und Anforderungen sollen nicht nur in Markdown-Dateien stehen.

Beispiel:

```text
[REQ-023] Nutzerstandort anzeigen
```

Das Issue enthält:

- Beschreibung
- Ziel
- Akzeptanzkriterien
- Priorität
- Verknüpfung zur Anforderung
- ggf. technische Hinweise

Dadurch entsteht eine nachvollziehbare Verbindung:

```text
Anforderung
    ↓
Issue
    ↓
Branch
    ↓
Pull Request
    ↓
Code
    ↓
Test
```

---

# 20. Dokumentationsstruktur

Die Dokumentation soll ein zentraler Bestandteil des Projekts sein.

Vorgesehene Struktur:

```text
docs/
│
├── 01-project/
│   ├── project-charter.md
│   ├── project-goals.md
│   ├── scope.md
│   └── roadmap.md
│
├── 02-requirements/
│   ├── requirements.md
│   ├── use-cases.md
│   ├── lastenheft.md
│   └── acceptance-criteria.md
│
├── 03-concept/
│   ├── pflichtenheft.md
│   ├── system-context.md
│   └── domain-model.md
│
├── 04-architecture/
│   ├── architecture.md
│   ├── backend.md
│   ├── app.md
│   ├── admin.md
│   ├── data-model.md
│   └── api.md
│
├── 05-development/
│   ├── coding-guidelines.md
│   ├── git-workflow.md
│   └── local-development.md
│
├── 06-testing/
│   ├── testing-strategy.md
│   └── test-plan.md
│
└── 07-operations/
    ├── deployment.md
    ├── monitoring.md
    ├── backup.md
    └── incident-management.md
```

Diese Struktur ist ein Vorschlag und wird im Projektverlauf angepasst.

---

# 21. Lastenheft

Das Lastenheft beschreibt primär:

> **Was soll das System leisten?**

Beispiel:

```text
REQ-001

Titel:
Anzeige aktueller Warninformationen

Beschreibung:
Das System soll dem Benutzer aktuelle öffentliche
Warninformationen für seinen relevanten Bereich anzeigen.

Priorität:
MUSS

Akteur:
Endbenutzer

Akzeptanzkriterium:
Eine verfügbare Warnung wird innerhalb der definierten
Aktualisierungszeit in der App dargestellt.
```

Technische Details gehören nicht unnötig in das Lastenheft.

---

# 22. Pflichtenheft

Das Pflichtenheft beschreibt:

> **Wie werden die Anforderungen technisch umgesetzt?**

Beispiel:

```text
REQ-001
   ↓
API Endpoint
   ↓
Published Warning Store
   ↓
Warning Service
   ↓
App Warning Layer
   ↓
Automatisierter Test
```

Damit entsteht eine nachvollziehbare Traceability zwischen Anforderungen, Architektur, Code und Tests.

---

# 23. MVP

Das Projekt soll nicht versuchen, sofort alle langfristigen Ideen umzusetzen.

Die aktuelle Featureliste enthält bereits sehr viele mögliche Erweiterungen.

Dazu gehören unter anderem:

- 3D-Brücken
- 3D-Bäume
- Vegetation
- 3D-Straßen
- Gewässeranimationen
- GTFS
- Flurstücke
- Hydranten
- Rettungspunkte
- Feuerwehrzufahrten
- Offline-Karten
- Satellitenansicht
- Tag-/Nachtzyklus
- weitere BOS-Layer

Diese Funktionen werden zunächst als Ideen / Anforderungen gesammelt und anschließend priorisiert.

Ein MVP soll nur die Funktionen enthalten, die für einen sinnvollen ersten Release wirklich notwendig sind.

---

# 24. Vorläufiger Entwicklungsablauf

## Phase 0 – Ist-Analyse

Analyse des bestehenden `OpenWarnDEV`:

- aktuelle Architektur
- App
- Admin
- Datenzugriffe
- Firebase
- Kartenlogik
- bestehende Services
- technische Schulden
- vorhandene Dokumentation
- bestehende Funktionen
- bisherige Entscheidungen

Ergebnis:

**Ist-Analyse des bestehenden Systems**

---

## Phase 1 – Produktvision

Definition:

- Was ist OpenWarn?
- Welches Problem wird gelöst?
- Wer nutzt das System?
- Welchen Nutzen bietet es?
- Was unterscheidet OpenWarn von bestehenden Lösungen?

Ergebnis:

**Projektvision / Projektsteckbrief**

---

## Phase 2 – Systemkontext

Definition der Systembestandteile:

```text
OpenWarn App
OpenWarn Admin
OpenWarn Backend
External Data Sources
Firebase Infrastructure
```

Ergebnis:

**Systemkontext und erste Architektur**

---

## Phase 3 – Anforderungsanalyse

Erfassung und Priorisierung von:

- funktionalen Anforderungen
- nichtfunktionalen Anforderungen
- Sicherheitsanforderungen
- Betriebsanforderungen
- Datenanforderungen
- App-Anforderungen
- Admin-Anforderungen
- Backend-Anforderungen

Ergebnis:

**Anforderungskatalog**

---

## Phase 4 – Lastenheft

Konsolidierung der Anforderungen.

Ergebnis:

**Lastenheft**

---

## Phase 5 – MVP und Roadmap

Definition:

- MVP
- Version 1.0
- spätere Versionen
- Muss / Soll / Kann
- technische Risiken

Ergebnis:

**Releaseplanung**

---

## Phase 6 – Pflichtenheft

Technische Umsetzung der Anforderungen.

Ergebnis:

**Pflichtenheft**

---

## Phase 7 – Architektur

Ausarbeitung von:

- Systemarchitektur
- Frontendarchitektur
- Adminarchitektur
- Backendarchitektur
- Datenmodell
- API
- Authentifizierung
- Autorisierung
- Datenverarbeitung
- Fehlerbehandlung
- Logging
- Monitoring

Ergebnis:

**Technisches Architekturkonzept**

---

## Phase 8 – Technologieentscheidungen

Erst jetzt werden Technologien endgültig festgelegt.

Mögliche Bereiche:

- Frontend
- Backend
- Datenbank
- Firebase-Dienste
- API
- Testing
- CI/CD
- Monitoring

Technologieentscheidungen werden dokumentiert und begründet.

---

## Phase 9 – Repository und GitHub

Einrichtung:

- Monorepo
- Branch-Konzept
- Issue Templates
- PR Templates
- Labels
- Milestones
- GitHub Actions
- Branch Protection
- Coding Guidelines
- Contribution Guidelines

---

## Phase 10 – Implementierung

Entwicklung nach:

```text
Issue
 ↓
Branch
 ↓
Implementierung
 ↓
Tests
 ↓
PR
 ↓
Review
 ↓
Merge
```

---

## Phase 11 – Qualitätssicherung

Geplant sind je nach Komponente:

- Unit Tests
- Integration Tests
- API Tests
- E2E Tests
- Linting
- Type Checking
- Build Checks
- Security Checks
- Performance Tests

---

## Phase 12 – Deployment

Automatisierte Bereitstellung von:

```text
OpenWarn App
OpenWarn Admin
Backend Services
```

über geeignete CI/CD-Prozesse.

---

## Phase 13 – Release

Vor einem Release:

- Tests
- Abnahme
- Dokumentation
- Changelog
- Versionsnummer
- Release Notes
- Deployment
- Monitoring

---

## Phase 14 – Retrospektive

Nach jedem größeren Release:

- Was lief gut?
- Was lief schlecht?
- Welche technischen Schulden sind entstanden?
- Welche Anforderungen haben sich geändert?
- Welche Entscheidungen müssen angepasst werden?
- Was wurde gelernt?

---

# 25. Architekturprinzipien

Für OpenWarn sollen folgende Prinzipien gelten:

### Separation of Concerns

App, Admin und Backend haben klar definierte Verantwortlichkeiten.

### Server-side Processing

Komplexe Datenverarbeitung erfolgt zentral.

### Client Simplicity

Die App erhält möglichst fertige, nutzbare Daten.

### Security by Design

Sicherheit wird bereits bei der Architektur berücksichtigt.

### Modularity

Neue Datenquellen, Warnmodelle und Kartenlayer sollen modular ergänzt werden können.

### Observability

Das Backend soll nachvollziehbar überwacht werden können.

### Testability

Komponenten sollen automatisiert testbar sein.

### Documentation

Architektur- und Technologieentscheidungen werden dokumentiert.

### Reproducibility

Das Projekt soll lokal und in CI reproduzierbar gebaut und getestet werden können.

---

# 26. Datenquellen

Die bisherige Planung enthält unter anderem:

- Wetterwarnungen
- Radar- und Niederschlagsdaten
- Hochwasserinformationen
- Pegeldaten
- Geländedaten
- Höhenmodelle
- Waldbrand-/Feuergefahreninformationen
- Infrastrukturinformationen
- OpenStreetMap
- Overpass API
- weitere öffentliche Datenquellen

Neue Datenquellen müssen vor Integration hinsichtlich:

- Verfügbarkeit
- Aktualisierungsintervall
- Lizenz
- Datenqualität
- Stabilität
- technischer Schnittstelle
- Fehlerverhalten

bewertet werden.

---

# 27. Datenqualität

Da OpenWarn sicherheitsrelevante Informationen darstellen kann, muss Datenqualität ausdrücklich berücksichtigt werden.

Für Datenquellen sollen unter anderem geprüft werden:

- Quelle erreichbar?
- Daten vollständig?
- Daten aktuell?
- Datenformat korrekt?
- Werte plausibel?
- Zeitstempel gültig?
- Geometrien gültig?
- Quelle zuletzt erfolgreich verarbeitet?

Fehlerhafte oder veraltete Daten dürfen nicht unkontrolliert als aktuelle Daten veröffentlicht werden.

---

# 28. Warnlogik

Die Warnlogik soll zentral stattfinden.

Grundprinzip:

```text
Input Data
    ↓
Validation
    ↓
Normalization
    ↓
Rules
    ↓
Thresholds
    ↓
Evaluation
    ↓
Warning
    ↓
Published Warning
```

Die genaue fachliche Warnlogik wird später separat spezifiziert.

---

# 29. Push-Benachrichtigungen

Push-Nachrichten sollen zentral ausgelöst werden.

Beispiel:

```text
Neue Warnung
    ↓
Backend erkennt relevante Änderung
    ↓
Regelprüfung
    ↓
Push-Entscheidung
    ↓
Firebase Cloud Messaging
    ↓
OpenWarn App
```

Die App muss die Warnung anschließend nicht selbst berechnen.

---

# 30. BOS-Modus

Ein spezieller Betriebsmodus für Einsatzkräfte ist vorgesehen.

Mögliche spätere Funktionen:

- Hydranten
- Löschwasserentnahmestellen
- Rettungspunkte
- Feuerwehrzufahrten
- Aufstellflächen
- Flurstücke
- Sammelplätze
- weitere einsatzrelevante Karteninformationen

Der BOS-Modus wird als eigener Funktionsbereich betrachtet und nicht mit der öffentlichen Nutzeroberfläche vermischt.

---

# 31. Langfristige Vision

Langfristig soll OpenWarn eine zentrale Plattform für:

- öffentliche Warninformationen
- Lageinformationen
- regionale Gefahrenbewertung
- Karteninformationen
- Einsatzunterstützung
- Datenaggregation
- Betreiberanalyse

werden.

Die Architektur soll deshalb von Beginn an Erweiterbarkeit ermöglichen, ohne dass jede neue Funktion das Gesamtsystem unnötig verkompliziert.

---

# 32. Abgrenzung

OpenWarn soll nicht von Anfang an versuchen:

- sämtliche deutschen Datenquellen abzudecken
- ein vollständiges Einsatzleitsystem zu ersetzen
- eine Leitstelle zu ersetzen
- sämtliche BOS-Systeme zu integrieren
- alle denkbaren Kartenfunktionen gleichzeitig umzusetzen
- komplexe Risikoalgorithmen ohne validierte Datenbasis bereitzustellen

Der genaue Scope wird im Lastenheft festgelegt.

---

# 33. Wichtigste Architekturentscheidung für den Neustart

Die zentrale Idee des neuen Projekts lautet:

> **OpenWarn ist eine zentrale Plattform. Die App ist der Client, der Admin-Bereich ist die Control Plane und das Backend verarbeitet die Daten zentral.**

Kurz:

```text
                         OPENWARN
                            │
              ┌───────────┼─────────────┐
              │             │               │
              ▼             ▼              ▼
             APP           ADMIN         BACKEND
              │             │               │
         Nutzerseite    Betreiberseite   Server
              │             │               │
              └───────────┴─────────────┘
                            │
                     zentrale Datenbasis
                            │
                     externe Datenquellen
```

---

# 34. Nächster Schritt

Noch keine Implementierung.

Als nächstes wird die bestehende `OpenWarnDEV`-Repository vollständig als **Ist-System** dokumentiert.

Daraus werden anschließend:

1. bestehende Funktionen
2. bestehende Architektur
3. technische Schulden
4. bestehende Datenquellen
5. bestehende App-Funktionen
6. bestehende Admin-Funktionen
7. bestehende Firebase-Struktur
8. gute Entscheidungen
9. schlechte bzw. überholte Entscheidungen
10. übernommene Anforderungen
11. verworfene Anforderungen

abgeleitet.

Danach beginnt die eigentliche Planung von **OpenWarn 2.0**.

---

# 35. Leitgedanke

OpenWarn 2.0 soll nicht nur ein funktionierendes Programm werden.

Es soll zeigen, dass ein angehender Fachinformatiker für Anwendungsentwicklung ein Softwareprojekt strukturiert planen, begründen, entwickeln, testen, betreiben und dokumentieren kann.

Das Ziel ist deshalb nicht:

> „Möglichst schnell fertig werden.“

Sondern:

> **„Ein technisch sinnvolles und professionell entwickeltes System bauen und dabei einen nachvollziehbaren Softwareentwicklungsprozess demonstrieren.“**