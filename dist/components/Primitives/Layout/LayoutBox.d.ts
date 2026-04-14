import React from 'react';
interface LayoutBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: 'horizontal' | 'vertical' | 'grid';
    gap?: number;
    padding?: number;
    columns?: number;
}
export declare const LayoutBox: React.FC<LayoutBoxProps>;
export {};
