# Soll-/Ist-Vergleich – OpenWarnDE 2.0

**Projekt:** OpenWarnDE 2.0  
**Ausgangssystem:** OpenWarnDEV  
**Zielsystem:** OpenWarnDE 2.0 MVP  
**Grundlage:** Ist-Analyse und Anforderungskatalog  
**Analyseziel:** Gegenüberstellung des bestehenden Zustands und des für das Schulprojekt definierten Soll-Zustands

---

## 1. Zweck des Soll-/Ist-Vergleichs

Der Soll-/Ist-Vergleich stellt den bestehenden technischen und fachlichen Zustand von OpenWarnDEV dem geplanten Zustand von OpenWarnDE 2.0 gegenüber.

Der Vergleich dient dazu, bestehende Unterschiede, fehlende Funktionen, technische Verbesserungsmöglichkeiten und notwendige Entwicklungsschritte zu identifizieren.

Der Soll-Zustand orientiert sich dabei nicht an der vollständigen langfristigen Vision von OpenWarnDE, sondern am für das Schulprojekt definierten MVP.

Dadurch wird der Projektumfang bewusst begrenzt und eine realistische Umsetzung innerhalb des vorgesehenen Projektzeitraums ermöglicht.

---

## 2. Grundsätzlicher Vergleich

| Bereich               | IST – OpenWarnDEV                                                 | SOLL – OpenWarnDE 2.0 MVP                                      |
| --------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------- |
| **Projektstruktur**   | Historisch gewachsene Struktur                                    | Neu strukturierte und klar abgegrenzte Projektstruktur         |
| **Anwendung**         | Webanwendung; Capacitor-Integration und Android-Projekt vorhanden | Neue grundlegende Client-Anwendung                             |
| **Karte**             | Bereits vorhanden und teilweise erweitert                         | Klare, erweiterbare Kartenkomponente                           |
| **Standort**          | Geolocation bereits vorhanden                                     | Standortbestimmung und Darstellung als definierte Kernfunktion |
| **Suche**             | Nicht als klar abgegrenzte MVP-Anforderung definiert              | Kartensuche als Kernfunktion                                   |
| **Kartendarstellung** | Mehrere bestehende bzw. geplante Funktionen                       | Definierte und anpassbare Kartendarstellung                    |
| **Verwaltung**        | Dokumentiert/geplant, im Frontend nicht auffindbar                | Funktionierende grundlegende Verwaltungsoberfläche             |
| **Push**              | Dokumentiert/geplant, nicht implementiert                         | Manuelles Erstellen und Auslösen von Push-Nachrichten          |
| **Datenquellen**      | Dokumentiert/geplant, nicht im Code auffindbar                    | Keine umfangreiche externe Datenverarbeitung im MVP            |
| **Datenverarbeitung** | Dokumentiert/geplant, nicht implementiert                         | Nicht Bestandteil des Schul-MVP                                |
| **API**               | Langfristig vorgesehen, nicht implementiert                       | Nicht Bestandteil des Schul-MVP                                |
| **Architektur**       | Teilweise vermischte Verantwortlichkeiten                         | Klare Systemgrenzen und Erweiterbarkeit                        |
| **Tests**             | Android-Beispieltests und Build-Prüfungen vorhanden               | MVP-bezogenes Test- und Qualitätssicherungskonzept             |
| **Dokumentation**     | Bestehende technische Dokumentation vorhanden                     | Strukturierte und eindeutige Projektdokumentation              |

---

## 3. Projektstruktur

### 3.1 IST-Zustand

OpenWarnDEV ist über mehrere Entwicklungsphasen gewachsen.

Die bestehende Repository-Struktur enthält neben dem Anwendungscode auch Dokumentation, Konfigurationen und CI/CD-Workflows.

Dabei sind Anforderungen, technische Entscheidungen, geplante Funktionen und bereits implementierte Bestandteile teilweise miteinander verbunden.

Eine klare Trennung der zukünftigen Systemkomponenten ist noch nicht vollständig umgesetzt.

### 3.2 SOLL-Zustand

OpenWarnDE 2.0 soll auf einer neu definierten und strukturierten Projektgrundlage aufgebaut werden.

Die Projektstruktur soll:

- Verantwortlichkeiten klar trennen,
- eine spätere Erweiterung ermöglichen,
- technische Entscheidungen nachvollziehbar machen,
- Anforderungen und Implementierung voneinander trennen,
- Tests und Qualitätssicherung unterstützen.

