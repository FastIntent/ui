"use client";
import React, { useState } from 'react';

interface DialogProps {
  trigger?: string;
  title?: string;
  description?: string;
  open?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  trigger = 'Open',
  title = 'Dialog Title',
  description,
  open: controlledOpen,
  children,
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  return (
    <>
      <button
        onClick={() => setInternalOpen(true)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90 transition-colors"
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/80" onClick={() => setInternalOpen(false)} />
          <div className={`relative z-50 w-full max-w-lg rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg ${className}`}>
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

Dialog.displayName = 'Dialog';

(Dialog as any).meta = {
  type: "dialog",
  name: "Dialog",
  version: "1.0.0",
  category: "Overlays",
  isSlot: true,
  isContainer: true,
  description: "Modal dialog with trigger button, title, description, and content slot.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "open", label: "Open", type: "boolean" },
  ],
};
