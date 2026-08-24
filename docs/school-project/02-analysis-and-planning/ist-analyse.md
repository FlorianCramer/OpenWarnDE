# Ist-Analyse – OpenWarnDEV

**Projekt:** OpenWarnDE 2.0  
**Ausgangssystem:** OpenWarnDEV  
**Repository:** https://github.com/FlorianCramer/OpenWarnDEV  
**Analyseziel:** Erfassung des bestehenden technischen und fachlichen Zustands als Grundlage für die Neukonzeption von OpenWarnDE 2.0

---

## 1. Zweck der Ist-Analyse

Diese Ist-Analyse beschreibt den aktuellen Zustand des bestehenden Projekts **OpenWarnDEV**.

Sie dient als Grundlage für die weitere Planung von **OpenWarnDE 2.0**. Dabei sollen vorhandene Funktionen, Technologien, Strukturen und bereits getroffene Entscheidungen erfasst sowie erkennbare Schwachstellen und technische Schulden identifiziert werden.

OpenWarnDEV wird dabei als **Vorprojekt, Prototyp und Wissensbasis** betrachtet. Eine direkte Übernahme der bestehenden Struktur in OpenWarnDE 2.0 ist nicht vorgesehen.

Die Analyse bildet die Grundlage für:

- die Anforderungsanalyse
- die Soll-Definition
- den Soll-/Ist-Vergleich
- die Architekturplanung
- den Variantenvergleich
- die Definition des MVP

---

## 2. Ausgangssituation

OpenWarnDEV ist eine bestehende Warn-, Karten- und Lageinformationsanwendung.

Das Projekt verfolgt bereits die Idee, öffentliche Gefährdungs- und Warninformationen zentral bereitzustellen und diese über eine Kartenansicht für verschiedene Nutzergruppen zugänglich zu machen.

Die bestehende Anwendung enthält bereits wesentliche technische Grundlagen für:

- Webanwendung
- mobile Anwendungen
- interaktive Karten
- Standortbestimmung
- Warnungsdarstellung
- Push-Benachrichtigungen
- 3D-Kartendarstellung
- zukünftige Datenverarbeitung auf Serverseite
- administrative Funktionen

Die bestehende Dokumentation beschreibt bereits eine Trennung zwischen Client-Anwendung, Server, Datenintegration, Warnlogik und Administration.

Gleichzeitig ist die bestehende Codebasis historisch gewachsen. Anforderungen, technische Entscheidungen, geplante Funktionen und bereits implementierte Bestandteile sind teilweise miteinander vermischt.

---

## 3. Repository-Struktur

Das Repository enthält neben dem eigentlichen Anwendungscode auch Dokumentation, GitHub-Konfiguration und CI/CD-Workflows.

### Wesentliche Bereiche

| Bereich        | Bedeutung                                                        |
| -------------- | ---------------------------------------------------------------- |
| `app/`         | Hauptanwendung                                                   |
| `app/android/` | Android-Projekt für die mobile Anwendung                         |
| `.github/`     | GitHub-Konfiguration, Issue-/Pull-Request-Vorlagen und Workflows |
| `docs/`        | technische Dokumentation und Planung                             |
| `README.md`    | Projektbeschreibung und grundlegende Informationen               |

Das Repository ist aktuell noch stark auf die bestehende Anwendung ausgerichtet.

Eine klare Trennung in eigenständige Komponenten wie **App**, **Admin** und **Backend/Processing**, wie sie für OpenWarnDE 2.0 vorgesehen ist, ist im aktuellen Projekt noch nicht vollständig umgesetzt.

---

## 4. Bestehende Anwendung

### 4.1 Web- und Mobile-Anwendung

Die bestehende Anwendung basiert auf einer Webtechnologie und wird über Capacitor für mobile Plattformen ergänzt.

Aus der vorhandenen Projektstruktur und Dokumentation ergeben sich folgende Einsatzbereiche:

- Webanwendung
- Android-Anwendung
- geplante bzw. vorbereitete iOS-Anwendung

Die Anwendung stellt die zentrale Benutzeroberfläche von OpenWarnDEV dar.

### 4.2 Kartenfunktion

Die Karte stellt einen wesentlichen Bestandteil der Anwendung dar.

Bereits vorgesehen bzw. umgesetzt sind unter anderem:

- interaktive Kartenansicht
- Darstellung des eigenen Standorts
- Geolocation
- Kartenlayer
- Warninformationen
- 3D-Gelände
- 3D-Gebäude
- weitere operative bzw. geografische Informationen

Als Kartenbibliothek wird **MapLibre GL JS** verwendet.

### 4.3 Standortbestimmung

Die Anwendung verwendet Capacitor Geolocation zur Ermittlung des Benutzerstandorts.