Die Struktur soll dabei bereits auf die langfristige Erweiterung um weitere Komponenten vorbereitet sein.

### 3.3 Handlungsbedarf

Für den MVP ist eine neue Projektstruktur zu definieren und initial umzusetzen.

Eine direkte Übernahme der gesamten bestehenden Struktur von OpenWarnDEV ist nicht vorgesehen.

---

## 4. Client-Anwendung

### 4.1 IST-Zustand

OpenWarnDEV verfügt über eine Webanwendung sowie eine Capacitor-Integration mit vorhandenem Android-Projekt. Eine vollständig entwickelte mobile Anwendung ist daraus nicht abzuleiten.

Die bestehende Anwendung enthält unter anderem Karten-, Standort- und UI-Funktionen.

### 4.2 SOLL-Zustand

Für OpenWarnDE 2.0 soll eine neue Client-Anwendung als Grundlage des MVP entwickelt werden.

Diese soll mindestens folgende Kernbereiche enthalten:

- grundlegende Navigation
- Kartenansicht
- Standortanzeige
- Kartensuche
- anpassbare Kartendarstellung

Die Anwendung soll so strukturiert sein, dass spätere Warnungs- und Datenfunktionen integriert werden können.

### 4.3 Handlungsbedarf

Die grundlegende Client-Struktur muss neu definiert und implementiert werden.

Bestehende Komponenten aus OpenWarnDEV können hinsichtlich einer möglichen Wiederverwendung geprüft werden, werden jedoch nicht automatisch übernommen.

---

## 5. Kartenfunktion

### 5.1 IST-Zustand

Die Karte stellt bereits einen wesentlichen Bestandteil von OpenWarnDEV dar.

Vorhanden bzw. vorgesehen sind unter anderem:

- interaktive Kartenansicht
- Geolocation
- Kartenlayer
- Standortdarstellung
- 3D-Funktionen
- weitere geografische Informationen

Als Kartenbibliothek wird MapLibre GL JS verwendet.

### 5.2 SOLL-Zustand

Die Karte soll im OpenWarnDE-2.0-MVP eine der zentralen Funktionen darstellen.

Der MVP soll mindestens ermöglichen:

- Anzeige einer interaktiven Karte
- Verschieben des Kartenausschnitts
- Zoomen
- Anzeige des eigenen Standorts
- Zentrierung auf den eigenen Standort
- Suche nach Orten
- Darstellung eines Suchergebnisses
- Anpassung der Kartendarstellung

Die Kartenarchitektur soll so gestaltet werden, dass später weitere Layer und Warninformationen ergänzt werden können.

### 5.3 Handlungsbedarf

Die bestehende Kartenfunktion muss hinsichtlich ihrer Wiederverwendbarkeit bewertet werden.

Für den MVP wird eine klare und reduzierte Kartenarchitektur benötigt.

Komplexe Funktionen wie 3D-Karten, operative Layer oder umfangreiche geografische Daten sind nicht Bestandteil des Schul-MVPs.

---

## 6. Standortbestimmung

### 6.1 IST-Zustand

OpenWarnDEV verwendet bereits Geolocation zur Ermittlung des Benutzerstandorts.

Die Position kann innerhalb der Kartenanwendung verwendet werden.

### 6.2 SOLL-Zustand

Die Standortbestimmung wird als definierte Kernfunktion des MVP umgesetzt.

Der Nutzer soll:

1. die erforderliche Standortberechtigung erteilen können,
2. seinen aktuellen Standort ermitteln können,
3. den Standort auf der Karte sehen können,
4. die Karte auf den eigenen Standort zentrieren können.

Fehler bei der Standortbestimmung sollen verständlich behandelt werden.

### 6.3 Handlungsbedarf

Die bestehende Geolocation-Funktion wird hinsichtlich ihrer technischen Eignung für die neue Projektstruktur geprüft und anschließend in die neue Client-Architektur integriert oder neu umgesetzt.

---

## 7. Kartensuche

### 7.1 IST-Zustand

Eine eigenständige Suchfunktion ist im bisherigen Projekt nicht als klar abgegrenzter Bestandteil des Schul-MVPs definiert.

### 7.2 SOLL-Zustand

OpenWarnDE 2.0 soll eine Kartensuche bereitstellen.

Der Nutzer soll nach einem Ort suchen können.

Nach Auswahl eines Suchergebnisses soll:

