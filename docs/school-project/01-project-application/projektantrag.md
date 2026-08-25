# Projektantrag – Miniprojekt LF12 (Vorbereitung AP2)

## Fachinformatiker für Anwendungsentwicklung

### Berufsschule Leipzig – A-Turnus

---

## 1. Allgemeine Angaben

| Feld                            | Inhalt                                                                                             |
| ------------------------------- | -------------------------------------------------------------------------------------------------- |
| **Name**                        | Florian Cramer                                                                                     |
| **Klasse**                      | IT 24-4                                                                                            |
| **Schule**                      | Felix-Bloch-Schule                                                                                 |
| **Projekttitel**                | Neukonzeption und prototypische Entwicklung der Warn- und Lageinformationsplattform OpenWarnDE 2.0 |
| **Projektart**                  | Einzelprojekt (Vorbereitung AP2)                                                                   |
| **Zeitraum**                    | 28.08.2026 – 24.01.2027                                                                            |
| **Projektantrag**               | **28.08.2026**                                                                                     |
| **Soll-/Ist-Analyse + Planung** | **27.11.2026**                                                                                     |
| **Dokumentation**               | **24.01.2027**                                                                                     |
| **Präsentation**                | **25.01.–29.01.2027**                                                                              |

---

## 2. Ausgangssituation (IST)

OpenWarnDEV ist eine bestehende Vorversion der OpenWarnDE-Plattform. Im geprüften Stand verfügt es über eine Webanwendung, eine Capacitor-Integration mit Android-Projekt, Kartenfunktionen und Geolocation. Firebase ist für Hosting- und Deployment-Konfiguration nachweisbar. Datenquellen, Administration und serverseitige Verarbeitung sind in der Dokumentation beschrieben, im Code jedoch nicht als implementierte Komponenten nachweisbar.

Die bestehende Codebasis und Dokumentation sind historisch gewachsen. Anforderungen, Architekturentscheidungen, Feature-Ideen und Implementierungsdetails sind teilweise miteinander vermischt und erschweren dadurch eine strukturierte Weiterentwicklung.

OpenWarnDEV soll daher nicht einfach weiterentwickelt oder unverändert übernommen werden, sondern als Vorprojekt, Prototyp und Wissensbasis für einen strukturierten Neustart dienen.

### Projektressourcen

- **OpenWarnDEV (Ausgangssystem):** https://github.com/FlorianCramer/OpenWarnDEV
- **OpenWarnDE (OpenWarnDE 2.0 / Zielprojekt):** https://github.com/FlorianCramer/OpenWarnDE

---

## 3. Projektziel (SOLL)

Ziel des Projekts ist die strukturierte Neukonzeption von **OpenWarnDE 2.0** auf Basis einer Analyse des bestehenden OpenWarnDEV-Projekts sowie die prototypische Umsetzung eines klar abgegrenzten MVP.

OpenWarnDE 2.0 soll dabei grundsätzlich als modulare Plattform mit klar getrennten Verantwortlichkeiten konzipiert werden:

- **OpenWarnDE App** als Nutzeranwendung
- **OpenWarnDE Admin** als Verwaltungs- und Betreiberoberfläche
- **OpenWarnDE Backend / Processing** zur zentralen Verarbeitung und Bereitstellung von Daten

Die konkrete technische Ausgestaltung und der Umfang der einzelnen Komponenten werden im Rahmen der Anforderungs- und Architekturphase festgelegt.

### Teilziele

- Ist-Analyse des bestehenden OpenWarnDEV-Systems
- Analyse und Priorisierung der Anforderungen
- Stakeholder- und Umfeldanalyse
- Definition des Projektumfangs
- Entwicklung eines Soll-Konzepts
- Entwurf einer nachvollziehbaren System- und Softwarearchitektur
- Vergleich und Begründung relevanter Lösungsalternativen
- Definition eines abgegrenzten MVP
- prototypische Umsetzung ausgewählter Kernfunktionen
- Qualitätssicherung und Tests
- Dokumentation und interne Abnahme

