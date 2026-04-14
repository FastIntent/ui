"use client";
import React, { useState } from 'react';

interface CollapsibleProps {
  title?: string;
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  title = 'Toggle content',
  open: controlledOpen,
  children,
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  return (
    <div className={`w-full rounded-md border border-zinc-200 dark:border-zinc-800 ${className}`}>
      <button
        onClick={() => setInternalOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors rounded-t-md"
      >
        {title}
        <svg
          className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
        <div className="p-4 pt-0 text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800">
          {children || 'Collapsible content goes here.'}
        </div>
      </div>
    </div>
  );
};

Collapsible.displayName = 'Collapsible';

(Collapsible as any).meta = {
  type: "collapsible",
  name: "Collapsible",
  version: "1.0.0",
  category: "Data Display",
  isSlot: true,
  isContainer: true,
  description: "Single collapsible section with toggle. For expandable content.",
  propControls: [
    { name: "title", label: "Title", type: "text" },
    { name: "open", label: "Open", type: "boolean" },
  ],
};
