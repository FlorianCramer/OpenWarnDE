# Stakeholderanalyse – OpenWarnDE 2.0

**Projekt:** OpenWarnDE 2.0  
**Ausgangssystem:** OpenWarnDEV  
**Analysephase:** Projektvorbereitung / Ist-Analyse

---

## 1. Ziel der Stakeholderanalyse

Die Stakeholderanalyse identifiziert Personen, Gruppen und Organisationen, die Einfluss auf OpenWarnDE 2.0 haben oder durch das System beeinflusst werden.

Ziel ist es, deren Interessen und Anforderungen frühzeitig zu berücksichtigen und daraus relevante Anforderungen für die weitere Projektplanung abzuleiten.

Die Analyse dient insbesondere als Grundlage für:

- die Anforderungsanalyse
- die Priorisierung von Funktionen
- die Definition des MVP
- die Planung von Benutzerrollen
- die spätere Abnahme des Prototyps

---

## 2. Identifizierte Stakeholder

| Stakeholder                          | Rolle / Bezug zum Projekt                                | Interesse | Einfluss  | Priorität |
| ------------------------------------ | -------------------------------------------------------- | --------- | --------- | --------- |
| Endnutzer / Bevölkerung              | Nutzung der Warn- und Informationsfunktionen             | hoch      | mittel    | hoch      |
| Einsatzorganisationen                | Nutzung erweiterter Lage- und Informationsfunktionen     | hoch      | hoch      | hoch      |
| Administratoren                      | Verwaltung des Systems und seiner Konfiguration          | hoch      | hoch      | hoch      |
| Betreiber von Datenquellen           | Bereitstellung externer Warn- und Fachdaten              | mittel    | hoch      | hoch      |
| Projektverantwortlicher / Entwickler | Planung, Entwicklung und Betrieb des Projekts            | sehr hoch | sehr hoch | sehr hoch |
| OpenWarnDE-Projekt                   | langfristige Weiterentwicklung und Betrieb der Plattform | hoch      | hoch      | hoch      |
| Berufsschule / Lehrkraft             | Bewertung des Miniprojekts                               | hoch      | mittel    | mittel    |

---

## 3. Endnutzer / Bevölkerung

### Rolle

Endnutzer verwenden OpenWarnDE zur Anzeige von Warnungen, Lageinformationen und weiteren relevanten Informationen.

### Interessen

- verständliche Warnmeldungen
- schnelle Informationsbereitstellung
- einfache Bedienung
- übersichtliche Darstellung
- zuverlässige Karten- und Standortfunktionen
- Nutzung auf unterschiedlichen Endgeräten

### Relevanz für OpenWarnDE 2.0

Die Anwendung muss auch für Nutzer ohne besondere technische oder fachliche Kenntnisse verständlich und einfach bedienbar sein.

Insbesondere Warninformationen müssen eindeutig und möglichst schnell erfassbar dargestellt werden.

### Abgeleitete Anforderungen

- verständliche Benutzeroberfläche
- responsive Darstellung
- klare Warnungsdarstellung
- einfache Navigation
- zuverlässige Standortdarstellung

---

## 4. Einsatzorganisationen

Zu den möglichen Nutzern erweiterter Funktionen gehören beispielsweise:

- Feuerwehr
- Katastrophenschutz
- weitere Einsatzorganisationen

### Rolle

Einsatzorganisationen können gegenüber normalen Endnutzern zusätzliche Anforderungen an Lageinformationen und operative Funktionen besitzen.

### Interessen

- aktuelle Informationen
- zuverlässige Daten
- geografische Darstellung
- schnelle Erfassung der Lage
- gegebenenfalls erweiterte Informationen für Einsatzsituationen

### Relevanz für OpenWarnDE 2.0

Die Anforderungen dieser Nutzergruppe müssen von den Anforderungen der allgemeinen Bevölkerung getrennt betrachtet werden.

Nicht jede operative Funktion muss Bestandteil des ersten MVP sein.

### Abgeleitete Anforderungen

- klare Trennung unterschiedlicher Nutzungsszenarien
- mögliche rollenbasierte Zugriffe
- zuverlässige Darstellung relevanter Lageinformationen
- Priorisierung operativ relevanter Informationen

