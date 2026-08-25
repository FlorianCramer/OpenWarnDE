# Projektplanung – OpenWarnDE 2.0

**Projekt:** OpenWarnDE 2.0
**Projektphase:** Vorbereitung AP2
**Projektart:** Einzelprojekt
**Projektzeitraum:** 28.08.2026 – 24.01.2027
**Geplanter Projektumfang:** 80 Stunden

---

## 1. Zweck der Projektplanung

Die Projektplanung beschreibt die organisatorische und technische Vorgehensweise zur Umsetzung des OpenWarnDE-2.0-MVPs.

Auf Grundlage der bisherigen:

* Ist-Analyse,
* Anforderungsanalyse,
* Soll-/Ist-Gegenüberstellung und
* Variantenbewertung

werden die notwendigen Arbeitspakete, Meilensteine, Ressourcen und Abhängigkeiten definiert.

Ziel der Planung ist es, den festgelegten MVP innerhalb des verfügbaren Projektzeitraums strukturiert und nachvollziehbar umzusetzen.

---

# 2. Projektziel

Das Projektziel besteht darin, auf Grundlage des bestehenden OpenWarnDEV-Projekts eine neue und strukturierte technische Grundlage für OpenWarnDE 2.0 zu schaffen und einen abgegrenzten MVP prototypisch umzusetzen.

Der MVP umfasst insbesondere:

* grundlegende Client-Anwendung
* interaktive Karte
* Standortbestimmung
* Darstellung des eigenen Standorts
* Kartensuche
* anpassbare Kartendarstellung
* grundlegende Verwaltungsoberfläche
* manuelles Erstellen und Auslösen von Push-Nachrichten
* grundlegende Qualitätssicherung
* technische und fachliche Dokumentation

Die Verarbeitung externer Datenquellen, eine umfangreiche serverseitige Datenverarbeitung sowie die Entwicklung einer vollständigen öffentlichen API sind nicht Bestandteil des Schulprojekts.

---

# 3. Vorgehensmodell

Für das Projekt wird ein **phasenorientiertes Vorgehensmodell mit iterativen Entwicklungsanteilen** verwendet.

Die wesentlichen Projektphasen werden grundsätzlich nacheinander bearbeitet.

Innerhalb einzelner Phasen kann es jedoch zu Rückkopplungen kommen. Beispielsweise können Erkenntnisse aus der Implementierung zu Anpassungen an Architektur oder Anforderungen führen.

Der grundsätzliche Ablauf lautet:

```text
Vorbereitung
     ↓
Ist-Analyse
     ↓
Anforderungsanalyse
     ↓
Soll-/Ist-Vergleich
     ↓
Variantenvergleich
     ↓
Architekturplanung
     ↓
MVP-Definition
     ↓
Implementierung
     ↓
Qualitätssicherung
     ↓
Abnahme
     ↓
Dokumentation
     ↓
Präsentation
```

---

# 4. Projektphasen

## 4.1 Phase 1 – Projektvorbereitung

### Ziel

Definition des Projektthemas und Vorbereitung der weiteren Projektarbeit.

### Aufgaben

* Projektziel definieren
* Projektumfang abgrenzen
* Projektantrag erstellen
* grundlegende Anforderungen erfassen
* vorhandene Projektdokumentation sichten

### Ergebnis

Ein abgestimmter Projektantrag und eine erste Definition des Projektumfangs.

---

## 4.2 Phase 2 – Ist-Analyse

### Ziel

Erfassung und Bewertung des bestehenden OpenWarnDEV-Projekts.

### Aufgaben

* Repository-Struktur analysieren
* bestehende Technologien erfassen
* vorhandene Funktionen untersuchen
* bestehende Architektur untersuchen
* vorhandene Schnittstellen erfassen
* vorhandene Qualitätssicherung untersuchen
* technische Probleme und Einschränkungen identifizieren
* wiederverwendbare Komponenten identifizieren

### Ergebnis

Dokumentierte Ist-Situation von OpenWarnDEV.

---

## 4.3 Phase 3 – Stakeholder- und Umfeldanalyse

### Ziel

Ermittlung der relevanten Nutzer, Systeme und Randbedingungen.

### Aufgaben

* relevante Stakeholder identifizieren
* Interessen und Anforderungen der Stakeholder erfassen
* Systemumfeld betrachten
* externe Abhängigkeiten erfassen
* relevante Schnittstellen identifizieren

### Ergebnis

Stakeholder- und Umfeldanalyse als Grundlage für die Anforderungsdefinition.

---

## 4.4 Phase 4 – Anforderungsanalyse

### Ziel

Ermittlung und Priorisierung der Anforderungen an OpenWarnDE 2.0.

