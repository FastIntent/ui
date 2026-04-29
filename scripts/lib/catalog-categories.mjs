/**
 * Validación de `category` en el catálogo de @fastintent/ui.
 *
 * Por qué existe (no borrar este contexto)
 * ─────────────────────────────────────────
 * El catálogo se construye recolectando `meta.category` de cada
 * componente exportado. Sin gates, dos errores se cuelan silencio:
 *
 * 1. **Uncategorized**: un componente nuevo se publica sin `category`,
 *    cae en bucket `(none)` en el AddPanel del editor (UX rota sin
 *    crash visible).
 * 2. **Duplicados normalize-collision**: dos componentes declaran
 *    categories que difieren sólo en case o espacios — ej. `"Overlay"`
 *    vs `"Overlays"`, `"Data Display"` vs `"DataDisplay"`. El modal
 *    `ComponentStoreModal` deriva la lista de categories del catálogo
 *    y las muestra como tabs separados, fragmentando el catálogo.
 *
 * Estos helpers son puros (sin IO) y se consumen desde
 * `catalog-categories.test.mjs` con node:test.
 */

/**
 * Normaliza una category para comparación: lowercase + sin espacios.
 * `"Data Display"` y `"DataDisplay"` colapsan al mismo valor; pero
 * `"Overlay"` y `"Overlays"` siguen siendo distintos (singular vs
 * plural es una decisión semántica del editor, no un typo).
 *
 * @param {string} cat
 * @returns {string}
 */
export function normalizeCategory(cat) {
  if (typeof cat !== "string") return "";
  return cat.toLowerCase().replace(/\s+/g, "");
}

/**
 * Devuelve los entries del catálogo cuya `category` es falsy
 * (undefined, null, "", o no es string).
 *
 * @param {Array<{ type: string; category?: unknown }>} catalog
 * @returns {Array<{ type: string }>}
 */
export function findUncategorized(catalog) {
  return catalog
    .filter((c) => !c.category || typeof c.category !== "string")
    .map((c) => ({ type: c.type }));
}

/**
 * Detecta colisiones por normalize: dos category strings distintos
 * literalmente que normalizan al mismo valor. Reporta cada grupo
 * con sus variantes y los `type`s afectados.
 *
 * @param {Array<{ type: string; category?: string }>} catalog
 * @returns {Array<{ normalized: string; variants: string[]; types: string[] }>}
 */
export function findCategoryDuplicates(catalog) {
  /** @type {Map<string, Map<string, string[]>>} */
  const byNorm = new Map();
  for (const c of catalog) {
    if (typeof c.category !== "string" || !c.category) continue;
    const norm = normalizeCategory(c.category);
    if (!norm) continue;
    let variants = byNorm.get(norm);
    if (!variants) {
      variants = new Map();
      byNorm.set(norm, variants);
    }
    const types = variants.get(c.category) ?? [];
    types.push(c.type);
    variants.set(c.category, types);
  }

  /** @type {Array<{ normalized: string; variants: string[]; types: string[] }>} */
  const collisions = [];
  for (const [norm, variants] of byNorm) {
    if (variants.size > 1) {
      const allTypes = [];
      for (const types of variants.values()) allTypes.push(...types);
      collisions.push({
        normalized: norm,
        variants: Array.from(variants.keys()).sort(),
        types: allTypes.sort(),
      });
    }
  }
  return collisions;
}

/**
 * Validación combinada usada como gate previo al publish.
 * Devuelve `{ uncategorized, duplicates }` — si ambos arrays vacíos,
 * el catálogo está limpio.
 *
 * @param {Array<{ type: string; category?: string }>} catalog
 * @returns {{
 *   uncategorized: Array<{ type: string }>;
 *   duplicates: Array<{ normalized: string; variants: string[]; types: string[] }>;
 * }}
 */
export function validateCatalogCategories(catalog) {
  return {
    uncategorized: findUncategorized(catalog),
    duplicates: findCategoryDuplicates(catalog),
  };
}
