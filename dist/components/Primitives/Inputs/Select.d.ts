import React from 'react';
interface SelectOption {
    label: string;
    value: string;
}
interface SelectProps {
    label?: string;
    placeholder?: string;
    options?: SelectOption[];
    defaultValue?: string;
    className?: string;
}
export declare const Select: React.FC<SelectProps>;
export {};