### Aufgaben

* funktionale Anforderungen definieren
* nicht-funktionale Anforderungen definieren
* Sicherheitsanforderungen definieren
* technische Anforderungen erfassen
* Anforderungen priorisieren
* MVP-relevante Anforderungen bestimmen
* nicht umzusetzende Anforderungen dokumentieren

### Ergebnis

Priorisierter Anforderungskatalog.

---

## 4.5 Phase 5 – Soll-/Ist-Vergleich

### Ziel

Ermittlung der Unterschiede zwischen OpenWarnDEV und dem geplanten OpenWarnDE-2.0-MVP.

### Aufgaben

* bestehende Funktionen mit Soll-Anforderungen vergleichen
* fehlende Funktionen identifizieren
* technische Unterschiede dokumentieren
* notwendige Änderungen bestimmen
* Projektumfang auf Grundlage des Vergleichs überprüfen

### Ergebnis

Dokumentierter Soll-/Ist-Vergleich und definierter Handlungsbedarf.

---

## 4.6 Phase 6 – Variantenvergleich

### Ziel

Bewertung möglicher Vorgehensweisen für die technische Umsetzung.

### Betrachtete Varianten

1. Weiterentwicklung von OpenWarnDEV
2. vollständiger technischer Neustart
3. strukturierter Neustart mit gezielter Wiederverwendung

### Aufgaben

* Varianten definieren
* Bewertungskriterien festlegen
* Varianten vergleichen
* Entwicklungsaufwand bewerten
* technische Risiken bewerten
* Wartbarkeit und Erweiterbarkeit bewerten
* wirtschaftliche Aspekte betrachten
* Variante auswählen

### Ergebnis

Entscheidung für einen **strukturierten Neustart mit gezielter Wiederverwendung**.

---

# 5. Architekturplanung

## 5.1 Ziel

Definition der technischen Zielarchitektur für den MVP.

## 5.2 Aufgaben

* Systemkomponenten definieren
* Verantwortlichkeiten festlegen
* Client-Struktur planen
* Verwaltungsbereich planen
* Kartenkomponente planen
* Standortfunktion planen
* Suchfunktion planen
* Push-Funktion planen
* benötigte Datenflüsse definieren
* Schnittstellen zwischen Komponenten festlegen
* Erweiterbarkeit für zukünftige Funktionen berücksichtigen

## 5.3 Ergebnis

Dokumentierter Architekturentwurf für OpenWarnDE 2.0.

---

# 6. MVP-Planung

## 6.1 Ziel

Festlegung des tatsächlich innerhalb des Schulprojekts umzusetzenden Funktionsumfangs.

## 6.2 Muss-Funktionen

* grundlegende Projektstruktur
* Client-Anwendung
* interaktive Karte
* Standortbestimmung
* Darstellung des eigenen Standorts
* Kartensuche
* grundlegende Anpassung der Kartendarstellung
* Verwaltungsoberfläche
* manuelles Erstellen und Auslösen von Push-Nachrichten
* grundlegende Zugriffskontrolle
* Qualitätssicherung

## 6.3 Soll-Funktionen

* erweiterte Kartendarstellung
* zusätzliche Verwaltungseinstellungen
* zusätzliche automatisierte Tests
* vorbereitende Komponenten für spätere Erweiterungen

## 6.4 Nicht Bestandteil

* externe Warn- und Informationsdatenquellen
* automatische Datenverarbeitung
* komplexe Warnlogik
* vollständige öffentliche API
* umfangreiche Backend-Verarbeitung
* vollständige BOS-Funktionen
* umfangreiche Offline-Funktionen
* umfangreiche 3D-Funktionen

---

# 7. Implementierungsplanung

Die Implementierung erfolgt auf Grundlage der zuvor definierten Architektur und MVP-Anforderungen.

## 7.1 Technische Grundlage

Zunächst werden die grundlegenden Projektstrukturen und Entwicklungsprozesse eingerichtet.

Dazu gehören:

* Repository-Struktur
* Entwicklungsumgebung
* Abhängigkeiten
* Buildprozess
* Linting
* Type Checking
* grundlegende CI/CD-Prozesse

## 7.2 Client

Anschließend wird die grundlegende Client-Anwendung aufgebaut.

Geplante Komponenten:

* Anwendungslayout
* Navigation
* Kartenansicht
* Standortanzeige
* Suchfunktion
* Kartendarstellung

## 7.3 Verwaltung

Anschließend wird die grundlegende Verwaltungsoberfläche umgesetzt.

Geplante Funktionen:

* Verwaltungsbereich
* Zugriffskontrolle
* grundlegende Einstellungen
* Push-Nachrichten

## 7.4 Integration

