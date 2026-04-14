import React from 'react';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    image?: string;
    badge?: string;
    footer?: string;
}
export declare const Card: React.FC<CardProps>;
export {};
