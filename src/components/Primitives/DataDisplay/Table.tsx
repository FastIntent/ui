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

export const Table: React.FC<TableProps> = ({
  columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
  ],
  data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'Viewer' },
  ],
  striped = true,
  className = '',
  ...rest
}) => {
  return (
    <div {...rest} className={`w-full overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-800 ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-400">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-zinc-200 dark:border-zinc-800 last:border-0 ${
                striped && i % 2 === 1 ? 'bg-zinc-50/50 dark:bg-zinc-900/50' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3 text-zinc-900 dark:text-zinc-100">
                  {row[col.accessor] || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';

(Table as any).meta = {
  type: "table",
  name: "Table",
  version: "1.0.0",
  category: "DataDisplay",
  description: "Data table with columns, rows, and optional striping.",
  propControls: [
    { name: "striped", label: "Striped", type: "boolean" },
  ],
};
