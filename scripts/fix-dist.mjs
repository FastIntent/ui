import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), './dist');

const fixFile = (filePath) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Si encontramos "use client", lo movemos al principio absoluto
  if (content.includes('"use client"')) {
    console.log(`✨ Fix: Moving "use client" to the top in ${path.basename(filePath)}`);
    content = content.replace(/"use client";/g, '').replace(/'use client';/g, '');
    content = `"use client";\n${content}`;
    fs.writeFileSync(filePath, content);
  }
};

// Fix main bundles
fixFile(path.join(distDir, 'index.js'));
fixFile(path.join(distDir, 'index.mjs'));

// Fix editor components if they exist
const editorDir = path.join(distDir, 'editor');
if (fs.existsSync(editorDir)) {
  fs.readdirSync(editorDir).forEach(file => {
    if (file.endsWith('.js') || file.endsWith('.mjs')) {
      fixFile(path.join(editorDir, file));
    }
  });
}
