import React from 'react';
interface PopoverProps {
    trigger?: string;
    children?: React.ReactNode;
    align?: 'start' | 'center' | 'end';
    className?: string;
}
export declare const Popover: React.FC<PopoverProps>;
export {};