Der Standort wird unter anderem für die Darstellung des eigenen Standortes innerhalb der Karte verwendet.

### 4.4 Push-Benachrichtigungen

Für Warnmeldungen ist eine Push-Funktion vorgesehen.

Die bestehende Architektur sieht vor, dass Warnungen serverseitig erzeugt bzw. verarbeitet und anschließend an die Anwendung übermittelt werden.

Die konkrete und vollständig produktive serverseitige Warnungsverarbeitung ist Bestandteil der weiteren Analyse.

---

## 5. Technologischer Ist-Zustand

Die bestehende Anwendung verwendet unter anderem folgende Technologien:

| Technologie               | Verwendung                      |
| ------------------------- | ------------------------------- |
| TypeScript                | Programmiersprache              |
| React                     | UI-Framework                    |
| Next.js                   | Webanwendungsframework          |
| Capacitor                 | Mobile Plattformintegration     |
| MapLibre GL JS            | Kartendarstellung               |
| Zustand                   | Zustandsverwaltung              |
| Tailwind CSS              | Styling                         |
| Flowbite / Flowbite React | UI-Komponenten                  |
| Firebase Hosting          | Bereitstellung der Webanwendung |
| Git / GitHub              | Versionsverwaltung              |
| GitHub Actions            | Automatisierung und CI/CD       |

Die bestehende Anwendung verwendet aktuell Next.js 16, React 19, TypeScript 5 und MapLibre GL JS 5.

Die konkreten Versionsstände sind Bestandteil des aktuellen Repository-Zustands und können sich während der weiteren Entwicklung ändern.

---

## 6. Firebase und Hosting

Firebase wird im bestehenden Projekt insbesondere für die Bereitstellung der Webanwendung verwendet.

Die Anwendung ist aktuell über Firebase Hosting öffentlich erreichbar.

Die bestehende Repository-Struktur enthält unter anderem:

- Firebase-Konfiguration
- Firebase Hosting-Konfiguration
- Firebase-bezogene GitHub Actions Workflows

Die aktuelle Webanwendung wird als statischer Export bereitgestellt.

Eine zentrale serverseitige Verarbeitungsschicht ist in der bestehenden Dokumentation vorgesehen, aber nicht vollständig Bestandteil der aktuellen App-Implementierung.

---

## 7. Backend / Server

Die bestehende Projektdokumentation beschreibt bereits einen zukünftigen bzw. geplanten Server als zentrale Verarbeitungsschicht.

Dieser soll unter anderem folgende Aufgaben übernehmen:

- Abruf öffentlicher Datenquellen
- Normalisierung von Daten
- Anreicherung von Daten
- regionale Zusammenführung
- Bewertung von Daten
- Schwellenwertprüfung
- Erzeugung von Warnungen
- Versand von Push-Nachrichten
- Verwaltung von Datenquellen und Konfigurationen

Als Technologie für diesen Server ist in der bestehenden Dokumentation Python vorgesehen.

### Ist-Bewertung

Die serverseitige Architektur ist im bestehenden Projekt stärker als Konzept bzw. geplante Funktionalität vorhanden als als vollständig integrierter Bestandteil der aktuellen Anwendung.

Dies stellt einen wichtigen Unterschied zur Zielarchitektur von OpenWarnDE 2.0 dar.

---

## 8. Datenquellen

OpenWarnDEV ist darauf ausgelegt, verschiedene öffentliche und möglichst frei verfügbare Datenquellen zu verwenden.

In der bestehenden Dokumentation werden unter anderem folgende Datenbereiche genannt:

- Wetterwarnungen
- Radar- und Niederschlagsdaten
- Hochwasser- und Pegeldaten
- Geländedaten
- Höhenmodelle
- Waldbrand- und Feuergefahreninformationen
- Infrastrukturinformationen
- weitere geografische bzw. operative Daten

Die Datenquellen sind jedoch nicht als vollständig integrierte und einheitliche Datenplattform umgesetzt.

Für OpenWarnDE 2.0 muss daher untersucht werden:

- welche Datenquellen tatsächlich vorhanden sind,
- welche Schnittstellen verwendet werden,
- welche Datenformate auftreten,
- welche Daten bereits verarbeitet werden,
- welche Daten nur geplant sind,
- welche Datenquellen für den MVP relevant sind.

---

## 9. Datenverarbeitung

Die bestehende Architektur sieht eine zentrale Verarbeitung der externen Daten vor.

Das geplante Prinzip ist:

1. Abruf externer Daten
2. Normalisierung
3. Zusammenführung
4. regionale Bewertung
5. Prüfung definierter Schwellenwerte
6. Erzeugung einer Warnung
7. Übermittlung an die Anwendung

