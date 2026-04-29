import React from 'react';
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
export declare const Hero: <C extends React.ElementType = "section">({ children, backgroundColor, as, ...props }: HeroProps<C>) => import("react/jsx-runtime").JSX.Element;
export default Hero;
