import React from 'react';
interface TableColumn {
    header: string;
    accessor: string;
}
interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
    columns?: TableColumn[];
    data?: Record<string, string>[];
    striped?: boolean;
}
export declare const Table: React.FC<TableProps>;
export {};
