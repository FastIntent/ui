import React from 'react';
interface ToggleProps {
    content?: string;
    pressed?: boolean;
    variant?: 'default' | 'outline';
    size?: 'default' | 'sm' | 'lg';
    className?: string;
}
export declare const Toggle: React.FC<ToggleProps>;
export {};
