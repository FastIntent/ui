import React from "react";
export interface NavLink {
    label: string;
    href: string;
}
export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
    logoText?: string;
    links?: (string | NavLink)[];
    ctaText?: string;
}
/**
 * 🛰️ NAVBAR COMPONENT (WITH SMART LINKS)
 * 📐 Parity: Dynamic layout with children and real navigation support
 */
export declare const Navbar: React.ForwardRefExoticComponent<NavbarProps & React.RefAttributes<HTMLDivElement>>;
