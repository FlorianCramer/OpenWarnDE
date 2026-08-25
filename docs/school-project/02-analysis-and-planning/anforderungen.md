# Requirements – OpenWarnDE 2.0 MVP

## 1. Zweck des Dokuments

Dieses Dokument beschreibt die funktionalen und nicht-funktionalen Anforderungen für den im Rahmen des Miniprojekts entwickelten MVP von OpenWarnDE 2.0.

Der MVP bildet die technische Grundlage für die weitere Entwicklung der OpenWarnDE-Plattform. Der Schwerpunkt liegt auf der grundlegenden Systemstruktur, einer nutzbaren Kartenansicht sowie den ersten Verwaltungsfunktionen.

Die Anforderungen dienen als Grundlage für:

- die weitere Projektplanung
- die Architekturplanung
- die Priorisierung des MVP
- die Implementierung
- die Qualitätssicherung und Tests
- die spätere Abnahme des Projektergebnisses

Die Anforderungen werden im weiteren Projektverlauf überprüft und bei Bedarf angepasst.

---

## 2. Projektumfang

### 2.1 Ziel des MVP

Der MVP soll eine funktionsfähige technische Grundlage für OpenWarnDE 2.0 schaffen.

Im Mittelpunkt stehen:

1. eine grundlegende OpenWarnDE-Anwendung
2. eine interaktive Kartenansicht
3. die Ermittlung und Darstellung des eigenen Standorts
4. eine Suchfunktion für die Karte
5. die Anpassung und Konfiguration der Kartendarstellung
6. die grundlegenden Funktionen einer Verwaltungsoberfläche
7. die Möglichkeit, manuell eine Push-Nachricht aus der Verwaltung auszulösen

Der MVP soll bewusst so aufgebaut werden, dass spätere Funktionen wie Datenquellen, serverseitige Datenverarbeitung und eine öffentliche API darauf aufbauen können.

---

## 3. Abgrenzung des Projektumfangs

### 3.1 Bestandteil des MVP

Folgende Funktionen sind Bestandteil des Schulprojekts:

- grundlegende Projekt- und Systemstruktur von OpenWarnDE 2.0
- grundlegende Client-Anwendung
- grundlegende Verwaltungsoberfläche
- interaktive Kartenansicht
- Standortbestimmung des Nutzers
- Darstellung des eigenen Standorts auf der Karte
- Kartensuche
- Anpassung der Kartendarstellung
- grundlegende Konfiguration der Anwendung über die Verwaltung
- manuelles Auslösen einer Push-Nachricht
- technische Grundlage für eine spätere Erweiterung um weitere Dienste und Datenquellen
- Qualitätssicherung und Tests der implementierten Funktionen

### 3.2 Nicht Bestandteil des MVP

Die folgenden Funktionen werden bewusst aus dem Umfang des Schulprojekts ausgeschlossen:

- Verarbeitung externer Warn- und Informationsdaten
- Integration umfangreicher externer Datenquellen
- automatische Datenaufnahme
- Normalisierung und Validierung externer Daten
- umfangreiche serverseitige Datenverarbeitung
- vollständige öffentliche OpenWarnDE-API
- Veröffentlichung einer API für externe Anbieter
- komplexe automatische Warnlogik
- vollständige BOS-Funktionen
- vollständige Offline-Karten
- umfangreiche 3D-Kartenfunktionen
- vollständige Monitoring- und Analysefunktionen
- vollständige Produktionsinfrastruktur

Diese Funktionen bleiben Bestandteil der langfristigen Weiterentwicklung von OpenWarnDE 2.0 und werden nach Abschluss des Schulprojekts weiter spezifiziert.

---

## 4. Zielgruppen

Der MVP berücksichtigt zunächst folgende Nutzergruppen:

### 4.1 Endnutzer

Endnutzer verwenden OpenWarnDE zur Anzeige von Informationen auf einer Karte und zur Nutzung der grundlegenden Kartenfunktionen.

### 4.2 Administratoren

Administratoren verwenden die Verwaltungsoberfläche zur Konfiguration grundlegender Funktionen und zum manuellen Auslösen von Push-Nachrichten.

### 4.3 Entwickler

Entwickler benötigen eine klar strukturierte technische Grundlage, auf der weitere OpenWarnDE-Funktionen entwickelt werden können.

---

## 5. Funktionale Anforderungen

### 5.1 Grundlegende Anwendung

