import React from 'react';
interface CheckboxProps {
    label?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string;
}
export declare const Checkbox: React.FC<CheckboxProps>;
export {};
