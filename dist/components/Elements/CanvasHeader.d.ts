import React from "react";
export interface CanvasHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
    props?: {
        logoText?: string;
        links?: string[];
        buttonText?: string;
    };
}
/**
 * 🛰️ CANVAS HEADER
 * High-performance sticky header migrated to @FastIntent/ui core.
 */
export declare const CanvasHeader: React.ForwardRefExoticComponent<CanvasHeaderProps & React.RefAttributes<HTMLDivElement>>;
