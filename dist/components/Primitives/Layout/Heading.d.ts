import React from 'react';
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    content: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    align?: 'left' | 'center' | 'right';
}
export declare const Heading: React.FC<HeadingProps>;
export {};
