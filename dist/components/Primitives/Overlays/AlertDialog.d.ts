import React from 'react';
interface AlertDialogProps {
    trigger?: string;
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    variant?: 'default' | 'destructive';
    open?: boolean;
    className?: string;
}
export declare const AlertDialog: React.FC<AlertDialogProps>;
export {};
