"use client";
import React, { useState } from 'react';

interface PaginationProps {
  totalPages?: number;
  defaultPage?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages = 10,
  defaultPage = 1,
  className = '',
}) => {
  const [current, setCurrent] = useState(defaultPage);

  const getPages = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const btnBase = "inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 transition-colors";

  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      <button
        disabled={current <= 1}
        onClick={() => setCurrent(p => Math.max(1, p - 1))}
        className={`${btnBase} border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 text-zinc-700 dark:text-zinc-300`}
      >
        ‹
      </button>

      {getPages().map((page, i) =>
        page === '...' ? (
          <span key={`dots-${i}`} className="px-1 text-zinc-400">...</span>
        ) : (
          <button
            key={page}
            onClick={() => setCurrent(page)}
            className={`${btnBase} ${
              current === page
                ? 'bg-primary text-primary-foreground'
                : 'border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={current >= totalPages}
        onClick={() => setCurrent(p => Math.min(totalPages, p + 1))}
        className={`${btnBase} border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 text-zinc-700 dark:text-zinc-300`}
      >
        ›
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

(Pagination as any).meta = {
  type: "pagination",
  name: "Pagination",
  version: "1.0.0",
  category: "Navigation",
  description: "Page navigation with numbered buttons.",
  propControls: [
    { name: "totalPages", label: "Total Pages", type: "number" },
    { name: "defaultPage", label: "Default Page", type: "number" },
  ],
};
