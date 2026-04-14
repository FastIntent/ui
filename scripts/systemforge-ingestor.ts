import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";
import { globSync } from "glob";
import * as fs from "fs";
import * as path from "path";

/**
 * 🛠️ SystemForge Open Source Ingestor
 * 
 * Lee componentes de UI (Ej. Shadcn) basados en CVA y anexa 
 * automáticamente el objeto `.meta` compatible con Editor Plasmic.
 */

const TARGET_DIR = path.resolve(__dirname, "../src/components/shadcn/**/*.tsx");

function toPascalCase(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, ' ').trim().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
}

function processFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  if (fileContent.includes("SYSTEMFORGE AUTO-GENERATED META")) {
    console.log(`⏩ Saltando ${path.basename(filePath)} (Ya ingerido)`);
    return;
  }

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  
  // Buscar exportación principal para extraer nombre del componente
  // Shadcn usualmente exporta así: export { Button, buttonVariants }
  let componentName = "";
  const exportDecls = sourceFile.getExportDeclarations();
  for (const exp of exportDecls) {
    const namedExports = exp.getNamedExports();
    if (namedExports.length > 0) {
      componentName = namedExports[0].getName();
      break;
    }
  }

  // Si no encuentra en exports nombrados, usar el nombre del archivo
  if (!componentName) {
    const baseName = path.basename(filePath, ".tsx");
    componentName = toPascalCase(baseName);
  }

  // 1. Encontrar declaración que use `cva`
  const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
  let cvaNode = null;
  
  for (const callExpr of callExpressions) {
    if (callExpr.getExpression().getText() === "cva") {
      cvaNode = callExpr;
      break;
    }
  }

  if (!cvaNode) {
    console.log(`⚠️  No se encontró CVA en ${path.basename(filePath)}, se omiten variantes.`);
  }

  const propControls: any[] = [];
  const defaultVariants: Record<string, string> = {};

  if (cvaNode) {
    const args = cvaNode.getArguments();
    if (args.length >= 2) {
      const configObj = args[1] as ObjectLiteralExpression;
      
      const variantsProp = configObj.getProperty("variants");
      const defaultVariantsProp = configObj.getProperty("defaultVariants");

      // Extraer defaults
      if (defaultVariantsProp && defaultVariantsProp.isKind(SyntaxKind.PropertyAssignment)) {
        const init = defaultVariantsProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
        if (init) {
          init.getProperties().forEach(p => {
            if (p.isKind(SyntaxKind.PropertyAssignment)) {
              defaultVariants[p.getName()] = p.getInitializer()?.getText().replace(/['"]/g, "") || "";
            }
          });
        }
      }

      // Extraer variantes
      if (variantsProp && variantsProp.isKind(SyntaxKind.PropertyAssignment)) {
        const init = variantsProp.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
        if (init) {
          init.getProperties().forEach(group => {
            if (group.isKind(SyntaxKind.PropertyAssignment)) {
              const groupName = group.getName();
              const optionsObj = group.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
              
              if (optionsObj) {
                const options: string[] = [];
                optionsObj.getProperties().forEach(p => {
                  if (p.isKind(SyntaxKind.PropertyAssignment)) {
                    options.push(p.getName());
                  }
                });
                propControls.push({
                  name: groupName,
                  type: "select",
                  options: options,
                  defaultValue: defaultVariants[groupName] || options[0]
                });
              }
            }
          });
        }
      }
    }
  }

  // Añadir prop text generico (suele usarse en Shadcn via children o value)
  propControls.push({ name: "children", type: "string", label: "Texto/Contenido", defaultValue: componentName });

  const metaObj = {
    type: `ui_shadcn_${componentName.toLowerCase()}`,
    name: componentName,
    version: "1.0.0",
    category: "Ingested",
    description: `Auto-ingested Shadcn component: ${componentName}`,
    propControls
  };

  const metaCodeSnippet = `

// --- SYSTEMFORGE AUTO-GENERATED META ---
(${componentName} as any).meta = ${JSON.stringify(metaObj, null, 2)};
`;

  fs.appendFileSync(filePath, metaCodeSnippet);
  console.log(`✅ Ingestado exitosamente: ${componentName} -> ${path.basename(filePath)}`);
}

function run() {
  console.log("🌀 Iniciando SystemForge Ingestor...");
  const files = globSync(TARGET_DIR);
  if (files.length === 0) {
    console.log(`⚠️ No se encontraron archivos en ${TARGET_DIR}.`);
    console.log("👉 Tip: Agrega un componente corriendo: npx shadcn-ui@latest add button");
    return;
  }

  files.forEach(processFile);
  console.log("🦾 Ingestión completada. Los componentes están listos para SystemForge Canvas.");
}

run();