| ID | Anforderung |
|----|-------------|
| **FR-001** | Die Anwendung MUSS gestartet werden können und eine grundlegende Benutzeroberfläche bereitstellen. |
| **FR-002** | Die Anwendung MUSS eine nachvollziehbare Navigation zwischen den vorgesehenen Bereichen ermöglichen. |
| **FR-003** | Die Benutzeroberfläche für Endnutzer und die Verwaltungsfunktionen SOLLEN logisch voneinander getrennt sein. |
| **FR-004** | Die Projektstruktur MUSS so aufgebaut sein, dass weitere Funktionen und Komponenten später ergänzt werden können, ohne die grundlegende Struktur des Projekts neu aufbauen zu müssen. |

---

## 6. Kartenfunktionen

### 6.1 Kartenansicht

| ID | Anforderung |
|----|-------------|
| **FR-101** | Die Anwendung MUSS eine interaktive Karte anzeigen. Der Nutzer MUSS die Karte mindestens verschieben und den Kartenausschnitt verändern können. |
| **FR-102** | Der Nutzer MUSS die Möglichkeit haben, in die Karte hinein- und herauszuzoomen. |
| **FR-103** | Die Anwendung MUSS eine definierte Kartendarstellung verwenden. Die verwendete Kartendarstellung SOLL so aufgebaut sein, dass sie später angepasst oder durch weitere Darstellungen erweitert werden kann. |
| **FR-104** | Die Darstellung der Karte SOLL über definierte Einstellungen angepasst werden können. Mögliche Einstellungen umfassen beispielsweise: <br> - verwendeter Kartenstil<br> - Sichtbarkeit bestimmter Kartenelemente<br> - Darstellung relevanter Layer<br> - grundlegende Anzeigeoptionen <br><br> Der konkrete Umfang der Einstellungen wird während der Architektur- und Implementierungsphase festgelegt. |

---

## 7. Standortfunktionen

### 7.1 Ermittlung des eigenen Standorts

| ID | Anforderung |
|----|-------------|
| **FR-201** | Die Anwendung MUSS den Nutzer über die benötigte Standortberechtigung informieren und diese entsprechend der verwendeten Plattform anfordern. |
| **FR-202** | Die Anwendung MUSS den aktuellen Standort des Nutzers ermitteln können, sofern der Nutzer die erforderliche Berechtigung erteilt. |
| **FR-203** | Der ermittelte Standort MUSS auf der Karte dargestellt werden. |
| **FR-204** | Der Nutzer SOLL die Möglichkeit haben, die Karte auf den eigenen Standort zu zentrieren. |
| **FR-205** | Kann der Standort nicht ermittelt werden, MUSS die Anwendung einen verständlichen Hinweis anzeigen. |

---

## 8. Suchfunktion

### 8.1 Kartensuche

| ID | Anforderung |
|----|-------------|
| **FR-301** | Die Anwendung MUSS ein Suchfeld für die Kartensuche bereitstellen. |
| **FR-302** | Der Nutzer MUSS über die Suchfunktion nach einem Ort suchen können. |
| **FR-303** | Ein ausgewähltes Suchergebnis MUSS auf der Karte dargestellt werden. |
| **FR-304** | Nach Auswahl eines Suchergebnisses SOLL die Karte auf den gefundenen Ort zentriert werden. |
| **FR-305** | Wenn kein passendes Suchergebnis gefunden wird, MUSS die Anwendung dem Nutzer eine verständliche Rückmeldung geben. |

---

## 9. Verwaltungsoberfläche

### 9.1 Grundlagen

| ID | Anforderung |
|----|-------------|
| **FR-401** | Es MUSS eine separate Verwaltungsoberfläche beziehungsweise ein Verwaltungsbereich vorhanden sein. |
| **FR-402** | Die Verwaltung MUSS eine zentrale Übersicht über die verfügbaren Verwaltungsfunktionen bereitstellen. |
| **FR-403** | Die Verwaltung SOLL die Konfiguration ausgewählter OpenWarnDE-Funktionen ermöglichen. Der konkrete Umfang wird im Rahmen der MVP-Planung festgelegt. |
| **FR-404** | Über die Verwaltung vorgenommene Einstellungen SOLLEN dauerhaft gespeichert werden können, sofern dies für die jeweilige Einstellung erforderlich ist. |
| **FR-405** | Nach einer Verwaltungsaktion MUSS der Administrator eine verständliche Rückmeldung über den Erfolg oder Fehler der Aktion erhalten. |

