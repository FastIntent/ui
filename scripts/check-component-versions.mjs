#!/usr/bin/env node
/**
 * 🛡️ Publish gate — component contract drift detector
 *
 * Compara cada componente del catálogo recién compilado (`dist/catalog.*.json`)
 * contra la versión publicada del paquete en npm. Si el "contrato" público de
 * un componente cambió pero su `version` NO se incrementó, falla con exit 1
 * y guía al autor para que bump-ee la versión + declare la migración.
 *
 * Esto cierra el bucle del sistema de migraciones (sub-fase C5):
 *
 * 1. C1 — el editor stampea `meta.version` cuando crea un elemento.
 * 2. C2 — el editor detecta elementos atrás del catálogo actual.
 * 3. C3 — el applier corre las migraciones declaradas en `meta.migrations`.
 * 4. **C5 (esto)** — bloquea publish cuando alguien cambió el contrato sin
 *    bumpear, evitando que el editor jamás detecte el drift.
 *
 * "Contrato" = forma observable por el editor. Ver `lib/component-contract.mjs`
 * para la definición exacta y los tests.
 *
 * Falla blanda (warning, no exit 1) si:
 *   - El paquete nunca fue publicado (primera publish).
 *   - La fetch contra unpkg falla por red.
 *   - El catálogo publicado tiene un componente que ya no existe (remoción
 *     intencional). Con `--strict`, esto sí bloquea.
 *
 * Hook: `prepublishOnly` en `package.json`.
 *
 * Uso manual:
 *   node scripts/check-component-versions.mjs            # gate normal
 *   node scripts/check-component-versions.mjs --strict   # falla en warnings
 *   node scripts/check-component-versions.mjs --offline  # skip fetch (no-op)
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { findDriftViolations, findRemovedComponents } from "./lib/component-contract.mjs";

const ROOT = process.cwd();
const PKG_PATH = join(ROOT, "package.json");
const DIST_DIR = join(ROOT, "dist");
const CATALOG_FILES = ["catalog.free.json", "catalog.pro.json"];

const args = new Set(process.argv.slice(2));
const STRICT = args.has("--strict");
const OFFLINE = args.has("--offline");

const log = (...a) => console.log("[check-component-versions]", ...a);
const warn = (...a) => console.warn("[check-component-versions] ⚠", ...a);
const fail = (...a) => console.error("[check-component-versions] ❌", ...a);

async function fetchPublishedCatalog(pkgName, file) {
  const url = `https://unpkg.com/${pkgName}@latest/dist/${file}`;
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (res.status === 404) return { kind: "not-found", url };
    if (!res.ok) return { kind: "error", url, status: res.status };
    const data = await res.json();
    if (!Array.isArray(data)) return { kind: "error", url, status: "non-array" };
    return { kind: "ok", url, data };
  } catch (err) {
    return { kind: "error", url, status: String(err) };
  }
}

function loadLocalCatalog(file) {
  const path = join(DIST_DIR, file);
  if (!existsSync(path)) {
    fail(`No se encontró ${path}. ¿Corriste \`pnpm build\` antes?`);
    process.exit(1);
  }
  const raw = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(raw)) {
    fail(`${path} no es un array.`);
    process.exit(1);
  }
  return raw;
}

const pkg = JSON.parse(readFileSync(PKG_PATH, "utf8"));
log(`Auditing ${pkg.name}@${pkg.version}`);

if (OFFLINE) {
  warn("OFFLINE mode — gate disabled. No drift check performed.");
  process.exit(0);
}

const allViolations = [];
const allWarnings = [];

for (const file of CATALOG_FILES) {
  const local = loadLocalCatalog(file);

  const fetched = await fetchPublishedCatalog(pkg.name, file);
  if (fetched.kind === "not-found") {
    warn(`${file}: package not yet published. Skipping gate (first publish).`);
    continue;
  }
  if (fetched.kind === "error") {
    warn(`${file}: failed to fetch published catalog (${fetched.status}). Skipping gate.`);
    continue;
  }

  const violations = findDriftViolations(local, fetched.data);
  const removals = findRemovedComponents(local, fetched.data);
  allViolations.push(...violations);
  allWarnings.push(...removals);
}

for (const w of allWarnings) {
  if (w.reason === "removed-from-catalog") {
    warn(`${w.type}: removed from local catalog (intentional?).`);
  }
}

if (allViolations.length === 0) {
  log("✅ All component contracts are consistent with their declared versions.");
  if (STRICT && allWarnings.length > 0) {
    fail(`STRICT mode: ${allWarnings.length} warning(s) treated as errors.`);
    process.exit(1);
  }
  process.exit(0);
}

fail(`${allViolations.length} component(s) changed shape without bumping version:\n`);
for (const v of allViolations) {
  console.error(`  • ${v.type}`);
  console.error(`      version (local & published): ${v.version}`);
  console.error(`      → bump \`meta.version\` y declará \`meta.migrations["<newVersion>"]\``);
  console.error(`        (usá \`null\` si no hay transform de props necesario).`);
  console.error("");
}
console.error(
  "Si el cambio NO afecta el contrato externo (refactor interno), revisá " +
    "que `propControls`/`meta` realmente sean idénticos al publicado.",
);
process.exit(1);