- das Ergebnis auf der Karte angezeigt werden,
- die Karte auf den gefundenen Ort zentriert werden.

Wird kein passendes Ergebnis gefunden, soll eine verständliche Rückmeldung erfolgen.

### 7.3 Handlungsbedarf

Eine geeignete Suchlösung muss ausgewählt, technisch integriert und getestet werden.

Dabei sollen unter anderem technische Abhängigkeiten, Datenqualität, Kosten und Erweiterbarkeit berücksichtigt werden.

---

## 8. Kartendarstellung

### 8.1 IST-Zustand

OpenWarnDEV verwendet bereits eine Kartenbibliothek und enthält verschiedene Ansätze für Kartenstile, Layer und zusätzliche Darstellungen.

Durch den historisch gewachsenen Funktionsumfang ist jedoch noch keine eindeutige MVP-Abgrenzung vorhanden.

### 8.2 SOLL-Zustand

OpenWarnDE 2.0 soll eine klar definierte Kartendarstellung verwenden.

Die Kartendarstellung soll technisch so aufgebaut sein, dass sie später erweitert und angepasst werden kann.

Für den MVP sollen insbesondere grundlegende Darstellungsoptionen berücksichtigt werden.

### 8.3 Handlungsbedarf

Die benötigten Darstellungsoptionen müssen im Rahmen der Architektur- und Anforderungsplanung festgelegt werden.

Nicht benötigte komplexe Darstellungen werden aus dem MVP ausgeschlossen.

---

## 9. Verwaltungsoberfläche

### 9.1 IST-Zustand

OpenWarnDEV sieht bereits administrative Funktionen vor.

Diese sind jedoch noch nicht vollständig als eigenständige und klar abgegrenzte Plattformkomponente umgesetzt.

### 9.2 SOLL-Zustand

OpenWarnDE 2.0 soll eine grundlegende Verwaltungsoberfläche erhalten.

Die Verwaltung soll mindestens:

- erreichbar sein,
- eine Übersicht der verfügbaren Funktionen bereitstellen,
- grundlegende Einstellungen verwalten können,
- administrative Aktionen ausführen können,
- Rückmeldungen über erfolgreiche oder fehlgeschlagene Aktionen anzeigen.

Die Verwaltung soll technisch vom normalen Endnutzerbereich getrennt werden.

### 9.3 Handlungsbedarf

Die für den MVP tatsächlich benötigten Verwaltungsfunktionen müssen definiert und anschließend als eigenständiger Bereich umgesetzt werden.

Komplexe Verwaltung von Datenquellen, Warnregeln und automatisierten Verarbeitungsprozessen wird zunächst nicht umgesetzt.

---

## 10. Push-Nachrichten

### 10.1 IST-Zustand

Push-Benachrichtigungen sind in OpenWarnDEV grundsätzlich vorgesehen.

Die langfristige Architektur sieht vor, Warnungen serverseitig zu erzeugen und anschließend an die Anwendung zu übermitteln.

Eine vollständige automatische Warnverarbeitung ist jedoch nicht Bestandteil des aktuellen MVP.

### 10.2 SOLL-Zustand

Der MVP soll das manuelle Auslösen einer Push-Nachricht über die Verwaltungsoberfläche ermöglichen.

Ein Administrator soll:

- einen Titel eingeben,
- einen Nachrichtentext eingeben,
- die Nachricht manuell auslösen können,
- eine Rückmeldung über die Aktion erhalten.

### 10.3 Abgrenzung

Die automatische Erzeugung von Push-Nachrichten aus externen Datenquellen ist nicht Bestandteil des Schulprojekts.

Damit wird die Push-Funktion zunächst als technische Grundlage für die spätere Warnverarbeitung betrachtet.

### 10.4 Handlungsbedarf

Für die manuelle Push-Funktion müssen die benötigten technischen Komponenten und Berechtigungen definiert und implementiert werden.

---

## 11. Datenquellen

### 11.1 IST-Zustand

OpenWarnDEV ist langfristig auf die Integration verschiedener öffentlicher Datenquellen ausgelegt.

Dazu gehören beispielsweise:

- Wetterwarnungen
- Radar- und Niederschlagsdaten
- Hochwasser- und Pegeldaten
- Geländedaten
- Gefahreninformationen
- weitere geografische und operative Daten

Die Datenquellen sind jedoch nicht als vollständig integrierte und einheitliche Datenplattform umgesetzt.

