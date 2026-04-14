import React from 'react';
interface TabItem {
    label: string;
    content: string;
}
interface TabsProps {
    items?: TabItem[];
    defaultIndex?: number;
    className?: string;
}
export declare const Tabs: React.FC<TabsProps>;
export {};
