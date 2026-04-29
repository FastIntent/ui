import { defineConfig } from 'tsup';
import fs from 'fs';
import path from 'path';

// Helper to find all components dynamically
const getEntries = () => {
  const entries: Record<string, string> = {};
  const baseFile = path.resolve(__dirname, './src/registry.ts');
  if (fs.existsSync(baseFile)) {
    const code = fs.readFileSync(baseFile, 'utf-8');
    const matches = [...code.matchAll(/"([^"]+)"\s*:\s*{\s*exportName:\s*"([^"]+)"/g)];
    // Quick parse: find where each was exported from
    // But honestly we just need to search src/components for the file containing the type
    // Better yet, we can simply glob src/components and assume the file name matches type.
    // Actually, to be 100% accurate we can extract import paths from registry.ts
    const importRegex = /import\s+.*?\s+from\s+'(\.\/components\/.*?)'/g;
    const imports = [...code.matchAll(importRegex)];
    for (const match of matches) {
      const type = match[1];
      const exportName = match[2];
      // find import line that has this EXACT exportName (not substring match)
      // Uses word boundary regex to avoid "CanvasInput" matching when looking for "Input"
      const exportRegex = new RegExp(`\\b${exportName}\\b`);
      const line = code.split('\n').find(l => exportRegex.test(l) && l.includes('import'));
      if (line) {
        const importMatch = line.match(/from\s+'(\.\/components\/.*?)'/);
        if (importMatch) {
          entries[type] = importMatch[1].replace('./components/', 'src/components/') + (importMatch[1].endsWith('.tsx') || importMatch[1].endsWith('.ts') ? '' : '.tsx'); // basic resolution
          // Si el import no tiene extensión, asume tsx o ts
          if (!entries[type].endsWith('.tsx') && !entries[type].endsWith('.ts')) {
            if (fs.existsSync(path.resolve(__dirname, entries[type] + '.tsx'))) {
              entries[type] += '.tsx';
            } else if (fs.existsSync(path.resolve(__dirname, entries[type] + '.ts'))) {
              entries[type] += '.ts';
            } else if (fs.existsSync(path.resolve(__dirname, entries[type] + '/index.ts'))) {
              entries[type] += '/index.ts';
            } else if (fs.existsSync(path.resolve(__dirname, entries[type] + '/index.tsx'))) {
              entries[type] += '/index.tsx';
            }
          }
        }
      }
    }
  }
  
  // Fallback to manual if registry parse fails
  if (Object.keys(entries).length === 0) {
    return {
      'ui_hero':              'src/components/Hero/index.ts',
      'ui_hero_title':        'src/components/Hero/HeroTitle.tsx',
      'ui_hero_subtitle':     'src/components/Hero/HeroSubtitle.tsx',
      'ui_footer':            'src/components/Footer/index.ts',
      'ui_atc_button':        'src/components/AddToCartButton/index.ts',
      'ui_cart_badge':        'src/components/CartBadge/index.ts',
      'ui_card_wrapper':      'src/components/CardWrapper.tsx',
      'navbar':               'src/components/Navbar.tsx',
      'ui_text':              'src/components/Text.tsx',
    };
  }
  return entries;
};

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: false,
    splitting: true,
    clean: true,
    target: 'es2020',
    minify: false,
    injectStyle: false,
    external: ['react', 'react-dom', '@fastintent/store'],
    outDir: 'dist',
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      };
    },
  },
  {
    entry: getEntries(),
    format: ['cjs'],
    dts: false,
    splitting: false,
    clean: false,
    minify: true,
    injectStyle: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'framer-motion', '@fastintent/store', '@fastintent/ui'],
    noExternal: [
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      'cmdk',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-popover',
      '@radix-ui/react-slot',
    ],
    outDir: 'dist/editor',
    loader: { '.css': 'copy' },
  },
]);
