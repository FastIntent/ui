"use client";
import React, { useState } from 'react';

interface SheetProps {
  trigger?: string;
  title?: string;
  description?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Sheet: React.FC<SheetProps> = ({
  trigger = 'Open',
  title,
  description,
  side = 'right',
  open: controlledOpen,
  children,
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const sideClasses = {
    left: 'inset-y-0 left-0 w-3/4 max-w-sm border-r',
    right: 'inset-y-0 right-0 w-3/4 max-w-sm border-l',
    top: 'inset-x-0 top-0 h-auto border-b',
    bottom: 'inset-x-0 bottom-0 h-auto border-t',
  };

  const translateClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  };

  return (
    <>
      <button
        onClick={() => setInternalOpen(true)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90 transition-colors"
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/80" onClick={() => setInternalOpen(false)} />
          <div className={`fixed ${sideClasses[side]} bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 p-6 shadow-lg transition-transform duration-300 ${translateClasses[side]} ${className}`}>
            {title && <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h2>}
            {description && <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
            <div className="mt-4">{children}</div>
            <button
              onClick={() => setInternalOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-zinc-500 transition-opacity"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Sheet.displayName = 'Sheet';

(Sheet as any).meta = {
  type: "sheet",
  name: "Sheet",
  version: "1.0.0",
  category: "Overlays",
  isSlot: true,
  isContainer: true,
  description: "Slide-out panel from any edge. Great for mobile menus, filters, settings.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "side", label: "Side", type: "select", options: ["left", "right", "top", "bottom"] },
    { name: "open", label: "Open", type: "boolean" },
  ],
};
