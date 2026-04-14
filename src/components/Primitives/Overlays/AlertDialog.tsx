"use client";
import React, { useState } from 'react';

interface AlertDialogProps {
  trigger?: string;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  variant?: 'default' | 'destructive';
  open?: boolean;
  className?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  trigger = 'Delete',
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  cancelText = 'Cancel',
  confirmText = 'Continue',
  variant = 'default',
  open: controlledOpen,
  className = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;

  const confirmClasses = variant === 'destructive'
    ? 'bg-red-600 text-white hover:bg-red-700'
    : 'bg-primary text-primary-foreground hover:bg-primary/90';

  return (
    <>
      <button
        onClick={() => setInternalOpen(true)}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors ${
          variant === 'destructive'
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-primary text-primary-foreground hover:bg-primary/90'
        }`}
      >
        {trigger}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/80" />
          <div className={`relative z-50 w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg ${className}`}>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{title}</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setInternalOpen(false)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white"
              >
                {cancelText}
              </button>
              <button
                onClick={() => setInternalOpen(false)}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors ${confirmClasses}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

AlertDialog.displayName = 'AlertDialog';

(AlertDialog as any).meta = {
  type: "alertdialog",
  name: "AlertDialog",
  version: "1.0.0",
  category: "Overlays",
  description: "Confirmation dialog with cancel/confirm actions.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "cancelText", label: "Cancel Text", type: "text" },
    { name: "confirmText", label: "Confirm Text", type: "text" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "destructive"] },
  ],
};
