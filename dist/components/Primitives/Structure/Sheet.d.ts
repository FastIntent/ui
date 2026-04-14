import React from 'react';
interface SheetProps {
    trigger?: string;
    title?: string;
    description?: string;
    side?: 'left' | 'right' | 'top' | 'bottom';
    open?: boolean;
    children?: React.ReactNode;
    className?: string;
}
export declare const Sheet: React.FC<SheetProps>;
export {};