### 11.2 SOLL-Zustand

Die Integration externer Datenquellen ist nicht Bestandteil des Schul-MVPs.

Der MVP muss daher ohne umfangreiche externe Datenquellen funktionsfähig sein.

Die Architektur soll jedoch eine spätere Integration ermöglichen.

### 11.3 Handlungsbedarf

Für das Schulprojekt besteht kein Implementierungsaufwand für die vollständige Datenintegration.

Die spätere Architektur und mögliche Schnittstellen sollen jedoch berücksichtigt werden, damit keine unnötigen technischen Einschränkungen für die Weiterentwicklung entstehen.

---

## 12. Datenverarbeitung

### 12.1 IST-Zustand

Die bestehende OpenWarnDEV-Konzeption sieht eine serverseitige Verarbeitung externer Daten vor.

Das geplante Verfahren umfasst unter anderem:

1. Abruf externer Daten
2. Normalisierung
3. Zusammenführung
4. regionale Bewertung
5. Schwellenwertprüfung
6. Erzeugung von Warnungen
7. Übermittlung an die Anwendung

Diese Verarbeitung ist jedoch nicht vollständig Bestandteil der aktuellen Client-Anwendung.

### 12.2 SOLL-Zustand

Eine vollständige serverseitige Datenverarbeitung ist nicht Bestandteil des Schul-MVPs.

Die Umsetzung wird auf die grundlegenden Funktionen des Clients und der Verwaltung konzentriert. Für Zugriffsschutz, Persistenz und den manuellen Push-Auslösevorgang darf nur die jeweils erforderliche minimale technische Unterstützung eingeplant werden; eine allgemeine Datenverarbeitungsplattform entsteht dadurch nicht.

### 12.3 Handlungsbedarf

Die konkrete Datenverarbeitungsarchitektur wird nach Abschluss des Schulprojekts weiter spezifiziert. Im MVP werden keine realen externen Warnmeldungen automatisch verarbeitet.

Dabei sollen die im MVP getroffenen Architekturentscheidungen eine spätere Erweiterung ermöglichen.

---

## 13. API

### 13.1 IST-Zustand

Eine zentrale OpenWarnDE-API ist als langfristiger Bestandteil der Plattform vorgesehen.

Die API soll zukünftig unter anderem die Kommunikation zwischen Client, Backend und weiteren Anwendungen ermöglichen.

Eine vollständige öffentliche API ist im aktuellen Projektstand jedoch noch nicht umgesetzt.

### 13.2 SOLL-Zustand

Die Entwicklung einer vollständigen öffentlichen API ist nicht Bestandteil des Schul-MVPs.

Die Architektur soll jedoch so geplant werden, dass eine API später eingeführt werden kann.

### 13.3 Handlungsbedarf

Im Rahmen des Schulprojekts wird lediglich darauf geachtet, dass die Architektur eine spätere API-Integration nicht unnötig erschwert.

Die konkrete API-Spezifikation wird als zukünftige Erweiterung behandelt. Interne Schnittstellen werden nur dokumentiert und getestet, wenn sie für die tatsächlich implementierten MVP-Funktionen erforderlich sind.

---

## 14. Administration und Berechtigungen

### 14.1 IST-Zustand

OpenWarnDEV sieht verschiedene Nutzer- und Administrationsszenarien vor.

Eine Authentifizierung, ein Rollenmodell oder eine Zugriffskontrolle ist im geprüften Repository nicht auffindbar. Die Trennung zwischen normalen Endnutzern, autorisierten Nutzern und Administratoren ist nur als konzeptionelles Nutzungsszenario dokumentiert.

### 14.2 SOLL-Zustand

Der MVP soll zwischen normalen Endnutzern und administrativen Funktionen unterscheiden.

Administrative Funktionen müssen vor unberechtigtem Zugriff geschützt werden. Die konkrete technische Umsetzung der Zugriffskontrolle wird vor der Implementierung entschieden und darf nicht ausschließlich auf einer Client-Prüfung beruhen.

Insbesondere das manuelle Auslösen von Push-Nachrichten darf nicht für normale Endnutzer verfügbar sein.

### 14.3 Handlungsbedarf

Für den MVP muss ein grundlegendes Berechtigungs- und Zugriffskonzept definiert und umgesetzt werden.

---

## 15. Qualitätssicherung

### 15.1 IST-Zustand

