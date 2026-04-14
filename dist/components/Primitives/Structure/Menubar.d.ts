import React from 'react';
interface MenubarMenu {
    label: string;
    items: {
        label: string;
        shortcut?: string;
        separator?: boolean;
    }[];
}
interface MenubarProps {
    menus?: MenubarMenu[];
    className?: string;
}
export declare const Menubar: React.FC<MenubarProps>;
export {};
