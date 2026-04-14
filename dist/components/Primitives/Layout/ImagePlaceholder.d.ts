import React from 'react';
interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}
export declare const ImagePlaceholder: React.FC<ImagePlaceholderProps>;
export {};
