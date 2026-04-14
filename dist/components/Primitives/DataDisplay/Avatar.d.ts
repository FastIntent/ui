import React from 'react';
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare const Avatar: React.FC<AvatarProps>;
export {};
