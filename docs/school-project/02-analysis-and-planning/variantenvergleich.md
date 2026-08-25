# Variantenvergleich – OpenWarnDE 2.0

**Projekt:** OpenWarnDE 2.0
**Projektphase:** Vorbereitung AP2
**Vergleichsziel:** Auswahl einer geeigneten technischen und organisatorischen Grundlage für den OpenWarnDE 2.0 MVP

---

## 1. Zweck des Variantenvergleichs

Im Rahmen des Projekts soll nicht ausschließlich die bestehende technische Lösung aus OpenWarnDEV übernommen werden.

Da OpenWarnDE 2.0 als strukturierter Neustart geplant ist, müssen verschiedene Lösungsvarianten hinsichtlich ihrer Eignung für den geplanten MVP bewertet werden.

Der Variantenvergleich betrachtet insbesondere:

* technische Eignung
* Entwicklungsaufwand
* Wartbarkeit
* Erweiterbarkeit
* Betriebskosten
* Abhängigkeiten
* technische Risiken
* vorhandenes Wissen
* Eignung für den geplanten Projektumfang

Ziel ist es, eine begründete Entscheidung für die technische Grundlage des Schul-MVPs zu treffen.

---

# 2. Ausgangslage

Der MVP soll zunächst folgende Kernbereiche ermöglichen:

* grundlegende Client-Anwendung
* interaktive Karte
* Standortbestimmung
* Darstellung des eigenen Standorts
* Kartensuche
* anpassbare Kartendarstellung
* grundlegende Verwaltungsoberfläche
* manuelles Erstellen und Auslösen von Push-Nachrichten

Die umfangreiche Verarbeitung externer Warn- und Informationsdaten, die Integration zahlreicher Datenquellen sowie eine öffentliche OpenWarnDE-API sind ausdrücklich nicht Bestandteil des Schul-MVPs.

Die gewählte Lösung muss jedoch eine spätere Erweiterung um diese Funktionen ermöglichen.

---

# 3. Bewertete Varianten

Für die technische Grundlage werden drei Varianten betrachtet.

### Variante A – Weiterentwicklung von OpenWarnDEV

Die bestehende Codebasis wird weiterverwendet und schrittweise um die Anforderungen des OpenWarnDE-2.0-MVPs erweitert.

### Variante B – Vollständiger technischer Neustart

OpenWarnDE 2.0 wird vollständig neu aufgebaut. Bestehende OpenWarnDEV-Komponenten werden grundsätzlich nicht übernommen.

### Variante C – Strukturierter Neustart mit gezielter Wiederverwendung

OpenWarnDE 2.0 wird als neues Projekt aufgebaut. Bestehende Komponenten, Erfahrungen und technische Lösungen aus OpenWarnDEV werden jedoch einzeln bewertet und nur bei ausreichender Eignung übernommen.

---

# 4. Bewertungskriterien

Die Varianten werden anhand der folgenden Kriterien bewertet.

| Kriterium               | Bedeutung                                                                    |
| ----------------------- | ---------------------------------------------------------------------------- |
| **Technische Eignung**  | Wie gut unterstützt die Variante die Anforderungen des MVP?                  |
| **Entwicklungsaufwand** | Wie hoch ist der Aufwand für die Umsetzung?                                  |
| **Wartbarkeit**         | Wie gut kann das System langfristig gepflegt werden?                         |
| **Erweiterbarkeit**     | Wie einfach können zukünftige OpenWarnDE-Funktionen ergänzt werden?            |
| **Betriebskosten**      | Welche laufenden Kosten können durch die Lösung entstehen?                   |
| **Abhängigkeiten**      | Wie stark ist die Lösung von bestehenden oder externen Komponenten abhängig? |
| **Risiko**              | Wie hoch ist das technische und organisatorische Projektrisiko?              |
| **Vorhandenes Wissen**  | Wie gut kann bereits vorhandenes Wissen genutzt werden?                      |
| **MVP-Eignung**         | Wie gut eignet sich die Variante für den begrenzten Schulprojektumfang?      |

---

# 5. Bewertungsskala

Die Bewertung erfolgt auf einer Skala von **1 bis 5 Punkten**.

