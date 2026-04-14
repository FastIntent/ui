import React from 'react';
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
export declare const Text: <C extends React.ElementType = "p">({ children, color, size, weight, as, ...all }: TextProps<C>) => import("react/jsx-runtime").JSX.Element;
export default Text;
