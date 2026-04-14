import React from 'react';
interface TooltipProps {
    content?: string;
    side?: 'top' | 'bottom' | 'left' | 'right';
    children?: React.ReactNode;
    className?: string;
}
export declare const Tooltip: React.FC<TooltipProps>;
export {};
