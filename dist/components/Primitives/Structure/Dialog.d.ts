import React from 'react';
interface DialogProps {
    trigger?: string;
    title?: string;
    description?: string;
    open?: boolean;
    children?: React.ReactNode;
    className?: string;
}
export declare const Dialog: React.FC<DialogProps>;
export {};
