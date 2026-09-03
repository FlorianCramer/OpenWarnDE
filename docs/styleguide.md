# OpenWarnDE – Global Style Guide

> **Version:** 1.1
> **Status:** Verbindlich
> **Scope:** OpenWarnDE Platform & OpenWarnDE App
> **Technologien:** Next.js, Tailwind CSS, Flowbite (App)

---

# 1. Design-Grundsatz

OpenWarnDE verwendet ein **zentrales, semantisches Farbsystem**.

Komponenten dürfen **keine beliebigen Tailwind-Farben oder Hex-/RGB-Werte** verwenden.

Nicht erlaubt:

```tsx
className="bg-red-500"
className="text-blue-600"
className="border-gray-300"
className="bg-[#123456]"
```

Stattdessen werden ausschließlich die definierten OpenWarnDE-Farbtokens verwendet.

Beispiel:

```tsx
className="bg-danger"
className="text-danger-foreground"
className="border-border"
```

Dadurch bleibt die gesamte Anwendung visuell konsistent.

---

# 2. OpenWarnDE Farbpalette

## 2.1 Primärfarbe

Die Primärfarbe der OpenWarnDE-Produkte ist:

### OpenWarn Blue

```text
HEX: #2563EB
RGB: 37, 99, 235
```

Verwendung:

* primäre Buttons
* aktive Navigation
* Links
* ausgewählte Elemente
* Fokuszustände
* primäre Aktionen
* Brand-Elemente

Token:

```text
primary
primary-foreground
primary-hover
primary-active
primary-muted
```

Grundsätzlich gilt:

```text
primary = #2563EB
```

---

# 3. Neutrale Farben

Neutrale Farben werden für Layout, Flächen, Text und Grenzen verwendet.

## 3.1 Light Theme

```text
background        #F8FAFC
surface           #FFFFFF
surface-muted     #F1F5F9

foreground        #0F172A
foreground-muted  #475569
foreground-subtle #64748B

border            #E2E8F0
border-strong     #CBD5E1
```

### Bedeutung

| Token               | Farbe     | Verwendung            |
| ------------------- | --------- | --------------------- |
| `background`        | `#F8FAFC` | Seitenhintergrund     |
| `surface`           | `#FFFFFF` | Cards, Panels         |
| `surface-muted`     | `#F1F5F9` | sekundäre Flächen     |
| `foreground`        | `#0F172A` | Haupttext             |
| `foreground-muted`  | `#475569` | sekundärer Text       |
| `foreground-subtle` | `#64748B` | Metadaten             |
| `border`            | `#E2E8F0` | Standard-Border       |
| `border-strong`     | `#CBD5E1` | hervorgehobene Border |

---

# 4. Dark Theme

Dark Mode verwendet keine invertierte Light-Palette.

```text
background        #0F172A
surface           #1E293B
surface-muted     #334155

foreground        #F8FAFC
foreground-muted  #CBD5E1
foreground-subtle #94A3B8

border            #334155
border-strong     #475569
```

Tokens bleiben identisch.

Beispiel:

```tsx
className="bg-surface text-foreground"
```

Die tatsächliche Farbe hängt vom Theme ab.

---

# 5. Statusfarben

Statusfarben besitzen eine **feste Bedeutung**.

Sie dürfen nicht für andere Zwecke verwendet werden.

---

## 5.1 Success

Bedeutung:

* erfolgreich
* bestätigt
* normal
* Entwarnung
* abgeschlossen

```text
success            #16A34A
success-hover      #15803D
success-muted      #DCFCE7
success-foreground #FFFFFF
success-text       #166534
```

Verwendung:

```text
✓ Erfolgreich
✓ Bestätigt
✓ Entwarnung
```

---

# 6. Warning

Bedeutung:

* Vorsicht
* Aufmerksamkeit erforderlich
* potenzielles Problem

```text
warning            #F59E0B
warning-hover      #D97706
warning-muted      #FEF3C7
warning-foreground #FFFFFF
warning-text       #92400E
```

Beispiel:

```text
⚠ Vorsicht
```

---

# 7. Danger

Bedeutung:

* Fehler
* gefährliche Situation
* destruktive Aktion

```text
danger            #DC2626
danger-hover      #B91C1C
danger-muted      #FEE2E2
danger-foreground #FFFFFF
danger-text       #991B1B
```

