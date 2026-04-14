import React from 'react';
interface SwitchProps {
    label?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}
export declare const Switch: React.FC<SwitchProps>;
export {};
