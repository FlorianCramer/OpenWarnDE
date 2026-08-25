import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const rootDir = path.resolve(new URL("../..", import.meta.url).pathname);
const appDir = path.join(rootDir, "apps", "app");
const source = path.join(appDir, "assets", "icon.png");
const iconsDir = path.join(appDir, "icons");
const manifestPath = path.join(appDir, "public", "manifest.webmanifest");
const require = createRequire(import.meta.url);
const sharp = require(path.join(appDir, "node_modules", "sharp"));

await mkdir(iconsDir, { recursive: true });

const sizes = [48, 72, 96, 128, 192, 256, 512];
await Promise.all(
  sizes.map((size) =>
    sharp(source)
      .resize(size, size, { fit: "cover" })
      .png()
      .toFile(path.join(iconsDir, `icon-${size}.png`)),
  ),
);

await sharp(source).resize(32, 32, { fit: "cover" }).png().toFile(path.join(appDir, "public", "favicon.png"));
await sharp(source)
  .resize(180, 180, { fit: "cover" })
  .png()
  .toFile(path.join(appDir, "public", "apple-touch-icon.png"));

await Promise.all(
  sizes.map((size) => unlink(path.join(iconsDir, `icon-${size}.webp`)).catch(() => {})),
);

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
manifest.icons = sizes.map((size) => ({
  src: `/icons/icon-${size}.png`,
  type: "image/png",
  sizes: `${size}x${size}`,
  purpose: "any maskable",
}));
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