Der verbindliche Umfang des Schul-MVPs ist in [anforderungen.md](../02-analysis-and-planning/anforderungen.md) festgelegt. Änderungen daran werden begründet dokumentiert und nur vorgenommen, wenn sie innerhalb des Zeitbudgets erforderlich sind.

---

## 4. Projektergebnis

Am Projektende liegen folgende Ergebnisse vor:

- Ist-Analyse des bestehenden OpenWarnDEV-Systems
- Stakeholder- und Umfeldanalyse
- Anforderungskatalog für OpenWarnDE 2.0
- Soll-/Ist-Vergleich
- definierter und abgegrenzter Projektumfang
- Variantenvergleich mit begründeter Entscheidung
- System- und Softwarearchitektur für den betrachteten Projektumfang
- MVP-Definition und einfache Releaseplanung
- prototypische Implementierung ausgewählter Kernfunktionen
- Testnachweise und Qualitätssicherung
- Entwicklerdokumentation
- Benutzerdokumentation für die umgesetzten Funktionen
- intern getesteter und abgenommener Prototyp

### Abgrenzung

Das Schulprojekt bildet nur einen **definierten Teil des langfristigen OpenWarnDE-2.0-Projekts** ab.

Nicht Bestandteil des Projekts sind insbesondere:

- vollständige Abdeckung sämtlicher deutscher Datenquellen
- vollständige Umsetzung aller geplanten Karten- und BOS-Funktionen
- Entwicklung eines vollständigen Einsatzleitsystems
- vollständige Integration sämtlicher BOS-Systeme
- Umsetzung sämtlicher langfristig geplanter OpenWarnDE-Funktionen

Der konkrete Funktionsumfang wird über die Anforderungsanalyse und die MVP-Priorisierung festgelegt.

---

## 5. Vorgehensweise

**Vorgehensmodell:** Phasenorientiertes Vorgehen mit iterativen Entwicklungsabschnitten.

### Projektphasen

1. Projektvorbereitung
2. Ist-Analyse von OpenWarnDEV
3. Stakeholder- und Anforderungsanalyse
4. Soll-Konzept und Architektur
5. Variantenvergleich und MVP-Definition
6. Prototypische Implementierung
7. Qualitätssicherung und Abnahme
8. Dokumentation und Präsentation

Die Dokumentation wird während des gesamten Projekts fortlaufend gepflegt.

Da das Projekt als Einzelprojekt durchgeführt wird, werden Projektplanung, Entwicklung, Qualitätssicherung und Dokumentation durch den Projektverantwortlichen durchgeführt.

---

## 6. Meilensteinplan

| Phase      | Meilenstein                           |  Aufwand |
| ---------- | ------------------------------------- | -------: |
| 1          | Projektvorbereitung und Projektantrag |      4 h |
| 2          | Ist-Analyse OpenWarnDEV               |      6 h |
| 3          | Stakeholder- und Anforderungsanalyse  |      6 h |
| 4          | Soll-Konzept und Architektur          |      6 h |
| 5          | Variantenvergleich und MVP-Definition |      4 h |
| 6          | Prototypische Implementierung         |     38 h |
| 7          | Qualitätssicherung und Abnahme        |      8 h |
| 8          | Dokumentation und Präsentation        |      8 h |
| **Gesamt** |                                       | **80 h** |

> Die konkrete Aufgaben- und Zeitplanung wird im Rahmen der Projektplanung weiter detailliert und bei Bedarf angepasst.

---

## 7. Werkzeuge und Technologien

Die endgültige Technologieauswahl wird auf Grundlage der Anforderungen und der geplanten Architektur bewertet und begründet.

Als technische Ausgangsbasis aus OpenWarnDEV werden insbesondere folgende Technologien betrachtet:

- TypeScript
- React / Next.js
- Capacitor
- MapLibre
- Firebase
- Git / GitHub
- GitHub Actions
- automatisierte Tests

Die Übernahme bestehender Technologien ist nicht vorausgesetzt. Ihre Eignung für OpenWarnDE 2.0 wird im Rahmen des Variantenvergleichs und der Architekturplanung bewertet.

