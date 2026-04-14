import React from 'react';
interface ToastProps {
    title?: string;
    description?: string;
    variant?: 'default' | 'success' | 'destructive';
    duration?: number;
    open?: boolean;
    className?: string;
}
export declare const Toast: React.FC<ToastProps>;
export {};