Verwendung:

* Fehlermeldungen
* Löschen
* kritische Systemfehler
* gefährliche Aktionen

---

# 8. Info

Bedeutung:

* Information
* neutraler Hinweis
* zusätzliche Erklärung

```text
info            #0284C7
info-hover      #0369A1
info-muted      #E0F2FE
info-foreground #FFFFFF
info-text       #075985
```

---

# 9. Warnstufen

Die Warnstufen sind ein **eigenständiges Farbsystem**.

Sie dürfen nicht mit normalen UI-Statusfarben vermischt werden.

## 9.1 Warnstufe Grün

```text
severity-low
```

```text
Base:       #16A34A
Background: #DCFCE7
Text:       #166534
```

Bedeutung:

```text
Keine bzw. geringe Gefahr
```

---

## 9.2 Warnstufe Gelb

```text
severity-moderate
```

```text
Base:       #EAB308
Background: #FEF9C3
Text:       #854D0E
```

Bedeutung:

```text
Mäßige Gefahr
```

---

## 9.3 Warnstufe Orange

```text
severity-high
```

```text
Base:       #F97316
Background: #FFEDD5
Text:       #9A3412
```

Bedeutung:

```text
Hohe Gefahr
```

---

## 9.4 Warnstufe Rot

```text
severity-severe
```

```text
Base:       #DC2626
Background: #FEE2E2
Text:       #991B1B
```

Bedeutung:

```text
Sehr hohe Gefahr
```

---

## 9.5 Warnstufe Dunkelrot

```text
severity-extreme
```

```text
Base:       #991B1B
Background: #FECACA
Text:       #7F1D1D
```

Bedeutung:

```text
Extreme / außergewöhnliche Gefahr
```

---

# 10. Warnstufen müssen semantisch bleiben

Warnstufen dürfen niemals anhand einer frei gewählten Farbe implementiert werden.

Nicht:

```tsx
<div className="bg-red-500">
```

Sondern:

```tsx
<WarningBadge severity="severe">
```

oder:

```tsx
<div className="bg-severity-severe">
```

Die Komponente entscheidet intern über die korrekte Farbe.

---

# 11. Farbverwendung

Eine Farbe darf grundsätzlich nur für ihre definierte Bedeutung verwendet werden.

Beispiel:

### Blau

Darf verwendet werden für:

* Brand
* primäre Aktion
* Information
* Navigation

Nicht für:

* Fehler
* Warnungen
* Erfolg

---

### Grün

Darf verwendet werden für:

* Erfolg
* Entwarnung
* positiven Status

Nicht für:

* primäre Navigation
* dekorative Elemente

---

### Gelb/Orange

Darf verwendet werden für:

* Vorsicht
* Warnungen

Nicht für:

* normale Buttons
* dekorative Akzente

---

### Rot

Darf verwendet werden für:

* Gefahr
* Fehler
* destruktive Aktionen

Nicht für:

* normale Navigation
* dekorative Hervorhebung

---

# 12. Farb-Tokens

Die tatsächliche Implementierung soll über semantische Tokens erfolgen.

Empfohlene Tokens:

```text
primary
primary-hover
primary-active
primary-muted
primary-foreground

secondary
secondary-hover
secondary-active
secondary-muted
secondary-foreground

success
success-hover
success-muted
success-text
success-foreground

warning
warning-hover
warning-muted
warning-text
warning-foreground

danger
danger-hover
danger-muted
danger-text
danger-foreground

info
info-hover
info-muted
info-text
info-foreground

background
surface
surface-muted

foreground
foreground-muted
foreground-subtle

border
border-strong
```

Warnungen zusätzlich:

```text
severity-low
severity-low-bg
severity-low-text

severity-moderate
severity-moderate-bg
severity-moderate-text

severity-high
severity-high-bg
severity-high-text

severity-severe
severity-severe-bg
severity-severe-text

severity-extreme
severity-extreme-bg
severity-extreme-text
```

---

# 13. Tailwind Regeln

In Komponenten dürfen ausschließlich OpenWarnDE-Tokens verwendet werden.

### Erlaubt

```tsx
<div className="bg-background text-foreground">
```

```tsx
<div className="border-border bg-surface">
```

