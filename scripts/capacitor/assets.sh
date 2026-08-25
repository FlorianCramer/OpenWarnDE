#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"
APP_DIR="$ROOT_DIR/apps/app"

[[ -f "$APP_DIR/assets/icon.png" ]] || { echo "Missing asset: apps/app/assets/icon.png" >&2; exit 1; }
[[ -f "$APP_DIR/assets/splash.png" ]] || { echo "Missing asset: apps/app/assets/splash.png" >&2; exit 1; }

cd "$APP_DIR"
echo "Generating Android and iOS assets..."
npx capacitor-assets generate

echo "Generating web icons..."
node "$ROOT_DIR/scripts/capacitor/generate-web-assets.mjs"
echo "Assets updated from apps/app/assets/icon.png and splash.png."
