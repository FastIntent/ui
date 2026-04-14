"use client";
import React, { useState, useRef } from 'react';

interface PopoverProps {
  trigger?: string;
  children?: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger = 'Open',
  children,
  align = 'center',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white"
      >
        {trigger}
      </button>

      {open && (
        <div className={`absolute top-full mt-2 ${alignClasses[align]} z-50 w-72 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-md ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
};

Popover.displayName = 'Popover';

(Popover as any).meta = {
  type: "popover",
  name: "Popover",
  version: "1.0.0",
  category: "Overlay",
  isSlot: true,
  isContainer: true,
  description: "Floating content panel attached to a trigger button.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "align", label: "Alignment", type: "select", options: ["start", "center", "end"] },
  ],
};