Die einzelnen Komponenten werden anschließend miteinander verbunden und als Gesamtsystem getestet.

---

# 8. Qualitätssicherung

Die Qualitätssicherung erfolgt während der gesamten Implementierungsphase und nicht ausschließlich am Ende des Projekts.

## 8.1 Automatisierte Prüfungen

Folgende Prüfungen sollen eingesetzt werden:

* Type Checking
* Linting
* Build-Prüfungen
* automatisierte Tests

## 8.2 Funktionale Tests

Die implementierten Kernfunktionen werden einzeln überprüft.

Dazu gehören insbesondere:

* Anwendungstart
* Kartenanzeige
* Karteninteraktion
* Standortbestimmung
* Standortdarstellung
* Kartensuche
* Kartendarstellung
* Verwaltung
* Push-Nachrichten

## 8.3 Integrationstests

Die Zusammenarbeit der wichtigsten Komponenten wird überprüft.

## 8.4 Manuelle Tests

Zusätzlich werden manuelle Tests durchgeführt, um das tatsächliche Verhalten der Anwendung aus Nutzersicht zu überprüfen.

---

# 9. Abnahme

Nach Abschluss der Implementierung und Qualitätssicherung erfolgt eine interne Abnahme.

Dabei wird überprüft, ob die definierten Abnahmekriterien erfüllt wurden.

## Abnahmekriterien

Der MVP gilt als erfolgreich umgesetzt, wenn:

* die Anwendung gestartet werden kann,
* die Karte funktioniert,
* der eigene Standort dargestellt werden kann,
* die Kartensuche funktioniert,
* die Kartendarstellung angepasst werden kann,
* die Verwaltungsoberfläche funktioniert,
* administrative Funktionen geschützt sind,
* eine Push-Nachricht manuell ausgelöst werden kann,
* die implementierten Kernfunktionen getestet wurden,
* der Projektstand reproduzierbar gebaut werden kann und
* die wesentlichen technischen Entscheidungen dokumentiert sind.

---

# 10. Dokumentationsplanung

Die Dokumentation wird parallel zur Projektarbeit erstellt.

Dokumentiert werden insbesondere:

* Projektziel
* Ausgangssituation
* Anforderungen
* Stakeholder
* Ist-Analyse
* Soll-/Ist-Vergleich
* Variantenvergleich
* Architektur
* Technologieentscheidungen
* Implementierung
* Tests
* Ergebnisse
* Abnahme
* Fazit
* Ausblick

Dadurch soll vermieden werden, dass die vollständige Dokumentation erst am Ende des Projekts erstellt werden muss.

---

# 11. Zeitplanung

Der geplante Gesamtaufwand beträgt **80 Stunden**.

|      Phase | Arbeitspaket                   |  Aufwand |
| ---------: | ------------------------------ | -------: |
|          1 | Projektvorbereitung und Antrag |      4 h |
|          2 | Ist-Analyse OpenWarnDEV        |      8 h |
|          3 | Stakeholder- und Umfeldanalyse |      4 h |
|          4 | Anforderungsanalyse            |      8 h |
|          5 | Soll-/Ist-Vergleich            |      4 h |
|          6 | Variantenvergleich             |      8 h |
|          7 | Architekturplanung             |      8 h |
|          8 | MVP-Definition                 |      4 h |
|          9 | Implementierung                |     16 h |
|         10 | Qualitätssicherung und Tests   |      6 h |
|         11 | Abnahme                        |      2 h |
|         12 | Dokumentation                  |      6 h |
|         13 | Präsentationsvorbereitung      |      2 h |
| **Gesamt** |                                | **80 h** |

---

# 12. Meilensteine

| Meilenstein                                  | Ergebnis                            |
| -------------------------------------------- | ----------------------------------- |
| **M1 – Projektantrag abgeschlossen**         | Projektziel und Umfang definiert    |
| **M2 – Ist-Analyse abgeschlossen**           | OpenWarnDEV dokumentiert            |
| **M3 – Anforderungen abgeschlossen**         | Anforderungen priorisiert           |
| **M4 – Soll-/Ist-Vergleich abgeschlossen**   | Handlungsbedarf bestimmt            |
| **M5 – Variantenentscheidung abgeschlossen** | Lösungsvariante ausgewählt          |
| **M6 – Architektur abgeschlossen**           | Zielarchitektur definiert           |
| **M7 – MVP definiert**                       | verbindlicher MVP-Umfang festgelegt |
| **M8 – Implementierung abgeschlossen**       | MVP technisch umgesetzt             |
| **M9 – Tests abgeschlossen**                 | Kernfunktionen geprüft              |
| **M10 – Abnahme abgeschlossen**              | MVP anhand der Kriterien bewertet   |
| **M11 – Dokumentation abgeschlossen**        | Projektdokumentation fertiggestellt |
| **M12 – Präsentation vorbereitet**           | Präsentation fertiggestellt         |