Die konkreten Funktionen und Berechtigungen werden in der Anforderungsanalyse weiter definiert.

---

## 5. Administratoren

### Rolle

Administratoren verwalten technische und fachliche Einstellungen des Systems.

Mögliche Aufgaben sind:

- Verwaltung von Datenquellen
- Konfiguration von Warnregeln
- Verwaltung von Schwellenwerten
- Verwaltung regionaler Einstellungen
- Überwachung des Systems

### Interessen

- sichere Administration
- übersichtliche Verwaltung
- nachvollziehbare Änderungen
- zuverlässige Systemfunktionen
- möglichst geringer administrativer Aufwand

### Relevanz für OpenWarnDE 2.0

Die Administration soll von der normalen Benutzeranwendung getrennt betrachtet werden.

Die konkrete Ausgestaltung eines Administrationsbereichs wird im Rahmen der Architektur- und Anforderungsanalyse festgelegt.

---

## 6. Betreiber externer Datenquellen

### Rolle

OpenWarnDE soll Informationen aus externen Datenquellen beziehen.

Dazu können beispielsweise öffentliche Warn-, Wetter-, Pegel- oder Geodaten gehören.

### Interessen

- korrekte Nutzung bereitgestellter Daten
- Einhaltung technischer Vorgaben
- zuverlässige Schnittstellenkommunikation
- nachvollziehbare Verarbeitung der Daten

### Relevanz für OpenWarnDE 2.0

Die Qualität und Verfügbarkeit externer Daten beeinflusst unmittelbar die Qualität der von OpenWarnDE bereitgestellten Informationen.

Daher müssen Datenquellen und deren Schnittstellen im weiteren Projektverlauf bewertet werden.

---

## 7. Projektverantwortlicher / Entwickler

### Rolle

Der Projektverantwortliche ist gleichzeitig Entwickler und führt das Schulprojekt als Einzelprojekt durch.

Zu seinen Aufgaben gehören:

- Projektplanung
- Analyse
- Anforderungsdefinition
- Architekturplanung
- Implementierung
- Qualitätssicherung
- Dokumentation
- Abnahme

### Interessen

- klar abgegrenzter Projektumfang
- technisch sinnvolle Architektur
- wartbare Codebasis
- nachvollziehbare Entscheidungen
- erfolgreiche Umsetzung des MVP
- Einhaltung des verfügbaren Projektumfangs

### Relevanz

Der Projektverantwortliche besitzt einen sehr hohen Einfluss auf das Projekt.

Eine besondere Bedeutung hat deshalb die konsequente Begrenzung des Projektumfangs.

---

## 8. OpenWarnDE-Projekt

### Rolle

OpenWarnDE 2.0 ist das langfristige Zielprojekt, in das die Ergebnisse des Schulprojekts einfließen.

### Interessen

- klare Architektur
- langfristige Wartbarkeit
- Erweiterbarkeit
- geringe technische Schulden
- nachvollziehbare technische Entscheidungen
- definierte Systemgrenzen

### Relevanz

Das Schulprojekt soll nicht die vollständige Entwicklung der langfristig geplanten Plattform abbilden.

Stattdessen soll innerhalb des Schulprojekts ein abgegrenzter MVP entwickelt werden, dessen Architektur und Ergebnisse als Grundlage für die weitere Entwicklung dienen können.

---

## 9. Berufsschule / Lehrkraft

### Rolle

Die Berufsschule beziehungsweise die betreuende Lehrkraft bewertet das Miniprojekt und dessen Dokumentation.

### Interessen

- nachvollziehbare Projektplanung
- strukturierte Durchführung
- fachlich begründete Entscheidungen
- dokumentierter Entwicklungsprozess
- nachvollziehbare Ergebnisse
- Einhaltung der Vorgaben des Arbeitsauftrags

### Relevanz

Die Anforderungen des Schulprojekts bilden einen zusätzlichen Rahmen für die Durchführung.

Der Projektumfang muss daher so gewählt werden, dass die geforderten Analyse-, Planungs-, Entwicklungs- und Dokumentationsleistungen innerhalb des vorgesehenen Zeitbudgets erbracht werden können.

---

## 10. Stakeholder-Matrix

