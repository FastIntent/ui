import React from 'react';
interface CollapsibleProps {
    title?: string;
    open?: boolean;
    children?: React.ReactNode;
    className?: string;
}
export declare const Collapsible: React.FC<CollapsibleProps>;
export {};
