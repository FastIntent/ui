import React from 'react';
type FooterBaseProps = {
    children?: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    companyName?: string;
    logo?: string;
};
type DimensionProps = {
    paddingTop?: string | number;
    paddingBottom?: string | number;
    paddingLeft?: string | number;
    paddingRight?: string | number;
};
type PolymorphicProps<C extends React.ElementType> = {
    as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof FooterBaseProps | keyof DimensionProps | 'as'>;
export type FooterProps<C extends React.ElementType> = FooterBaseProps & DimensionProps & PolymorphicProps<C>;
export declare const Footer: <C extends React.ElementType = "footer">({ children, backgroundColor, textColor, companyName, logo, as, ...allProps }: FooterProps<C>) => import("react/jsx-runtime").JSX.Element;
export default Footer;