Damit ist bereits eine grundsätzliche Trennung zwischen Datenerfassung und Benutzeroberfläche vorgesehen.

Die vollständige Umsetzung dieser Verarbeitung ist jedoch nicht Bestandteil der aktuellen App-Struktur und muss für OpenWarnDE 2.0 neu bewertet und konkretisiert werden.

---

## 10. Administration

OpenWarnDEV enthält konzeptionell einen administrativen Bereich.

Dieser soll unter anderem die Verwaltung von:

- Datenquellen
- Schwellenwerten
- Regeln
- regionalen Konfigurationen
- operativen Einstellungen

ermöglichen.

Die bestehende Architektur beschreibt diese Verwaltung jedoch noch nicht als vollständig eigenständige Plattformkomponente.

Für OpenWarnDE 2.0 soll deshalb geprüft werden, welche administrativen Funktionen tatsächlich benötigt werden und wie diese sauber von der Benutzeranwendung getrennt werden können.

---

## 11. Authentifizierung und Berechtigungen

Für OpenWarnDEV sind unterschiedliche Nutzungsszenarien vorgesehen.

Neben der normalen Benutzeranwendung ist insbesondere ein geschützter Einsatzmodus für autorisierte Nutzer vorgesehen.

Dieser soll spezielle Funktionen für beispielsweise:

- Feuerwehr
- Katastrophenschutz
- weitere Einsatzorganisationen

bereitstellen.

Die genaue Ausgestaltung von Authentifizierung und Autorisierung ist für OpenWarnDE 2.0 noch zu definieren.

Dabei soll insbesondere zwischen:

- normalen Endnutzern,
- autorisierten Einsatzkräften,
- Administratoren

unterschieden werden.

---

## 12. GitHub und Entwicklungsprozess

Das Repository verwendet bereits verschiedene GitHub-Funktionen.

Vorhanden sind unter anderem:

- Issue Templates
- Pull-Request-Template
- GitHub Actions
- automatisierte Build-Prozesse
- Firebase-Deployment-Workflows
- Entwicklungs- und Distributions-Workflows

Damit existieren bereits erste Ansätze für einen strukturierten Entwicklungsprozess.

Für OpenWarnDE 2.0 soll dieser Prozess weiter strukturiert und an die neue Projektarchitektur angepasst werden.

---

## 13. Qualitätssicherung

Im bestehenden Projekt sind bereits verschiedene technische Prüfungen und automatisierte Abläufe vorhanden.

Dazu gehören insbesondere:

- Linting
- Build-Prüfungen
- automatisierte GitHub-Actions-Workflows
- Android-Teststrukturen

Die Qualitätssicherung ist jedoch noch nicht als vollständig definiertes Testkonzept über alle zukünftigen Systemkomponenten hinweg etabliert.

Für OpenWarnDE 2.0 soll daher ein auf den tatsächlichen MVP abgestimmtes Testkonzept entwickelt werden.

---

## 14. Dokumentation

Das bestehende Repository enthält bereits verschiedene technische Dokumentationen.

Dazu gehören unter anderem:

- Architektur-Dokumentation
- Server-Anforderungen
- Firebase-/Server-Konzepte
- README
- GitHub-Dokumentation

Die Dokumentation enthält jedoch sowohl:

- bereits implementierte Funktionen,
- geplante Funktionen,
- zukünftige Ideen,
- technische Konzepte

und trennt diese nicht immer eindeutig voneinander.

Dies erschwert die eindeutige Bestimmung des tatsächlichen Ist-Zustands.

Eine zentrale Aufgabe der Ist-Analyse besteht deshalb darin, zwischen **bestehend**, **teilweise umgesetzt**, **geplant** und **nicht umgesetzt** zu unterscheiden.

---

## 15. Technische Schulden und erkennbare Probleme

Aus der Analyse ergeben sich insbesondere folgende Punkte:

### 15.1 Historisch gewachsene Struktur

Die bestehende Codebasis ist über mehrere Entwicklungsphasen gewachsen.

Dadurch befinden sich Anforderungen, Feature-Ideen und technische Implementierungen teilweise auf unterschiedlichen Planungsebenen.

### 15.2 Vermischung von Ist und Planung

Die vorhandene Dokumentation beschreibt teilweise geplante Funktionen zusammen mit bereits vorhandenen Funktionen.

Dadurch ist nicht immer eindeutig erkennbar, welche Funktion tatsächlich implementiert ist.

### 15.3 Unklare Systemgrenzen

Die langfristige Architektur sieht bereits App, Server und Administration vor.

Diese Verantwortlichkeiten sind im aktuellen Projekt jedoch noch nicht vollständig als eigenständige Systemkomponenten umgesetzt.