---

## 8. Wirtschaftlicher Nutzen

Der strukturierte Neustart von OpenWarnDE soll langfristig einen technisch und organisatorisch wartbareren Entwicklungsstand ermöglichen.

Der erwartete Nutzen liegt insbesondere in:

- verbesserter Wartbarkeit
- klarer Trennung der Systemverantwortlichkeiten
- besserer Erweiterbarkeit
- Reduzierung technischer Schulden
- Verringerung von Entwicklungsrisiken
- nachvollziehbaren Technologieentscheidungen
- besserer Wiederverwendbarkeit und Wartbarkeit der Komponenten

Im Rahmen des Variantenvergleichs werden geeignete Lösungsansätze hinsichtlich Entwicklungsaufwand, Wartbarkeit, Erweiterbarkeit, Risiken, Abhängigkeiten und gegebenenfalls Betriebskosten bewertet.

---

## 9. Qualitätssicherung

Die Qualität des Prototyps wird durch automatisierte und manuelle Prüfungen sichergestellt.

Geplant sind, abhängig vom tatsächlich umgesetzten MVP:

- API- und Integrationstests
- Linting und Type Checking
- Build-Checks
- Security-Checks
- Performance-Prüfungen
- manuelle Funktionstests
- Abgleich der implementierten Funktionen mit den priorisierten Anforderungen
- interne Abnahme des Prototyps

Der konkrete Testumfang wird an den tatsächlich umgesetzten Funktionsumfang angepasst.

---

## 10. Risikoanalyse

| Risiko                                    | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme                                                    |
| ----------------------------------------- | ------------------ | ---------- | ---------------------------------------------------------------- |
| Zeitmangel                                | hoch               | mittel     | realistische Planung und Priorisierung                           |
| Projektumfang zu groß                     | mittel             | hoch       | klare Abgrenzung und konsequente MVP-Priorisierung               |
| Technische Probleme bei der Neukonzeption | mittel             | mittel     | frühzeitige technische Validierung und Prototypen                |
| Unklare Anforderungen                     | mittel             | hoch       | strukturierte Anforderungsanalyse und Priorisierung              |
| Abhängigkeit von externen Diensten        | mittel             | mittel     | Abhängigkeiten frühzeitig identifizieren und Alternativen prüfen |
| Fehler bei der Architekturplanung         | gering             | hoch       | Variantenvergleich, Dokumentation und schrittweise Validierung   |

---

## 11. Bewertungsbezug

Die Projektdokumentation berücksichtigt typische Bestandteile einer strukturierten schulischen Projektarbeit. Eine exakte Übereinstimmung mit einem nicht vorliegenden Arbeitsauftrag kann nicht verifiziert werden:

- **Ist-/Sollanalyse**
- **Projektplanung**
- **Projektdurchführung**
- **Projektergebnisse**
- **Kundendokumentation**
- **formale und inhaltliche Gestaltung der Dokumentation**

Die für das Projekt relevanten Bereiche wie Anforderungsanalyse, Variantenvergleich, Wirtschaftlichkeit, Ressourcenplanung, Qualitätssicherung sowie Tests und Abnahme werden entsprechend berücksichtigt.

---

## 12. Unterschriften <!-- (Werden Privat gehalten) -->

| Rolle                   | Name               | Datum      | Unterschrift       |
| ----------------------- | ------------------ | ---------- | ------------------ |
| Projektverantwortlicher | Florian Cramer     | __.__.2026 | __________________ |
| Lehrkraft               | __________________ | __.__.2026 | __________________ |

---

## 13. Geplante Anlagen

- [x] Ist-Analyse des bestehenden OpenWarnDEV-Systems
- [x] Stakeholderanalyse
- [x] Anforderungsliste
- [x] Projekt- und Zeitplan

---

> **Hinweis:** Dieser Projektantrag bildet die Grundlage für die weitere Projektplanung, Durchführung, Dokumentation und Präsentation im Rahmen des Miniprojekts LF12.