---

## 10. Push-Nachrichten

### 10.1 Manuelles Versenden

| ID | Anforderung |
|----|-------------|
| **FR-501** | Der Administrator MUSS über die Verwaltung eine Push-Nachricht erstellen können. |
| **FR-502** | Eine Push-Nachricht MUSS mindestens einen Titel und einen Nachrichtentext enthalten können. |
| **FR-503** | Der Administrator MUSS eine Push-Nachricht manuell auslösen können. |
| **FR-504** | Nach dem Auslösen der Nachricht MUSS die Verwaltung den Status der Aktion anzeigen. |
| **FR-505** | Der MVP MUSS keine automatische Erzeugung von Push-Nachrichten aus externen Warn- oder Datenquellen unterstützen. Push-Nachrichten werden im Rahmen des Schulprojekts ausschließlich manuell über die Verwaltung ausgelöst. |

---

## 11. Datenverarbeitung und API

### 11.1 Abgrenzung

| ID | Anforderung |
|----|-------------|
| **FR-601** | Die Verarbeitung externer Warn- und Informationsdaten ist kein Bestandteil des Schul-MVPs. |
| **FR-602** | Die Architektur SOLL jedoch so vorbereitet werden, dass eine spätere Verarbeitung externer Datenquellen integriert werden kann. |
| **FR-603** | Die Entwicklung einer vollständigen öffentlichen OpenWarnDE-API ist nicht Bestandteil des Schulprojekts. Die Systemarchitektur SOLL jedoch eine spätere Einführung einer API ermöglichen. |
| **FR-604** | Der MVP MUSS ohne die Integration umfangreicher externer Datenquellen funktionsfähig sein. |

---

## 12. Nicht-funktionale Anforderungen

### 12.1 Wartbarkeit

| ID | Anforderung |
|----|-------------|
| **NFR-001** | Der Quellcode MUSS nachvollziehbar strukturiert und in logisch getrennte Komponenten aufgeteilt werden. |
| **NFR-002** | Neue Funktionen SOLLEN möglichst ohne grundlegende Änderungen an bereits bestehenden Komponenten integriert werden können. |
| **NFR-003** | Wichtige technische Entscheidungen und die grundlegende Systemstruktur MÜSSEN dokumentiert werden. |

### 12.2 Qualität

| ID | Anforderung |
|----|-------------|
| **NFR-101** | Das Projekt SOLL eine statische Typprüfung verwenden. |
| **NFR-102** | Der Quellcode SOLL automatisiert auf definierte Qualitätsregeln geprüft werden. |
| **NFR-103** | Das Projekt MUSS reproduzierbar gebaut werden können. |
| **NFR-104** | Fehler innerhalb der Anwendung MÜSSEN soweit möglich kontrolliert behandelt und dem Nutzer verständlich dargestellt werden. |

---

## 13. Sicherheit

| ID | Anforderung |
|----|-------------|
| **NFR-201** | Administrative Funktionen DÜRFEN nicht ohne geeignete Zugriffskontrolle für beliebige Endnutzer zugänglich sein. |
| **NFR-202** | Kritische administrative Aktionen SOLLEN nicht ausschließlich durch Prüfungen im Client geschützt werden. |
| **NFR-203** | Standortdaten DÜRFEN nur verarbeitet werden, wenn dies für die jeweilige Funktion erforderlich ist und der Nutzer die dafür notwendigen Berechtigungen erteilt hat. |
| **NFR-204** | Das manuelle Versenden von Push-Nachrichten MUSS auf berechtigte Verwaltungsnutzer beschränkt sein. |

---

## 14. Testanforderungen

### 14.1 Automatisierte Tests

Für relevante Funktionen SOLLEN automatisierte Tests erstellt werden. Der konkrete Testumfang wird anhand der implementierten MVP-Funktionen festgelegt.

Mindestens folgende Bereiche sollen überprüft werden:

- Kartenfunktionen
- Standortfunktionen
- Suchfunktion
- Verwaltungsfunktionen
- Push-Nachrichten
- zentrale Komponenten und Services

### 14.2 Integrationstests

Die Zusammenarbeit relevanter Komponenten SOLL durch Integrationstests überprüft werden.

### 14.3 API-Tests

