const fs = require('fs');
const path = require('path');
const Module = require('module');

// 🧬 Mock global store for build-time catalog generation
const originalRequire = Module.prototype.require;
Module.prototype.require = function(p) {
  if (p === '@FastIntent/store') return { useEditorStore: () => ({}) };
  return originalRequire.apply(this, arguments);
};

// Cargar el bundle CJS recién compilado
const pkgPath = path.join(process.cwd(), './dist/index.js');
const pkgName = '@FastIntent/ui';

if (!fs.existsSync(pkgPath)) {
  console.error('[Error] No se encontró dist/index.js. Compila la librería primero.');
  process.exit(1);
}

const { getSafeCatalog } = require(pkgPath);

if (!getSafeCatalog) {
  console.error('[Error] getSafeCatalog no está exportado en dist/index.js');
  process.exit(1);
}

// Generamos el catálogo filtrado por tipos (premium vs free)
// Soportamos pasar una BASE_URL por variable de entorno para entornos Cloud/CDN
const ASSET_BASE_URL = process.env.ASSET_URL || '/api/remote-asset';
console.log(`[catalog-gen] Using base URL: ${ASSET_BASE_URL}`);

const catalog = getSafeCatalog(pkgName, ASSET_BASE_URL);

// Filtrar por free / premium
const free = catalog.filter(c => !c.isPremium);
const pro = catalog.filter(c => c.isPremium);

// Guardar los archivos JSON
fs.writeFileSync(path.join(process.cwd(), './dist/catalog.free.json'), JSON.stringify(free, null, 2));
fs.writeFileSync(path.join(process.cwd(), './dist/catalog.pro.json'), JSON.stringify(pro, null, 2));

console.log(`[Catalog Generator] Generados: catalog.free.json (${free.length} componentes) y catalog.pro.json (${pro.length} componentes) en @FastIntent/ui`);