```tsx
<Button className="bg-primary">
```

```tsx
<Alert variant="danger">
```

### Nicht erlaubt

```tsx
<div className="bg-blue-600">
```

```tsx
<div className="text-gray-500">
```

```tsx
<div className="border-slate-300">
```

```tsx
<div className="bg-[#2563EB]">
```

Ausnahme: Die zentralen Theme-/Design-Token-Dateien selbst dürfen die definierten Hex-Werte enthalten.

---

# 14. Platform

Die Platform verwendet Tailwind CSS.

Die OpenWarnDE-Tokens müssen zentral in der Tailwind-Konfiguration bzw. im verwendeten Theme-System definiert werden.

Komponenten greifen ausschließlich auf diese Tokens zu.

Beispiel:

```tsx
export function WarningCard() {
  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <h2 className="text-foreground">
        Schweres Gewitter
      </h2>
    </article>
  );
}
```

---

# 15. App

Die App verwendet Flowbite.

Flowbite darf intern seine eigenen technischen Klassen verwenden.

OpenWarnDE-Komponenten sollen jedoch die OpenWarnDE-Farbsemantik nach außen kapseln.

Beispiel:

```tsx
<OpenWarnAlert severity="severe">
  Schweres Unwetter erwartet.
</OpenWarnAlert>
```

Die Komponente entscheidet intern, wie Flowbite konfiguriert werden muss.

Dadurch wird verhindert, dass überall unterschiedliche Kombinationen wie:

```tsx
<Button color="red" />
<Button color="failure" />
<Button color="danger" />
```

entstehen.

Stattdessen:

```tsx
<OpenWarnButton variant="danger">
```

---

# 16. Component Variants

Komponenten dürfen nur definierte Varianten anbieten.

Beispiel:

```tsx
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";
```

Nicht:

```tsx
type ButtonProps = {
  color: string;
};
```

Dadurch kann keine beliebige Farbe in das Designsystem eingeschleust werden.

---

# 17. Warnungs-Komponenten

Warnungskomponenten verwenden ausschließlich die Severity-Tokens.

Beispiel:

```tsx
type WarningSeverity =
  | "low"
  | "moderate"
  | "high"
  | "severe"
  | "extreme";
```

Beispiel:

```tsx
<WarningCard severity="high">
  ...
</WarningCard>
```

Die Komponente bestimmt automatisch:

```text
severity
    ↓
OpenWarnDE Severity Token
    ↓
Background
Text
Border
Icon
Badge
```

---

# 18. Textfarben

Text darf grundsätzlich nur aus folgenden Kategorien stammen:

```text
foreground
foreground-muted
foreground-subtle
primary
success-text
warning-text
danger-text
info-text
```

Keine zufälligen Textfarben.

---

# 19. Hintergründe

Standardflächen:

```text
background
surface
surface-muted
```

Statusflächen:

```text
success-muted
warning-muted
danger-muted
info-muted
```

Warnflächen:

```text
severity-low-bg
severity-moderate-bg
severity-high-bg
severity-severe-bg
severity-extreme-bg
```

---

# 20. Borders

Standard:

```text
border
```

Stärker hervorgehoben:

```text
border-strong
```

Status:

```text
border-success
border-warning
border-danger
border-info
```

Severity:

```text
border-severity-low
border-severity-moderate
border-severity-high
border-severity-severe
border-severity-extreme
```

---

# 21. Fokus

Der Fokuszustand verwendet grundsätzlich die Primärfarbe.

```text
focus-ring = primary
```

Beispiel:

```text
focus-visible:ring-2
focus-visible:ring-primary
```

Der Fokus muss deutlich sichtbar sein.

---

# 22. Hover

Hover-Zustände dürfen keine neue Farbe erfinden.

Sie müssen den definierten Hover-Token verwenden.

Beispiel:

```text
primary
→ primary-hover
```

```text
danger
→ danger-hover
```

```text
warning
→ warning-hover
```

---

# 23. Disabled

Deaktivierte Elemente verwenden neutrale Farben.

```text
background: surface-muted
text: foreground-subtle
border: border
```

Keine roten oder gelben Disabled-Zustände.

---

# 24. Farbkontrast

Alle Farben müssen ausreichenden Kontrast gewährleisten.

