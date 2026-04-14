import React from 'react';
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
    background?: 'default' | 'muted' | 'primary' | 'dark';
    paddingY?: 'sm' | 'md' | 'lg' | 'xl';
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
export declare const Section: React.FC<SectionProps>;
export {};