| Punkte | Bewertung     |
| -----: | ------------- |
|  **1** | sehr schlecht |
|  **2** | schlecht      |
|  **3** | mittel        |
|  **4** | gut           |
|  **5** | sehr gut      |

Bei Kriterien wie **Entwicklungsaufwand**, **Betriebskosten** und **Risiko** bedeutet eine hohe Punktzahl eine günstige Ausprägung, also beispielsweise einen geringen Aufwand, geringe Kosten oder ein geringes Risiko.

---

# 6. Variante A – Weiterentwicklung von OpenWarnDEV

## 6.1 Beschreibung

Bei dieser Variante wird OpenWarnDEV als direkte technische Grundlage verwendet.

Die bestehenden Komponenten werden weiterentwickelt und an die Anforderungen von OpenWarnDE 2.0 angepasst.

Die Kartenfunktion, Geolocation, vorhandene Projektstrukturen und weitere bereits vorhandene Komponenten könnten direkt weiterverwendet werden.

## 6.2 Vorteile

* bereits vorhandene technische Grundlage
* vorhandene Funktionen können weiterverwendet werden
* geringerer initialer Implementierungsaufwand
* bereits vorhandenes Wissen über die Codebasis
* bestehende Entwicklungs- und Buildprozesse können weiter genutzt werden
* geringeres Risiko, bekannte Funktionen vollständig neu implementieren zu müssen

## 6.3 Nachteile

* bestehende strukturelle Probleme werden möglicherweise übernommen
* historische Entscheidungen beeinflussen die neue Architektur
* technische Altlasten können den weiteren Aufbau erschweren
* klare Abgrenzung zwischen alten und neuen Komponenten kann schwierig werden
* langfristige Erweiterbarkeit kann durch bestehende Strukturen eingeschränkt werden
* der gewünschte strukturierte Neustart wird nur teilweise erreicht

## 6.4 Bewertung

| Kriterium           |      Punkte |
| ------------------- | ----------: |
| Technische Eignung  |           3 |
| Entwicklungsaufwand |           5 |
| Wartbarkeit         |           2 |
| Erweiterbarkeit     |           2 |
| Betriebskosten      |           4 |
| Abhängigkeiten      |           2 |
| Risiko              |           3 |
| Vorhandenes Wissen  |           5 |
| MVP-Eignung         |           4 |
| **Gesamt**          | **30 / 45** |

---

# 7. Variante B – Vollständiger technischer Neustart

## 7.1 Beschreibung

Bei dieser Variante wird OpenWarnDE 2.0 vollständig neu entwickelt.

Die Erfahrungen aus OpenWarnDEV können in die Konzeption einfließen, bestehende technische Komponenten werden jedoch nicht übernommen.

Die Architektur, Projektstruktur und Implementierung werden vollständig neu definiert.

## 7.2 Vorteile

* vollständig kontrollierbare Architektur
* keine direkte Übernahme bestehender Altlasten
* klare Projektstruktur von Beginn an
* Anforderungen können direkt in die Architektur einfließen
* gute langfristige Erweiterbarkeit
* klare Trennung zwischen OpenWarnDEV und OpenWarnDE 2.0

## 7.3 Nachteile

* hoher Entwicklungsaufwand
* bereits funktionierende Komponenten müssen neu implementiert werden
* höherer Zeitbedarf
* höheres Risiko für neue Implementierungsfehler
* vorhandene technische Lösungen werden möglicherweise unnötig verworfen
* für ein Einzelprojekt besteht ein erhöhtes Risiko, den MVP nicht vollständig fertigzustellen

## 7.4 Bewertung

| Kriterium           |      Punkte |
| ------------------- | ----------: |
| Technische Eignung  |           5 |
| Entwicklungsaufwand |           1 |
| Wartbarkeit         |           5 |
| Erweiterbarkeit     |           5 |
| Betriebskosten      |           4 |
| Abhängigkeiten      |           5 |
| Risiko              |           2 |
| Vorhandenes Wissen  |           3 |
| MVP-Eignung         |           2 |
| **Gesamt**          | **32 / 45** |

---

# 8. Variante C – Strukturierter Neustart mit gezielter Wiederverwendung

## 8.1 Beschreibung

