# Firebase

Diese Dokumentation beschreibt das aktuelle Firebase Hosting und Deployment von OpenWarnDE.

## Hosting-Aufbau

OpenWarnDE verwendet ein gemeinsames Firebase-Projekt:

```text
Firebase Project: openwarnde
│
├── Firebase Hosting
│   │
│   ├── openwarnde
│   │   └── apps/app
│   │
│   └── openwarnde-platform
│       └── apps/web
│
├── Firebase Authentication
├── Firestore
└── Firebase Storage
```

Die beiden Next.js-Anwendungen werden als getrennte Firebase Hosting Sites innerhalb desselben Firebase-Projekts deployed.

| Anwendung           | Hosting Site          | Source         |
| ------------------- | --------------------- | -------------- |
| OpenWarnDE App      | `openwarnde`          | `apps/app/out` |
| OpenWarnDE Platform | `openwarnde-platform` | `apps/web/out` |

Geplante Domains:

```text
openwarn.de
└── apps/app

platform.openwarn.de
└── apps/web
```

---

## Firebase Hosting konfigurieren

Alle verfügbaren Hosting Sites anzeigen:

```bash
firebase hosting:sites:list
```

Die Platform-Site bei Bedarf erstellen:

```bash
firebase hosting:sites:create openwarnde-platform
```

Hosting Targets konfigurieren:

```bash
firebase target:apply hosting app openwarnde
firebase target:apply hosting platform openwarnde-platform
```

---

## Build

Vor dem Deployment müssen beide Next.js-Anwendungen gebaut werden.

OpenWarnDE App:

```bash
cd apps/app
npm run build
```

OpenWarnDE Platform:

```bash
cd apps/web
npm run build
```

Die Anwendungen werden als statischer Next.js Export gebaut und erzeugen jeweils ein `out`-Verzeichnis.

```text
apps/app/out
apps/web/out
```

---

## Deployment

Beide Hosting Sites deployen:

```bash
firebase deploy
```

Nur die OpenWarnDE App deployen:

```bash
firebase deploy --only hosting:app
```

Nur die OpenWarnDE Platform deployen:

```bash
firebase deploy --only hosting:platform
```

## GitHub Actions

Für Deployments in die Produktionsumgebung existieren zwei getrennte Workflows:

```text
.github/workflows/deploy-app.yml
└── apps/app -> hosting:app

.github/workflows/deploy-platform.yml
└── apps/web -> hosting:platform
```

Beide Workflows werden bei jedem Push auf den Branch `master` ausgeführt. Ein Deployment
der App startet nicht automatisch ein Deployment der Platform und umgekehrt.

### GitHub Secret

Beide Workflows verwenden dasselbe Repository-Secret:

```text
FIREBASE_SERVICE_ACCOUNT_OPENWARNDE
```

Der Wert muss der vollständige JSON-Inhalt eines Google-Service-Accounts sein, der für
das Firebase-Projekt `openwarnde` deployen darf. Das Secret wird in den Repository-
Settings unter **Secrets and variables → Actions** als Repository-Secret hinterlegt.

### Ablauf und Fehlerdiagnose

Jeder Workflow protokolliert die folgenden Abschnitte separat:

1. Repository-Checkout und Node.js-Setup
2. Authentifizierung bei Google Cloud
3. Installation der jeweiligen Dependencies mit `npm ci --loglevel=verbose`
4. Next.js-Build
5. Prüfung des statischen Exports inklusive `out/index.html`
6. Firebase-Deployment mit `firebase-tools --debug`

Fehler lassen sich dadurch direkt dem betroffenen Schritt zuordnen. Zusätzlich werden
die Node-/npm-Versionen, die Anzahl der exportierten Dateien und die ersten Dateien im
jeweiligen `out`-Verzeichnis ausgegeben.

---

## Mobile App

`apps/app` wird zusätzlich mit Capacitor für mobile Plattformen gebaut.

```text
apps/app
│
├── Web
│   └── Firebase Hosting
│
├── Android
│   └── Capacitor
│
└── iOS
    └── Capacitor
```

Die mobile Anwendung wird **nicht über Firebase Hosting** verteilt.

Für die Entwicklung ist zukünftig folgender Workflow vorgesehen:

```text
apps/app
    │
    ▼
Next.js Build
    │
    ▼
Capacitor
    │
    ├── Android Build
    │
    └── iOS Build
            │
            ▼
Firebase App Distribution
```

Firebase App Distribution wird zukünftig verwendet, um Android- und iOS-Testversionen an Tester während der Entwicklung zu verteilen.

Die Web-Version und die mobilen Builds bleiben damit getrennte Deployment-Prozesse:

```text
Web
└── Firebase Hosting

Android / iOS Development Builds
└── Firebase App Distribution

Production Mobile Releases
└── Google Play / Apple App Store
```
