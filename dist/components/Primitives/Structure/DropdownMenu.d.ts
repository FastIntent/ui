import React from 'react';
interface DropdownMenuItem {
    label: string;
    shortcut?: string;
    disabled?: boolean;
    separator?: boolean;
}
interface DropdownMenuProps {
    trigger?: string;
    items?: DropdownMenuItem[];
    align?: 'start' | 'center' | 'end';
    className?: string;
}
export declare const DropdownMenu: React.FC<DropdownMenuProps>;
export {};
