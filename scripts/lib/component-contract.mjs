// Pure helpers shared by `scripts/check-component-versions.mjs` y sus tests.
// Sin IO, sin fetch, sin filesystem — todo el gate se reduce a estas dos
// funciones cuando no hay drift.

import { createHash } from "node:crypto";

/**
 * Devuelve el subset estable del manifest que define el contrato visible
 * desde fuera del paquete. Mantenerlo determinista es la base del hash.
 *
 * Reglas:
 * - `propControls` se ordena por `name` y se proyecta a un shape mínimo —
 *   ignora orden de declaración, pero respeta cambios reales (label, default).
 * - `meta` se conserva sin `migrations` (interno-runtime, cambia entre publishes
 *   sin afectar el contrato visible) y sin `pkgVersion` (artefacto del catalog
 *   generator, bumpea cada build).
 * - Cualquier otro field del manifest (importPath, exportName, url) se ignora;
 *   no es parte de "lo que el editor renderiza".
 */
export function contractOf(component) {
  const { type, propControls, meta } = component;
  const sortedProps = Array.isArray(propControls)
    ? [...propControls]
        .map((p) => ({
          name: p.name,
          label: p.label ?? null,
          type: p.type ?? null,
          defaultValue: p.defaultValue ?? null,
          options: p.options ?? null,
        }))
        .sort((a, b) => String(a.name).localeCompare(String(b.name)))
    : [];

  let strippedMeta = null;
  if (meta && typeof meta === "object") {
    const { migrations: _m, pkgVersion: _p, ...rest } = meta;
    strippedMeta = rest;
  }

  return { type, propControls: sortedProps, meta: strippedMeta };
}

export function hashContract(component) {
  const json = JSON.stringify(contractOf(component));
  return createHash("sha256").update(json).digest("hex");
}

/**
 * Compara dos catálogos (local vs publicado) y devuelve violaciones.
 * Pure: ningún side-effect, apto para tests deterministas.
 *
 * Una violación = misma `type`, `version` igual, contrato distinto.
 */
export function findDriftViolations(localCatalog, publishedCatalog) {
  const publishedByType = new Map(publishedCatalog.map((c) => [c.type, c]));
  const violations = [];
  for (const current of localCatalog) {
    const published = publishedByType.get(current.type);
    if (!published) continue; // nuevo componente
    if (hashContract(current) === hashContract(published)) continue;
    if ((current.version ?? null) !== (published.version ?? null)) continue;
    violations.push({
      type: current.type,
      version: current.version ?? null,
      reason: "contract-drift-without-bump",
    });
  }
  return violations;
}

/**
 * Diferencias informativas (no son violaciones): componentes presentes en el
 * publicado pero ausentes del local — pueden ser remociones intencionales.
 */
export function findRemovedComponents(localCatalog, publishedCatalog) {
  const localByType = new Set(localCatalog.map((c) => c.type));
  return publishedCatalog
    .filter((c) => !localByType.has(c.type))
    .map((c) => ({ type: c.type, reason: "removed-from-catalog" }));
}
