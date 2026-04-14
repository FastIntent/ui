import React from 'react';
interface SliderProps {
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    showValue?: boolean;
    className?: string;
}
export declare const Slider: React.FC<SliderProps>;
export {};
