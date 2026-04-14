import React from 'react';
interface ToggleGroupProps {
    items?: string[];
    type?: 'single' | 'multiple';
    variant?: 'default' | 'outline';
    size?: 'default' | 'sm' | 'lg';
    defaultValue?: string[];
    className?: string;
}
export declare const ToggleGroup: React.FC<ToggleGroupProps>;
export {};
