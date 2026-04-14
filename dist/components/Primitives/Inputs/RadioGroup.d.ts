import React from 'react';
interface RadioOption {
    label: string;
    value: string;
}
interface RadioGroupProps {
    label?: string;
    options?: RadioOption[];
    defaultValue?: string;
    orientation?: 'vertical' | 'horizontal';
    className?: string;
}
export declare const RadioGroup: React.FC<RadioGroupProps>;
export {};
