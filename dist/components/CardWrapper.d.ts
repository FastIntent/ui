import React from "react";
export interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    backgroundColor?: string;
    textColor?: string;
    shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
    radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    as?: React.ElementType;
    /** Number of cart items — auto-bound from CartContext via dataBinding. Destructured to prevent DOM leak. */
    cartCount?: number;
}
export declare const CardWrapper: React.ForwardRefExoticComponent<CardWrapperProps & React.RefAttributes<HTMLDivElement>>;
export default CardWrapper;
