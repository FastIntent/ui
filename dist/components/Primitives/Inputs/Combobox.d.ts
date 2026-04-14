import React from 'react';
interface ComboboxOption {
    label: string;
    value: string;
}
interface ComboboxProps {
    label?: string;
    placeholder?: string;
    options?: ComboboxOption[];
    defaultValue?: string;
    className?: string;
}
export declare const Combobox: React.FC<ComboboxProps>;
export {};
