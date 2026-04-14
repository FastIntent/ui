import React from 'react';
interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
    brand?: string;
    sticky?: boolean;
}
export declare const NavBar: React.FC<NavBarProps>;
export {};
