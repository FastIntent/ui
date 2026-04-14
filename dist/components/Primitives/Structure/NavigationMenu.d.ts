import React from 'react';
interface NavItem {
    label: string;
    href?: string;
    description?: string;
    children?: {
        label: string;
        href?: string;
        description?: string;
    }[];
}
interface NavigationMenuProps {
    items?: NavItem[];
    className?: string;
}
export declare const NavigationMenu: React.FC<NavigationMenuProps>;
export {};