Besonders wichtig:

* Warnungen
* Buttons
* Status-Badges
* Links
* Formulare
* Fehlermeldungen

Text darf nicht ausschließlich aufgrund einer hellen Hintergrundfarbe schwer lesbar werden.

Bei Statusfarben soll bevorzugt das entsprechende `*-text` Token verwendet werden.

Beispiel:

```tsx
<div className="bg-danger-muted text-danger-text">
```

statt:

```tsx
<div className="bg-red-100 text-red-500">
```

---

# 25. Keine individuellen Farben

Folgende Muster sind im Anwendungscode grundsätzlich verboten:

```text
#HEX
rgb(...)
rgba(...)
hsl(...)
oklch(...)
```

sowie direkte Tailwind-Farben:

```text
red-*
blue-*
green-*
yellow-*
orange-*
purple-*
pink-*
gray-*
slate-*
zinc-*
neutral-*
stone-*
```

Die einzige Ausnahme sind die zentralen Design-Token-Definitionen.

---

# 26. Farben und Icons

Ein Status darf nicht ausschließlich über Farbe kommuniziert werden.

Beispiel:

```text
✓ ERFOLGREICH
⚠ VORSICHT
ℹ INFORMATION
✕ FEHLER
🔴 SEHR HOHE GEFAHR
```

Farbe + Icon + Text sollen gemeinsam verwendet werden, wenn der Status relevant ist.

---

# 27. Farben und Warnstufen

Bei Warnungen ist die Farbe Teil der Informationshierarchie.

Priorität:

```text
Warnstufe
↓
Titel
↓
Ort
↓
Zeit
↓
Handlungsempfehlung
```

Die Warnstufe darf deshalb visuell stärker hervorgehoben werden als sekundäre Metadaten.

---

# 28. Design Token Architektur

Die Anwendung soll langfristig folgende Struktur verwenden:

```text
OpenWarnDE Design Tokens
│
├── Colors
│   ├── Brand
│   ├── Neutral
│   ├── Status
│   └── Severity
│
├── Typography
│
├── Spacing
│
├── Radius
│
├── Shadows
│
└── Motion
```

Die Komponenten greifen ausschließlich auf diese abstrakten Tokens zu.

---

# 29. Architekturziel

Platform und App dürfen unterschiedliche UI-Libraries verwenden.

Die visuelle Semantik bleibt jedoch identisch.

```text
                 OpenWarnDE Design System
                          │
             ┌────────────┴────────────┐
             │                         │
        Platform                     App
             │                         │
        Tailwind CSS               Flowbite
             │                         │
             └────────────┬────────────┘
                          │
                  gleiche Tokens
                  gleiche Semantik
                  gleiche UX
```

---

# 30. Absolute Regel

> **Kein Entwickler darf für eine neue UI-Komponente spontan eine Farbe auswählen.**

Wenn eine benötigte Farbe noch nicht existiert:

1. prüfen, ob ein bestehender Token verwendet werden kann
2. falls nein, prüfen, ob das Problem durch eine bestehende semantische Kategorie gelöst werden kann
3. falls weiterhin notwendig, einen neuen zentralen Design Token definieren
4. anschließend diesen Token in Platform und App verfügbar machen

Die Farbe wird **niemals direkt in der Komponente erfunden**.

---

# 31. Beispiel einer korrekten Komponente

```tsx
<WarningCard
  severity="severe"
  title="Schweres Unwetter"
  location="Leipzig"
/>
```

Intern:

```text
severity="severe"
        ↓
severity-severe
        ↓
┌───────────────────────┐
│ bg: severity-severe-bg│
│ text: severity-severe-text
│ border: severity-severe
│ icon: severity-severe │
└───────────────────────┘
```

Der Entwickler muss keine Farbe kennen.

Er muss lediglich die Bedeutung kennen.

---

# 32. Ziel

Das OpenWarnDE-UI soll sich unabhängig davon, ob ein Nutzer:

* die Platform
* die App
* eine zukünftige mobile Anwendung
* eine zukünftige Webanwendung

verwendet, **wie ein zusammenhängendes Produkt anfühlen**.

Unterschiedliche technische Implementierungen sind erlaubt.

Unterschiedliche Designsprachen sind nicht erlaubt.