Bei dieser Variante wird OpenWarnDE 2.0 als eigenständiges und strukturiertes Projekt neu aufgebaut.

OpenWarnDEV dient dabei als **Ist-System, Wissensbasis und Referenz**.

Bestehende Komponenten werden nicht automatisch übernommen. Stattdessen wird für jede relevante Komponente geprüft:

* Ist die Funktion für OpenWarnDE 2.0 weiterhin erforderlich?
* Entspricht die technische Umsetzung den neuen Anforderungen?
* Ist die Komponente wartbar?
* Kann sie in die neue Architektur integriert werden?
* Ist eine Neuimplementierung sinnvoller?

Nur geeignete Komponenten oder technische Ansätze werden übernommen.

## 8.2 Vorteile

* strukturierter Neustart
* bestehende Erfahrungen können genutzt werden
* geeignete technische Komponenten können wiederverwendet werden
* geringerer Aufwand als ein vollständiger Neustart
* bessere Kontrolle über die zukünftige Architektur
* technische Altlasten werden nicht automatisch übernommen
* gute Grundlage für zukünftige Erweiterungen
* OpenWarnDEV kann gezielt als Referenzsystem verwendet werden

## 8.3 Nachteile

* zusätzlicher Analyseaufwand
* Wiederverwendbarkeit muss für einzelne Komponenten geprüft werden
* teilweise doppelte Arbeit möglich
* Architekturentscheidungen müssen bewusst getroffen und dokumentiert werden
* der tatsächliche Implementierungsaufwand kann erst nach der Analyse genauer bestimmt werden

## 8.4 Bewertung

| Kriterium           |      Punkte |
| ------------------- | ----------: |
| Technische Eignung  |           5 |
| Entwicklungsaufwand |           4 |
| Wartbarkeit         |           5 |
| Erweiterbarkeit     |           5 |
| Betriebskosten      |           4 |
| Abhängigkeiten      |           4 |
| Risiko              |           4 |
| Vorhandenes Wissen  |           5 |
| MVP-Eignung         |           5 |
| **Gesamt**          | **41 / 45** |

---

# 9. Gesamtvergleich

| Kriterium           |  Variante A |  Variante B |  Variante C |
| ------------------- | ----------: | ----------: | ----------: |
| Technische Eignung  |           3 |           5 |       **5** |
| Entwicklungsaufwand |       **5** |           1 |           4 |
| Wartbarkeit         |           2 |       **5** |       **5** |
| Erweiterbarkeit     |           2 |       **5** |       **5** |
| Betriebskosten      |           4 |           4 |           4 |
| Abhängigkeiten      |           2 |       **5** |           4 |
| Risiko              |           3 |           2 |       **4** |
| Vorhandenes Wissen  |       **5** |           3 |       **5** |
| MVP-Eignung         |           4 |           2 |       **5** |
| **Gesamt**          | **30 / 45** | **32 / 45** | **41 / 45** |

---

# 10. Entscheidung

Auf Grundlage der Bewertung wird **Variante C – strukturierter Neustart mit gezielter Wiederverwendung** ausgewählt.

Diese Variante bietet für das Schulprojekt das beste Verhältnis zwischen technischem Anspruch, Entwicklungsaufwand und langfristiger Erweiterbarkeit.

Insbesondere wird dadurch vermieden, dass die bestehenden Strukturen von OpenWarnDEV ungeprüft übernommen werden. Gleichzeitig können bereits vorhandenes Wissen, Erfahrungen und technisch geeignete Komponenten weiterhin genutzt werden.

OpenWarnDEV wird deshalb nicht als direkte Codebasis für OpenWarnDE 2.0 betrachtet, sondern als **Ist-System und Wissensbasis**.

---

# 11. Konsequenzen für die Umsetzung

Aus der Entscheidung ergeben sich folgende Grundsätze für die Entwicklung:

1. OpenWarnDE 2.0 erhält eine eigene Projektstruktur.
2. Anforderungen werden vor der Implementierung definiert und priorisiert.
3. Bestehende OpenWarnDEV-Komponenten werden einzeln bewertet.
4. Eine Wiederverwendung erfolgt nur bei ausreichender technischer Eignung.
5. Technische Entscheidungen werden dokumentiert und begründet.
6. Der MVP wird auf die definierten Kernfunktionen begrenzt.
7. Die Architektur wird auf spätere Erweiterungen vorbereitet.
8. Datenquellen, Datenverarbeitung und öffentliche API werden zunächst nicht implementiert.

