import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🎨 MANUAL DEL DESARROLLADOR: COMPONENTES HIJOS (SLOTS)
 * 
 * Un componente hijo/slot es una pieza atómica con las siguientes reglas:
 * 1. DEBE TENER 'isSlot: true' en su metadata (no aparece suelto en el catálogo).
 * 2. DEBE TENER 'parentConstraint' (para evitar que lo usen fuera de su contexto).
 * 3. Funcionalidad Focalizada: Su responsabilidad es puramente renderizar una 
 *    parte visual o lógica específica (ej: Título, Botón, Icono).
 */

export const HeroTitle = ({ 
  text = "Building the Future", 
  color = "#ffffff" 
}: { 
  text?: string; 
  color?: string;
}) => {
  return (
    <motion.h1 
      id="ui-hero-title"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-4xl md:text-6xl font-bold tracking-tight"
      style={{ color }}
    >
      {text}
    </motion.h1>
  );
};

// Adjuntamos metadata para que el registro la recoja automáticamente
(HeroTitle as any).meta = {
  type: "ui_hero_title",
  name: "Hero Title",
  version: "1.0.0",
  isSlot: true, visibility: 'internal',
  parentConstraint: "ui_hero", // 🛡️ Protección de jerarquía
  description: "Título dinámico para el Hero Section.",
  propControls: [
    { name: "text", label: "Texto", type: "string", defaultValue: "Building the Future" },
    { name: "color", label: "Color", type: "color", defaultValue: "#ffffff" }
  ],
  dependencies: { "framer-motion": "latest" }
};

export default HeroTitle;
