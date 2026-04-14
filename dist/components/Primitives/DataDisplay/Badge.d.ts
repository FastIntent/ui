import React from 'react';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    content: string;
    variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}
export declare const Badge: React.FC<BadgeProps>;
export {};