### 15.4 Großer Funktionsumfang

OpenWarnDEV enthält bzw. beschreibt zahlreiche mögliche Erweiterungen.

Dazu gehören unter anderem:

- zusätzliche Kartenlayer
- 3D-Funktionen
- weitere Datenquellen
- Einsatzfunktionen
- Offline-Funktionen
- weitere Warnmodelle

Für einen strukturierten Neustart müssen diese Anforderungen priorisiert werden.

### 15.5 Fehlende eindeutige MVP-Abgrenzung

Die bestehende Featurebasis enthält zahlreiche mögliche Funktionen.

Eine klare Priorisierung in:

- Muss
- Soll
- Kann
- später

ist für OpenWarnDE 2.0 erforderlich.

---

## 16. Positive Bestandteile und wiederverwendbare Grundlagen

Trotz der genannten Probleme enthält OpenWarnDEV bereits eine umfangreiche technische Grundlage.

Als potenziell wiederverwendbare Bestandteile werden insbesondere betrachtet:

- bestehende Kartenimplementierung
- MapLibre-Integration
- Geolocation
- Capacitor-Integration
- mobile Projektstruktur
- UI-Komponenten
- bestehende Firebase-Konfiguration
- GitHub-Actions-Workflows
- vorhandene technische Dokumentation
- Erfahrungen aus der bisherigen Entwicklung

Die tatsächliche Übernahme einzelner Bestandteile wird erst nach der weiteren Analyse und Architekturplanung entschieden.

---

## 17. Zusammenfassung des Ist-Zustands

OpenWarnDEV besitzt bereits eine funktionsfähige technische Grundlage für eine kartenbasierte Warn- und Lageinformationsanwendung.

Insbesondere die App, Kartenfunktionen, Geolocation, mobile Integration, Webbereitstellung und erste automatisierte Entwicklungsprozesse sind bereits vorhanden.

Gleichzeitig ist die Architektur noch stark durch die historische Entwicklung des Projekts geprägt.

Die geplante zentrale Datenverarbeitung, Administration und Datenintegration sind teilweise konzeptionell beschrieben, aber noch nicht als klar getrennte und vollständig integrierte Plattformkomponenten umgesetzt.

Damit besteht ein geeigneter Ausgangspunkt für den strukturierten Neustart von OpenWarnDE 2.0.

---

## 18. Konsequenzen für OpenWarnDE 2.0

Aus der Ist-Analyse ergeben sich folgende vorläufige Konsequenzen:

1. Die bestehende Anwendung wird nicht unverändert übernommen.
2. Bestehende Funktionen müssen vor einer Übernahme bewertet werden.
3. Anforderungen müssen von der technischen Implementierung getrennt dokumentiert werden.
4. Die Systemgrenzen zwischen App, Administration und Backend müssen eindeutig definiert werden.
5. Datenquellen und Datenverarbeitung müssen zentral und nachvollziehbar geplant werden.
6. Der Funktionsumfang muss über ein MVP begrenzt werden.
7. Bestehende Technologien werden hinsichtlich ihrer Eignung für OpenWarnDE 2.0 bewertet.
8. Wiederverwendbare Komponenten werden gezielt identifiziert.
9. Nicht mehr benötigte oder überholte Ansätze werden nicht automatisch übernommen.

---

## 19. Vorläufige Bewertung

| Bereich           | Ist-Zustand                   | Bewertung                            |
| ----------------- | ----------------------------- | ------------------------------------ |
| Web-App           | vorhanden                     | gute Grundlage                       |
| Mobile App        | vorhanden / vorbereitet       | wiederverwendbare Grundlage          |
| Kartenfunktion    | umfangreich vorhanden         | wichtige Grundlage                   |
| Geolocation       | vorhanden                     | wiederverwendbar                     |
| Push              | vorgesehen / integriert       | weitere Prüfung erforderlich         |
| Firebase          | vorhanden                     | Nutzung muss neu bewertet werden     |
| Backend           | teilweise konzeptionell       | neu zu definieren                    |
| Datenintegration  | teilweise vorhanden / geplant | neu zu strukturieren                 |
| Administration    | konzeptionell vorhanden       | klar abzugrenzen                     |
| Authentifizierung | teilweise vorgesehen          | Anforderungen neu definieren         |
| CI/CD             | vorhanden                     | weiter nutzbar                       |
| Tests             | vorhanden, aber begrenzt      | Teststrategie erweitern              |
| Dokumentation     | umfangreich vorhanden         | Ist und Planung stärker trennen      |
| MVP-Abgrenzung    | nicht eindeutig               | muss neu definiert werden            |
| Systemarchitektur | teilweise vorhanden           | für OpenWarnDE 2.0 neu strukturieren |