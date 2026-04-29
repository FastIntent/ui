import { test } from "node:test";
import assert from "node:assert/strict";
import {
  contractOf,
  hashContract,
  findDriftViolations,
  findRemovedComponents,
} from "./component-contract.mjs";

const make = (overrides = {}) => ({
  type: "ui_card",
  version: "1.0.0",
  name: "Card",
  importPath: "@fastintent/ui",
  exportName: "Card",
  pkgVersion: "1.3.0",
  url: "/api/whatever",
  propControls: [
    { name: "title", type: "string", defaultValue: "Hello" },
    { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"] },
  ],
  ...overrides,
});

test("contractOf strips importPath/exportName/url/pkgVersion", () => {
  const c = make();
  const contract = contractOf(c);
  assert.deepEqual(Object.keys(contract).sort(), ["meta", "propControls", "type"]);
  assert.equal(contract.type, "ui_card");
});

test("contractOf sorts propControls by name (order-insensitive)", () => {
  const a = contractOf(
    make({ propControls: [{ name: "b" }, { name: "a" }] }),
  );
  const b = contractOf(
    make({ propControls: [{ name: "a" }, { name: "b" }] }),
  );
  assert.deepEqual(a, b);
});

test("hashContract is stable across irrelevant changes", () => {
  const a = make();
  const b = make({ pkgVersion: "1.4.0", url: "/different" });
  assert.equal(hashContract(a), hashContract(b));
});

test("hashContract changes when a propControl default changes", () => {
  const a = make();
  const b = make({
    propControls: [
      { name: "title", type: "string", defaultValue: "Bye" },
      { name: "size", type: "select", defaultValue: "md", options: ["sm", "md", "lg"] },
    ],
  });
  assert.notEqual(hashContract(a), hashContract(b));
});

test("hashContract changes when a propControl is added", () => {
  const a = make();
  const b = make({
    propControls: [...a.propControls, { name: "icon", type: "string", defaultValue: "" }],
  });
  assert.notEqual(hashContract(a), hashContract(b));
});

test("contractOf strips meta.migrations and meta.pkgVersion but keeps the rest", () => {
  const c = make({
    meta: {
      version: "1.0.0",
      category: "Cards",
      migrations: { "1.0.0": null },
      pkgVersion: "1.3.0",
    },
  });
  assert.deepEqual(contractOf(c).meta, { version: "1.0.0", category: "Cards" });
});

test("hashContract ignores meta.migrations changes (internal-only)", () => {
  const a = make({ meta: { foo: "bar", migrations: { "1.0.0": null } } });
  const b = make({ meta: { foo: "bar", migrations: { "1.1.0": "fnString" } } });
  assert.equal(hashContract(a), hashContract(b));
});

test("findDriftViolations flags drift without version bump", () => {
  const local = [make({ propControls: [{ name: "title", defaultValue: "NEW" }] })];
  const published = [make({ propControls: [{ name: "title", defaultValue: "OLD" }] })];
  const violations = findDriftViolations(local, published);
  assert.equal(violations.length, 1);
  assert.deepEqual(violations[0], {
    type: "ui_card",
    version: "1.0.0",
    reason: "contract-drift-without-bump",
  });
});

test("findDriftViolations does NOT flag drift when version was bumped", () => {
  const local = [
    make({ version: "1.1.0", propControls: [{ name: "title", defaultValue: "NEW" }] }),
  ];
  const published = [
    make({ version: "1.0.0", propControls: [{ name: "title", defaultValue: "OLD" }] }),
  ];
  assert.deepEqual(findDriftViolations(local, published), []);
});

test("findDriftViolations does NOT flag identical contracts", () => {
  const local = [make()];
  const published = [make()];
  assert.deepEqual(findDriftViolations(local, published), []);
});

test("findDriftViolations ignores new components (in local, not in published)", () => {
  const local = [make(), make({ type: "ui_brand_new" })];
  const published = [make()];
  assert.deepEqual(findDriftViolations(local, published), []);
});

test("findRemovedComponents flags components only in published", () => {
  const local = [make()];
  const published = [make(), make({ type: "ui_old" })];
  assert.deepEqual(findRemovedComponents(local, published), [
    { type: "ui_old", reason: "removed-from-catalog" },
  ]);
});

test("findDriftViolations + findRemovedComponents handle empty catalogs", () => {
  assert.deepEqual(findDriftViolations([], []), []);
  assert.deepEqual(findRemovedComponents([], []), []);
});