API-Tests werden nur für die im MVP tatsächlich implementierten internen Schnittstellen durchgeführt. Eine vollständige öffentliche API ist nicht Bestandteil des Projekts.

### 14.4 Build- und Qualitätsprüfungen

Der Projektstand SOLL automatisiert auf folgende Punkte geprüft werden:

- Type Checking
- Linting
- Build
- automatisierte Tests

---

## 15. Priorisierung

Die Anforderungen werden für die MVP-Entwicklung nach ihrer Priorität eingeteilt.

### Muss

Die folgenden Funktionen sind für einen erfolgreichen MVP erforderlich:

- grundlegende Anwendung
- interaktive Karte
- Standortbestimmung
- Darstellung des eigenen Standorts
- Kartensuche
- grundlegende Anpassung der Kartendarstellung
- grundlegende Verwaltungsoberfläche
- manuelles Erstellen und Auslösen einer Push-Nachricht
- grundlegende Qualitätssicherung
- nachvollziehbare technische Dokumentation

### Soll

Folgende Funktionen sollen umgesetzt werden, sofern der Projektumfang dies zulässt:

- erweiterte Kartendarstellung
- zusätzliche Konfigurationsmöglichkeiten
- erweiterte Verwaltungsfunktionen
- verbesserte Rückmeldungen und Fehlerbehandlung
- zusätzliche automatisierte Tests

### Kann

Folgende Funktionen können bei ausreichender Zeit berücksichtigt werden:

- zusätzliche Kartenlayer
- weitere Einstellungsmöglichkeiten
- zusätzliche Verwaltungsfunktionen
- zusätzliche Plattformfunktionen
- vorbereitende Komponenten für spätere Datenquellen

---

## 16. Nicht Bestandteil des MVP

Die folgenden Punkte werden ausdrücklich nicht als Abnahmekriterium für das Schulprojekt betrachtet:

- vollständige Integration externer Warnquellen
- automatisierte Verarbeitung von Warnmeldungen
- Normalisierung und Validierung externer Daten
- vollständige öffentliche API
- umfangreiche Datenaggregierung
- komplexe Warnlogik
- vollständige BOS-Funktionen
- vollständige Offline-Funktionalität
- 3D-Kartenfunktionen
- vollständige Monitoring- und Analysefunktionen

Diese Funktionen werden nach Abschluss des Schulprojekts im Rahmen der weiteren OpenWarnDE-2.0-Roadmap spezifiziert und umgesetzt.

---

## 17. Abnahmekriterien

Der MVP gilt als erfolgreich umgesetzt, wenn mindestens folgende Kriterien erfüllt sind:

- Die OpenWarnDE-2.0-Anwendung kann gestartet und verwendet werden.
- Eine interaktive Karte wird dargestellt.
- Der eigene Standort kann ermittelt und auf der Karte dargestellt werden.
- Die Karte kann auf den eigenen Standort zentriert werden.
- Orte können über die Suchfunktion gesucht werden.
- Ein Suchergebnis kann auf der Karte dargestellt werden.
- Die grundlegende Kartendarstellung kann angepasst werden.
- Eine Verwaltungsoberfläche ist erreichbar und funktionsfähig.
- Grundlegende Einstellungen können über die Verwaltung vorgenommen werden.
- Eine Push-Nachricht kann über die Verwaltung manuell erstellt und ausgelöst werden.
- Administrative Funktionen sind vor unberechtigtem Zugriff geschützt.
- Die implementierten Kernfunktionen wurden getestet.
- Der Projektstand kann reproduzierbar gebaut werden.
- Die wesentlichen technischen Entscheidungen und Funktionen sind dokumentiert.

---

## 18. Erweiterung nach dem Schulprojekt

Der MVP bildet die technische Grundlage für die weitere Entwicklung von OpenWarnDE 2.0.

Nach Abschluss des Schulprojekts können unter anderem folgende Bereiche ergänzt werden:

1. Integration externer Warn- und Informationsquellen
2. serverseitige Datenverarbeitung
3. Normalisierung und Validierung von Daten
4. zentrale OpenWarnDE-API
5. automatische Warnverarbeitung
6. weitere Kartenlayer und Daten
7. erweiterte Verwaltungsfunktionen
8. Monitoring und Analyse
9. weitere mobile Funktionen
10. zusätzliche Plattform- und BOS-Funktionen

Die Erweiterungen werden in einem separaten Anforderungskatalog spezifiziert und priorisiert.