import React from 'react';
interface ContextMenuItem {
    label: string;
    shortcut?: string;
    separator?: boolean;
}
interface ContextMenuProps {
    items?: ContextMenuItem[];
    children?: React.ReactNode;
    className?: string;
}
export declare const ContextMenu: React.FC<ContextMenuProps>;
export {};
