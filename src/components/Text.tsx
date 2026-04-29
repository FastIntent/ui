import React from 'react';
import { colors, typography, spacing } from '@fastintent/design-tokens';

/**
 * 🎨 COMPONENTE DE TEXTO POLIMÓRFICO PREMIUM
 * 
 * Este componente es el bloque de construcción fundamental para la tipografía.
 * Soporta polimorfismo (cambiar de 'p' a 'h1', 'span', etc.) y está
 * totalmente integrado con el Design System de FastIntent.
 */

type TextProps<C extends React.ElementType> = {
  children?: React.ReactNode;
  color?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'children' | 'color' | 'size' | 'weight'>;

export const Text = <C extends React.ElementType = 'p'>({ 
  children, 
  color, 
  size = 'base', 
  weight = 'normal', 
  as,
  ...all
}: TextProps<C>) => {
  const Component = as || 'p';
  const { className = '', ...props } = all as any;

  const style = {
    color: color || colors.text.body,
    ...(color && { color }),
  };

  return (
    <Component 
      className={`ui-text-${size} ui-weight-${weight} ${className}` as any}
      style={style}
      {...(props as any)}
    >
      {children}
    </Component>
  );
};


(Text as any).meta = {
  type: "ui_text",
  name: "Master Typography",
  version: "1.2.0",
  category: "Typography",
  description: "Componente de texto core impulsado por Design Tokens y SSOT.",
  propControls: [
    {
      name: "children",
      label: "Texto / Contenido",
      type: "string",
      defaultValue: "Escribe algo...",
    },
    {
      name: "color",
      label: "Color Texto",
      type: "color",
      defaultValue: "var(--foreground)",
    },
    {
      name: "as",
      label: "Tag Semántico",
      type: "enum",
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div"],
      defaultValue: "p"
    },
    {
      name: "size",
      label: "Tamaño",
      type: "enum",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      defaultValue: "base",
      coercesFrom: "fontSize",
      weaverCoercionTable: { "<=12": "xs", "<=14": "sm", "<=16": "base", "<=18": "lg", "<=20": "xl", "<=24": "2xl", "<=30": "3xl", "<=36": "4xl", "<=48": "5xl", ">48": "6xl" },
    },
    {
      name: "weight",
      label: "Grosor",
      type: "enum",
      options: ["light", "normal", "medium", "semibold", "bold", "black"],
      defaultValue: "normal",
      coercesFrom: "fontWeight",
      weaverCoercionTable: { "100-300": "light", "400": "normal", "500": "medium", "600": "semibold", "700-800": "bold", "900": "black" },
    },
  ],
  migrations: {
    "1.2.0": (props: any) => {
      // 🔄 Traslado de contenido heredado al nuevo estándar
      if (props.content && !props.children) {
        const { content, ...rest } = props;
        return { ...rest, children: content };
      }
      return props;
    }
  },
  dependencies: {
    "@fastintent/design-tokens": "1.0.0",
  },
};

export default Text;

