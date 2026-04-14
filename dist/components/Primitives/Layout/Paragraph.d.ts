import React from 'react';
interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    content: string;
    size?: 'sm' | 'base' | 'lg';
    muted?: boolean;
    align?: 'left' | 'center' | 'right';
}
export declare const Paragraph: React.FC<ParagraphProps>;
export {};