OpenWarnDEV verfügt bereits über verschiedene automatisierte Entwicklungs- und Build-Prozesse.

Dazu gehören unter anderem:

- Linting
- Build-Prüfungen
- GitHub Actions
- automatisierte Workflows
- erste Teststrukturen

Ein vollständig auf die neue MVP-Architektur abgestimmtes Testkonzept besteht jedoch noch nicht.

### 15.2 SOLL-Zustand

OpenWarnDE 2.0 soll ein auf den MVP abgestimmtes Qualitätssicherungskonzept erhalten.

Mindestens folgende Bereiche sollen geprüft werden:

- Type Checking
- Linting
- Build
- automatisierte Tests
- zentrale Client-Funktionen
- Verwaltungsfunktionen
- Push-Funktion

### 15.3 Handlungsbedarf

Die vorhandenen Qualitätssicherungsmaßnahmen werden bewertet und an die neue Projektstruktur angepasst.

---

## 16. Dokumentation

### 16.1 IST-Zustand

OpenWarnDEV verfügt bereits über technische Dokumentation.

Die vorhandene Dokumentation enthält jedoch teilweise sowohl den tatsächlichen Ist-Zustand als auch geplante oder zukünftige Funktionen.

Dadurch ist die Abgrenzung zwischen implementierten und geplanten Bestandteilen nicht immer eindeutig.

### 16.2 SOLL-Zustand

OpenWarnDE 2.0 soll eine klar strukturierte Dokumentation erhalten.

Insbesondere sollen:

- Anforderungen,
- Architektur,
- technische Entscheidungen,
- Projektumfang,
- Implementierung,
- Tests

und zukünftige Erweiterungen getrennt dokumentiert werden.

### 16.3 Handlungsbedarf

Die Dokumentation wird parallel zur Entwicklung aufgebaut und kontinuierlich aktualisiert.

---

## 17. Architektur

### 17.1 IST-Zustand

OpenWarnDEV enthält bereits Ansätze für eine Trennung zwischen:

- Client
- Server
- Datenintegration
- Warnlogik
- Administration

Diese Trennung ist jedoch noch nicht vollständig als eigenständige Systemarchitektur umgesetzt.

### 17.2 SOLL-Zustand

OpenWarnDE 2.0 soll auf klar definierten Systemgrenzen aufbauen.

Für den MVP stehen insbesondere folgende Bereiche im Mittelpunkt:

- Client-Anwendung
- Verwaltungsoberfläche
- gemeinsame technische Grundlagen
- benötigte Dienste für Standort, Suche und Push

Die Architektur soll später um:

- Datenverarbeitung,
- Datenquellen,
- Backend,
- API

und weitere Plattformkomponenten erweitert werden können.

### 17.3 Handlungsbedarf

Die Zielarchitektur muss vor Beginn der eigentlichen Implementierung definiert und dokumentiert werden.

Dabei müssen Verantwortlichkeiten und Schnittstellen zwischen den Komponenten festgelegt werden.

---

## 18. Projektumfang

### 18.1 IST-Zustand

OpenWarnDEV umfasst beziehungsweise beschreibt einen großen Funktionsumfang.

Neben den grundlegenden Karten- und Warnfunktionen existieren zahlreiche weitere geplante Erweiterungen.

Dadurch besteht ein hohes Risiko, den Entwicklungsumfang zu groß anzusetzen.

### 18.2 SOLL-Zustand

Der Schul-MVP wird bewusst auf einen begrenzten Funktionsumfang reduziert.

#### Muss

- grundlegende Projektstruktur
- Client-Anwendung
- interaktive Karte
- Standortbestimmung
- Darstellung des eigenen Standorts
- Kartensuche
- grundlegende Anpassung der Kartendarstellung
- Verwaltungsoberfläche
- manuelles Erstellen und Auslösen von Push-Nachrichten
- grundlegende Zugriffskontrolle
- Qualitätssicherung
- Dokumentation

#### Soll

- erweiterte Kartendarstellung
- zusätzliche Verwaltungseinstellungen
- zusätzliche automatisierte Tests
- weitere vorbereitende Komponenten für spätere Erweiterungen

#### Nicht Bestandteil

- umfangreiche externe Datenquellen
- automatische Datenverarbeitung
- Normalisierung externer Daten
- automatische Warnlogik
- vollständige öffentliche API
- komplexe BOS-Funktionen
- vollständige Offline-Funktionalität
- umfangreiche 3D-Funktionen
- vollständiges Monitoring

