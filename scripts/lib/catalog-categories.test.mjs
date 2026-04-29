/**
 * Tests del validador de categories del catálogo — gate previo al publish.
 *
 * Por qué existe (no borrar este contexto)
 * ─────────────────────────────────────────
 * Antes del 2026-04-27, el catálogo de @fastintent/ui tenía:
 *   - 2 entries sin category (`ui_hero_title`, `ui_hero_subtitle`)
 *   - colisión `"Overlay"` (4 entries) vs `"Overlays"` (3 entries)
 *   - colisión `"Data Display"` (4 entries) vs `"DataDisplay"` (1 entry)
 *
 * El editor (`ComponentStoreModal`) deriva sus tabs de categoría de
 * forma dinámica del catálogo, así que estos errores fragmentaban la
 * UX del browser de componentes en silencio. Estos tests son guard
 * rails para evitar la regresión: cualquier nuevo componente sin
 * category, o un typo de category que difiera sólo en case/espacios
 * de una existente, se detecta en CI antes de publicar.
 *
 * Convención de pluralidad: `"Overlay"` ≠ `"Overlays"` es una decisión
 * SEMÁNTICA legítima, no una colisión — `normalizeCategory` lowercasea
 * y colapsa espacios pero NO singulariza. El editor convive con eso.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  normalizeCategory,
  findUncategorized,
  findCategoryDuplicates,
  validateCatalogCategories,
} from "./catalog-categories.mjs";

// ─────────────────────────────────────── normalizeCategory

test("normalizeCategory: lowercases", () => {
  assert.equal(normalizeCategory("Layout"), "layout");
  assert.equal(normalizeCategory("LAYOUT"), "layout");
});

test("normalizeCategory: strips internal spaces", () => {
  assert.equal(normalizeCategory("Data Display"), "datadisplay");
  assert.equal(normalizeCategory("DataDisplay"), "datadisplay");
  assert.equal(normalizeCategory("Visual Features"), "visualfeatures");
});

test("normalizeCategory: handles tabs/multiple spaces", () => {
  assert.equal(normalizeCategory("Data\t\tDisplay"), "datadisplay");
  assert.equal(normalizeCategory("Data    Display"), "datadisplay");
});

test("normalizeCategory: returns empty for non-string input (defensivo)", () => {
  assert.equal(normalizeCategory(undefined), "");
  assert.equal(normalizeCategory(null), "");
  assert.equal(normalizeCategory(42), "");
  assert.equal(normalizeCategory({}), "");
});

test("normalizeCategory: NO singulariza — Overlay ≠ Overlays semánticamente", () => {
  // Si alguien quiere unificar "Overlay" y "Overlays", debe hacerlo a
  // mano (cambiar la fuente). El validador NO toma esa decisión.
  assert.notEqual(normalizeCategory("Overlay"), normalizeCategory("Overlays"));
});

// ─────────────────────────────────────── findUncategorized

test("findUncategorized: detecta category undefined", () => {
  const cat = [{ type: "x", category: undefined }, { type: "y", category: "Layout" }];
  assert.deepEqual(findUncategorized(cat), [{ type: "x" }]);
});

test("findUncategorized: detecta category null", () => {
  const cat = [{ type: "x", category: null }, { type: "y", category: "Layout" }];
  assert.deepEqual(findUncategorized(cat), [{ type: "x" }]);
});

test("findUncategorized: detecta category string vacío", () => {
  const cat = [{ type: "x", category: "" }, { type: "y", category: "Layout" }];
  assert.deepEqual(findUncategorized(cat), [{ type: "x" }]);
});

test("findUncategorized: detecta category no-string (number, object)", () => {
  const cat = [
    { type: "x", category: 42 },
    { type: "y", category: { name: "Layout" } },
    { type: "z", category: "Layout" },
  ];
  assert.deepEqual(findUncategorized(cat), [{ type: "x" }, { type: "y" }]);
});

test("findUncategorized: catálogo limpio devuelve []", () => {
  const cat = [{ type: "x", category: "Layout" }, { type: "y", category: "Forms" }];
  assert.deepEqual(findUncategorized(cat), []);
});

// ─────────────────────────────────────── findCategoryDuplicates

test("findCategoryDuplicates: detecta colisión case-mismatch", () => {
  const cat = [
    { type: "a", category: "Layout" },
    { type: "b", category: "layout" },
  ];
  const dups = findCategoryDuplicates(cat);
  assert.equal(dups.length, 1);
  assert.equal(dups[0].normalized, "layout");
  assert.deepEqual(dups[0].variants, ["Layout", "layout"]);
  assert.deepEqual(dups[0].types, ["a", "b"]);
});

test("findCategoryDuplicates: detecta colisión spacing (Data Display vs DataDisplay)", () => {
  const cat = [
    { type: "table", category: "DataDisplay" },
    { type: "badge", category: "Data Display" },
    { type: "avatar", category: "Data Display" },
  ];
  const dups = findCategoryDuplicates(cat);
  assert.equal(dups.length, 1);
  assert.equal(dups[0].normalized, "datadisplay");
  assert.deepEqual(dups[0].variants, ["Data Display", "DataDisplay"]);
  assert.deepEqual(dups[0].types, ["avatar", "badge", "table"]);
});

test("findCategoryDuplicates: NO marca singular vs plural distinto (Overlay vs Overlays)", () => {
  const cat = [
    { type: "dialog", category: "Overlay" },
    { type: "alertdialog", category: "Overlays" },
  ];
  // Decisión semántica: "Overlay" y "Overlays" son DIFFERENT, no
  // colisión. Si querés unificar, hacelo en la fuente.
  assert.deepEqual(findCategoryDuplicates(cat), []);
});

test("findCategoryDuplicates: catálogo sin colisiones devuelve []", () => {
  const cat = [
    { type: "a", category: "Layout" },
    { type: "b", category: "Forms" },
    { type: "c", category: "Navigation" },
  ];
  assert.deepEqual(findCategoryDuplicates(cat), []);
});

test("findCategoryDuplicates: ignora entries sin category (uncategorized se reporta aparte)", () => {
  const cat = [
    { type: "a", category: undefined },
    { type: "b", category: "Layout" },
    { type: "c", category: "Layout" },
  ];
  // 2 entries con la misma category (literal idéntico) NO son colisión.
  // Sólo se reporta cuando hay >1 variante con misma normalización.
  assert.deepEqual(findCategoryDuplicates(cat), []);
});

test("findCategoryDuplicates: 3 variantes en una colisión", () => {
  const cat = [
    { type: "a", category: "Layout" },
    { type: "b", category: "layout" },
    { type: "c", category: "LAYOUT" },
  ];
  const dups = findCategoryDuplicates(cat);
  assert.equal(dups.length, 1);
  assert.deepEqual(dups[0].variants, ["LAYOUT", "Layout", "layout"]);
});

// ─────────────────────────────────────── validateCatalogCategories

test("validateCatalogCategories: combina uncategorized + duplicates", () => {
  const cat = [
    { type: "a", category: "Layout" },
    { type: "b", category: "layout" }, // colisión con Layout
    { type: "c" }, // uncategorized
  ];
  const result = validateCatalogCategories(cat);
  assert.equal(result.uncategorized.length, 1);
  assert.equal(result.uncategorized[0].type, "c");
  assert.equal(result.duplicates.length, 1);
  assert.equal(result.duplicates[0].normalized, "layout");
});

test("validateCatalogCategories: catálogo limpio devuelve {[], []}", () => {
  const cat = [
    { type: "a", category: "Layout" },
    { type: "b", category: "Forms" },
  ];
  assert.deepEqual(validateCatalogCategories(cat), {
    uncategorized: [],
    duplicates: [],
  });
});

// ─────────────────────────────────────── Smoke contra catalog real

test("smoke: dist/catalog.free.json está limpio (sin uncategorized ni duplicados)", () => {
  // Este test corre contra el JSON publicado tras `pnpm build`. Si
  // alguien introduce un componente sin category o con typo de
  // category (Overlay/Overlays, Data Display/DataDisplay, etc.), CI
  // bloquea el publish con un mensaje accionable.
  const catalogPath = path.resolve(
    new URL("../../dist/catalog.free.json", import.meta.url).pathname,
  );
  if (!fs.existsSync(catalogPath)) {
    // Smoke condicional: si no se corrió `pnpm build`, lo saltamos
    // limpio. CI corre `prepublishOnly` que hace build → test, así
    // que ahí el archivo siempre existe.
    console.log("[smoke] dist/catalog.free.json no existe — skipping");
    return;
  }
  const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
  const result = validateCatalogCategories(catalog);

  if (result.uncategorized.length > 0) {
    const types = result.uncategorized.map((u) => u.type).join(", ");
    assert.fail(
      `Catálogo tiene ${result.uncategorized.length} componentes sin category: ${types}. ` +
        `Asignales una category válida en el meta del componente.`,
    );
  }

  if (result.duplicates.length > 0) {
    const msg = result.duplicates
      .map(
        (d) =>
          `  - ${d.variants.join(" vs ")} (normalize="${d.normalized}", types: ${d.types.join(", ")})`,
      )
      .join("\n");
    assert.fail(
      `Catálogo tiene ${result.duplicates.length} colisiones de category (case/spacing):\n${msg}\n` +
        `Unificá las variantes a UNA sola en los meta de cada componente.`,
    );
  }
});
