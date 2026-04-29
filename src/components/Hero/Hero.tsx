import React from 'react';
import { motion } from 'framer-motion';
import { colors, spacing, radii } from '@fastintent/design-tokens';

/**
 * 📘 MANUAL: COMPONENTES POLIMÓRFICOS Y TOKENS
 * 
 * 1. DESIGN TOKENS: Nunca usar hex-codes directos. 
 *    Usar la librería @fastintent/design-tokens.
 * 
 * 2. POLIMORFISMO (Prop 'as'): 
 *    Permite que un componente cambie su tag HTML raíz sin perder estilos.
 */

type HeroProps<C extends React.ElementType> = {
  children?: React.ReactNode;
  backgroundColor?: string;
  as?: C;
} & React.ComponentPropsWithoutRef<C>;

export const Hero = <C extends React.ElementType = 'section'>({ 
  children, 
  backgroundColor = colors.background.dark, // 💎 Usando tokens
  as,
  ...props
}: HeroProps<C>) => {
  const Component = as || 'section';
  
  return (
    <Component 
      id="ui-hero-parent"
      className="relative w-full min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ 
        backgroundColor,
        padding: spacing.lg // 💎 Usando tokens
      }}
      {...props}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"
      />
      
      <div 
        className="relative z-10 max-w-4xl w-full flex flex-col items-center"
        style={{ gap: spacing.md }} // 💎 Usando tokens
      >
        {children || <p className="text-zinc-500 italic">Arrastra tus slots aquí...</p>}
      </div>
    </Component>
  );
};

(Hero as any).meta = {
  type: "ui_hero",
  name: "Enterprise Hero Master",
  version: "1.3.0",
  category: "Marketing",
  description: "Sección hero polimórfica optimizada para el Weaver y SSOT.",
  propControls: [
    { 
      name: "backgroundColor", 
      label: "Fondo", 
      type: "color", 
      defaultValue: "var(--background-dark)" 
    },
    { 
      name: "padding", 
      label: "Padding (Spacing)", 
      type: "enum", 
      options: ["none", "sm", "md", "lg", "xl", "2xl"], 
      defaultValue: "lg" 
    },
    { 
      name: "alignment", 
      label: "Alineación", 
      type: "enum", 
      options: ["left", "center", "right"], 
      defaultValue: "center" 
    },
    { 
      name: "as", 
      label: "Tag Semántico", 
      type: "enum", 
      options: ["section", "article", "div", "header"], 
      defaultValue: "section" 
    }
  ],
  dependencies: { 
    "framer-motion": "latest",
    "@fastintent/design-tokens": "1.0.0" 
  }
};

export default Hero;
