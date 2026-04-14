import React from 'react';
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    content: string;
    variant?: 'default' | 'muted' | 'nav';
}
export declare const Link: React.FC<LinkProps>;
export {};