---

# 13. Ressourcenplanung

Da das Projekt als Einzelprojekt durchgeführt wird, übernimmt der Projektbearbeiter sämtliche Aufgaben.

| Aufgabe             | Verantwortlich |
| ------------------- | -------------- |
| Projektplanung      | Florian Cramer |
| Anforderungsanalyse | Florian Cramer |
| Architektur         | Florian Cramer |
| Entwicklung         | Florian Cramer |
| Testing             | Florian Cramer |
| Dokumentation       | Florian Cramer |
| Qualitätssicherung  | Florian Cramer |
| Abnahme             | Florian Cramer |
| Präsentation        | Florian Cramer |

Als Entwicklungs- und Dokumentationsressourcen werden insbesondere eingesetzt:

* Entwicklungsrechner
* Git
* GitHub
* Visual Studio Code
* GitHub Actions
* Projekt- und Anforderungsdokumentation

---

# 14. Abhängigkeiten

Die Projektphasen besitzen teilweise fachliche und technische Abhängigkeiten.

Insbesondere gilt:

```text
Anforderungen
      ↓
Projektumfang
      ↓
Variantenvergleich
      ↓
Architektur
      ↓
MVP-Definition
      ↓
Implementierung
      ↓
Tests
      ↓
Abnahme
```

Eine vollständige Implementierung soll daher erst beginnen, nachdem die Anforderungen, der Projektumfang und die grundlegende Architektur festgelegt wurden.

---

# 15. Risikomanagement

| Risiko                                                             | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme                                           |
| ------------------------------------------------------------------ | ------------------ | ---------- | ------------------------------------------------------- |
| Projektumfang wächst während der Entwicklung                       | mittel             | hoch       | klare MVP-Abgrenzung und Priorisierung                  |
| Implementierungsaufwand wird unterschätzt                          | mittel             | hoch       | frühzeitiger Prototyp und regelmäßige Zwischenstände    |
| technische Probleme bei der Kartenintegration                      | mittel             | mittel     | frühe technische Prüfung der Kartenkomponente           |
| Probleme bei Standortberechtigungen                                | mittel             | mittel     | frühzeitige Tests auf Zielplattform                     |
| Push-Funktion benötigt mehr Aufwand als geplant                    | mittel             | hoch       | Push-Funktion frühzeitig als technisches Risiko prüfen  |
| bestehende Komponenten aus OpenWarnDEV sind nicht wiederverwendbar | mittel             | mittel     | Komponenten einzeln bewerten und Alternativen vorsehen  |
| Zeitmangel durch parallele schulische Aufgaben                     | hoch               | mittel     | Priorisierung auf Muss-Anforderungen und Zeitpuffer     |
| Architektur muss während der Implementierung angepasst werden      | mittel             | mittel     | iterative Rückkopplung zwischen Planung und Entwicklung |

---

# 16. Umgang mit Zeitüberschreitungen

Sollte während der Implementierung erkennbar werden, dass der geplante Umfang nicht innerhalb des verfügbaren Zeitbudgets umgesetzt werden kann, wird nach Priorität vorgegangen.

Die Reihenfolge lautet:

1. Muss-Anforderungen vollständig umsetzen
2. Qualitätssicherung der Muss-Anforderungen sicherstellen
3. Dokumentation der umgesetzten Funktionen abschließen
4. Soll-Anforderungen nur bei ausreichender Zeit umsetzen
5. Kann-Anforderungen gegebenenfalls vollständig streichen

Dadurch bleibt ein funktionsfähiger und bewertbarer MVP auch bei unerwartetem Mehraufwand gewährleistet.

---

# 17. Ergebnis der Projektplanung

Die Projektplanung definiert einen klar abgegrenzten Entwicklungsprozess für den OpenWarnDE-2.0-MVP.

Der Schwerpunkt liegt auf einer strukturierten technischen Grundlage sowie den für das Schulprojekt relevanten Kernfunktionen:

**Karte → Standort → Suche → Kartendarstellung → Verwaltung → manuelle Push-Nachricht**

Komplexere Funktionen wie externe Datenquellen, automatische Datenverarbeitung und eine öffentliche API werden bewusst aus dem Projektumfang herausgehalten.

Durch die Priorisierung und die geplanten Qualitätssicherungsmaßnahmen soll sichergestellt werden, dass auch bei begrenzter Projektzeit ein funktionsfähiges, getestetes und dokumentiertes Ergebnis erreicht wird.
