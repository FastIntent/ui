import React from 'react';
interface AccordionItem {
    title: string;
    content: string;
}
interface AccordionProps {
    items?: AccordionItem[];
    type?: 'single' | 'multiple';
    className?: string;
}
export declare const Accordion: React.FC<AccordionProps>;
export {};