---

## 19. Wichtigste Unterschiede

Aus dem Vergleich ergeben sich folgende zentrale Veränderungen:

| Nr. | Veränderung                      | Bedeutung                                                         |
| --- | -------------------------------- | ----------------------------------------------------------------- |
| 1   | Neustart der Projektstruktur     | Schafft eine klare technische Grundlage                           |
| 2   | Klare MVP-Abgrenzung             | Reduziert den Projektumfang auf realistisch umsetzbare Funktionen |
| 3   | Neue Client-Grundlage            | Ermöglicht eine strukturierte Weiterentwicklung                   |
| 4   | Karte als Kernfunktion           | Schafft die zentrale Benutzeroberfläche des MVP                   |
| 5   | Standortfunktion                 | Ermöglicht eine standortbezogene Nutzung                          |
| 6   | Kartensuche                      | Erweitert die praktische Nutzbarkeit der Karte                    |
| 7   | Anpassbare Kartendarstellung     | Bereitet zukünftige Kartenfunktionen vor                          |
| 8   | Eigenständige Verwaltung         | Schafft eine Grundlage für spätere Administration                 |
| 9   | Manuelle Push-Nachrichten        | Ermöglicht einen ersten vollständigen Verwaltungsworkflow         |
| 10  | Keine externe Datenverarbeitung  | Bewusste Abgrenzung des Schulprojekts                             |
| 11  | Vorbereitung auf API und Backend | Ermöglicht spätere Erweiterungen                                  |
| 12  | Definiertes Testkonzept          | Erhöht die Qualität und Nachvollziehbarkeit                       |

---

## 20. Priorisierte Maßnahmen

Aus dem Soll-/Ist-Vergleich ergeben sich folgende Maßnahmen für das Schulprojekt:

### Priorität 1 – Projektgrundlage

- neue Projektstruktur erstellen
- grundlegende Architektur definieren
- Entwicklungsumgebung und Buildprozess einrichten
- grundlegende Client-Struktur implementieren

### Priorität 2 – Kartenfunktionen

- Kartenintegration
- Kartendarstellung
- Standortbestimmung
- Standortanzeige
- Kartensuche
- Anpassung der Kartendarstellung

### Priorität 3 – Verwaltung

- Verwaltungsoberfläche
- grundlegende Zugriffskontrolle
- grundlegende Konfiguration
- manuelles Erstellen von Push-Nachrichten
- manuelles Auslösen von Push-Nachrichten

### Priorität 4 – Qualitätssicherung

- Type Checking
- Linting
- Build-Prüfungen
- automatisierte Tests
- manuelle Funktionsprüfung

### Priorität 5 – Dokumentation

- technische Dokumentation
- Architektur
- Anforderungen
- Testdokumentation
- Abnahme

---

## 21. Nicht umgesetzte Differenzen

Nicht jede im Soll-/Ist-Vergleich festgestellte Differenz wird innerhalb des Schulprojekts umgesetzt.

Insbesondere die folgenden Unterschiede bleiben bewusst offen:

- externe Datenquellen
- zentrale Datenverarbeitung
- automatische Warnverarbeitung
- öffentliche API
- komplexe Backend-Funktionen
- umfangreiche Administration
- erweiterte BOS-Funktionen
- umfangreiche Offline- und 3D-Funktionen

Diese Punkte werden als zukünftige Erweiterungen von OpenWarnDE 2.0 betrachtet.

Damit wird verhindert, dass der Schul-MVP durch langfristige Produktziele überladen wird.

---

## 22. Ziel des Soll-/Ist-Vergleichs

Der Soll-/Ist-Vergleich zeigt, dass OpenWarnDEV bereits eine umfangreiche technische Grundlage und wertvolle Entwicklungserfahrungen bietet, jedoch nicht unverändert als Grundlage für den neuen MVP übernommen werden soll.

Der geplante Neustart konzentriert sich deshalb zunächst auf eine klare technische Basis mit Karten-, Standort-, Such-, Verwaltungs- und Push-Funktionen.

Die komplexeren Bereiche der langfristigen OpenWarnDE-Plattform werden bewusst vorbereitet, aber aus dem Schulprojekt herausgehalten.

Damit entsteht ein klar abgegrenzter und innerhalb des Projektzeitraums realistischer MVP, der gleichzeitig als technische Grundlage für die weitere Entwicklung von OpenWarnDE 2.0 dienen kann.