---

# 12. Technologieentscheidung

Die konkrete Auswahl einzelner Technologien wird auf Grundlage der Anforderungen und der geplanten Architektur getroffen.

Für die bereits bekannte technische Grundlage werden insbesondere folgende Technologien bewertet:

* TypeScript
* React
* Next.js
* Capacitor
* MapLibre
* Firebase
* Git
* GitHub
* GitHub Actions

Dabei wird nicht vorausgesetzt, dass jede Technologie aus OpenWarnDEV automatisch in OpenWarnDE 2.0 übernommen wird.

Die endgültige Auswahl wird anhand der Anforderungen, der technischen Eignung, des Entwicklungsaufwands und der Erweiterbarkeit begründet.

---

# 13. Wirtschaftliche Betrachtung

Für das Schulprojekt stehen keine vollständigen realen Betriebskosten eines produktiven OpenWarnDE-Systems zur Verfügung.

Daher wird die wirtschaftliche Betrachtung auf qualitative Faktoren konzentriert.

### Variante A – Weiterentwicklung

**Vorteile:**

* geringerer initialer Entwicklungsaufwand
* vorhandene Komponenten können weiter genutzt werden
* vorhandene Infrastruktur kann teilweise übernommen werden

**Nachteile:**

* mögliche höhere zukünftige Wartungskosten
* technische Altlasten können weitere Entwicklung verlangsamen
* spätere Anpassungen können durch bestehende Strukturen erschwert werden

### Variante B – Vollständiger Neustart

**Vorteile:**

* langfristig klarere technische Grundlage
* geringere Abhängigkeit von bestehenden Strukturen

**Nachteile:**

* hoher initialer Entwicklungsaufwand
* für ein Einzelprojekt wirtschaftlich und zeitlich schwerer realisierbar

### Variante C – Strukturierter Neustart

**Vorteile:**

* kontrollierter Entwicklungsaufwand
* vorhandenes Wissen kann genutzt werden
* geeignete Komponenten können wiederverwendet werden
* langfristig bessere Wartbarkeit und Erweiterbarkeit

**Nachteile:**

* zusätzlicher Analyseaufwand
* einzelne Komponenten müssen gegebenenfalls doppelt betrachtet oder neu implementiert werden

**Bewertung:**

Für den geplanten MVP stellt Variante C den sinnvollsten Kompromiss zwischen initialem Aufwand und langfristigem Nutzen dar.

---

# 14. Technische und organisatorische Entscheidung

Die Entscheidung für Variante C bedeutet, dass OpenWarnDE 2.0 bewusst als **neues, strukturiertes Projekt** begonnen wird.

Der Entwicklungsprozess folgt dabei dem Prinzip:

> **Analysieren → Bewerten → Entscheiden → Neu strukturieren → gezielt wiederverwenden → implementieren → testen**

Dadurch wird verhindert, dass technische Entscheidungen aus OpenWarnDEV ungeprüft in das neue Projekt übernommen werden.

---

# 15. Ergebnis des Variantenvergleichs

Der Variantenvergleich zeigt, dass sowohl die direkte Weiterentwicklung von OpenWarnDEV als auch ein vollständiger technischer Neustart Nachteile für das geplante Einzelprojekt besitzen.

Die direkte Weiterentwicklung bietet zwar den geringsten Entwicklungsaufwand, würde jedoch einen Teil der bestehenden strukturellen Probleme in OpenWarnDE 2.0 übernehmen.

Ein vollständiger Neustart bietet technisch die größte Freiheit, verursacht für den begrenzten Projektzeitraum jedoch einen zu hohen Entwicklungsaufwand.

Der **strukturierte Neustart mit gezielter Wiederverwendung** verbindet dagegen die Vorteile beider Ansätze.

Diese Variante wird deshalb als Grundlage für die weitere Planung und Umsetzung des OpenWarnDE-2.0-MVPs verwendet.
