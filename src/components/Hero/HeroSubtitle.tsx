import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🎨 MANUAL DEL DESARROLLADOR: COMPONENTES HIJOS (SLOTS)
 * 
 * Un componente hijo/slot es una pieza atómica con las siguientes reglas:
 * 1. DEBE TENER 'isSlot: true' en su metadata (no aparece suelto en el catálogo).
 * 2. DEBE TENER 'parentConstraint' (para evitar que lo usen fuera de su contexto).
 */

export const HeroSubtitle = ({ 
  text = "Unleash your creativity.", 
  color = "#a1a1aa" 
}: { 
  text?: string; 
  color?: string;
}) => {
  return (
    <motion.p 
      id="ui-hero-subtitle"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto"
      style={{ color }}
    >
      {text}
    </motion.p>
  );
};

// Adjuntamos metadata para que el registro la recoja automáticamente
(HeroSubtitle as any).meta = {
  type: "ui_hero_subtitle",
  name: "Hero Subtitle",
  version: "1.0.0",
  category: "Marketing",
  isSlot: true, visibility: 'internal',
  parentConstraint: "ui_hero", // 🛡️ Protección de jerarquía
  description: "Subtítulo dinámico para el Hero Section.",
  propControls: [
    { name: "text", label: "Texto", type: "string", defaultValue: "Unleash your creativity." },
    { name: "color", label: "Color", type: "color", defaultValue: "#a1a1aa" }
  ],
  dependencies: { "framer-motion": "latest" }
};

export default HeroSubtitle;
