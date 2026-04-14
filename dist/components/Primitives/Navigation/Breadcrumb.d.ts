import React from 'react';
interface BreadcrumbItem {
    label: string;
    href?: string;
}
interface BreadcrumbProps {
    items?: BreadcrumbItem[];
    separator?: string;
    className?: string;
}
export declare const Breadcrumb: React.FC<BreadcrumbProps>;
export {};
