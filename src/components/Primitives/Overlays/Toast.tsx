"use client";
import React, { useState, useEffect } from 'react';

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'destructive';
  duration?: number;
  open?: boolean;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  title = 'Notification',
  description,
  variant = 'default',
  duration = 5000,
  open: controlledOpen = true,
  className = '',
}) => {
  const [visible, setVisible] = useState(controlledOpen);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [visible, duration]);

  if (!visible) return null;

  const variantClasses = {
    default: 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800',
    success: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800',
    destructive: 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-[360px] rounded-lg border p-4 shadow-lg ${variantClasses[variant]} ${className}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</p>
          {description && <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
        </div>
        <button onClick={() => setVisible(false)} className="text-zinc-400 hover:text-zinc-600 transition-colors">✕</button>
      </div>
    </div>
  );
};

Toast.displayName = 'Toast';

(Toast as any).meta = {
  type: "toast",
  name: "Toast",
  version: "1.0.0",
  category: "Overlays",
  description: "Notification toast with auto-dismiss.",
  propControls: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "success", "destructive"] },
    { name: "duration", label: "Duration (ms)", type: "number" },
  ],
};