Die Stakeholder werden anhand ihres Einflusses auf das Projekt und ihres Interesses am Projektergebnis eingeordnet.

| Stakeholder                          | Interesse |  Einfluss | Umgang                                           |
| ------------------------------------ | --------: | --------: | ------------------------------------------------ |
| Endnutzer / Bevölkerung              |      hoch |    mittel | Anforderungen berücksichtigen                    |
| Einsatzorganisationen                |      hoch |      hoch | Anforderungen früh berücksichtigen               |
| Administratoren                      |      hoch |      hoch | eng in die Systemplanung einbeziehen             |
| Datenquellenbetreiber                |    mittel |      hoch | technische Abhängigkeiten berücksichtigen        |
| Projektverantwortlicher / Entwickler | sehr hoch | sehr hoch | zentrale Projektsteuerung                        |
| OpenWarnDE-Projekt                   |      hoch |      hoch | Architekturentscheidungen langfristig ausrichten |
| Berufsschule / Lehrkraft             |      hoch |    mittel | Vorgaben und Bewertungskriterien berücksichtigen |

---

## 11. Wichtigste Stakeholder für das MVP

Für das Schulprojekt werden nicht alle Stakeholder gleich stark berücksichtigt.

Die höchste Priorität erhalten:

1. **Endnutzer / Bevölkerung**
2. **Einsatzorganisationen**, soweit Funktionen für diese im MVP vorgesehen werden
3. **Administratoren**
4. **Projektverantwortlicher / Entwickler**
5. **Betreiber relevanter Datenquellen**

Die Berufsschule beziehungsweise Lehrkraft stellt zusätzlich den organisatorischen Rahmen des Schulprojekts dar.

---

## 12. Abgeleitete Projektanforderungen

Aus der Stakeholderanalyse ergeben sich zunächst folgende übergeordnete Anforderungen:

- Warninformationen müssen verständlich dargestellt werden.
- Die Anwendung muss eine einfache und übersichtliche Bedienung ermöglichen.
- Standort- und Karteninformationen müssen sinnvoll dargestellt werden.
- Unterschiedliche Nutzergruppen müssen bei der Anforderungsdefinition berücksichtigt werden.
- Administrative Funktionen müssen von normalen Nutzerfunktionen abgegrenzt werden.
- Externe Datenquellen müssen hinsichtlich Verfügbarkeit und technischer Schnittstellen bewertet werden.
- Sicherheits- und Berechtigungsanforderungen müssen bei geschützten Funktionen berücksichtigt werden.
- Der Funktionsumfang muss auf ein realistisch umsetzbares MVP begrenzt werden.

Diese Anforderungen sind zunächst als **übergeordnete Anforderungen** zu verstehen.

Die konkrete funktionale und nichtfunktionale Spezifikation erfolgt in der anschließenden Anforderungsanalyse.

---

## 13. Offene Punkte

Zum Zeitpunkt der Stakeholderanalyse sind folgende Punkte noch nicht abschließend definiert:

- konkrete Benutzerrollen
- konkrete Berechtigungen
- Umfang der Funktionen für Einsatzorganisationen
- konkrete administrative Funktionen
- endgültige Datenquellen
- konkrete Warnlogik
- Umfang des MVP
- Anforderungen an Offline-Funktionalität
- konkrete Datenschutzanforderungen

Diese Punkte werden im weiteren Projektverlauf untersucht und priorisiert.

---

## 14. Fazit

Die Stakeholderanalyse zeigt, dass OpenWarnDE 2.0 unterschiedliche Nutzergruppen mit teilweise unterschiedlichen Anforderungen adressiert.

Für das Schulprojekt ist insbesondere die Trennung zwischen allgemeiner Warn- und Informationsnutzung, möglichen operativen Nutzungsszenarien und administrativen Aufgaben relevant.

Die Analyse bestätigt außerdem die Notwendigkeit einer klaren MVP-Abgrenzung.

Nicht jede langfristig geplante Funktion von OpenWarnDE 2.0 muss Bestandteil des Schulprojekts werden.

Die ermittelten Stakeholder und Anforderungen bilden die Grundlage für die nächste Phase:

**Anforderungsanalyse und Definition des Soll-Zustands von OpenWarnDE 2.0.**