"use client";
import React, { useState, useRef, useEffect } from 'react';

interface DropdownMenuItem {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
}

interface DropdownMenuProps {
  trigger?: string;
  items?: DropdownMenuItem[];
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger = 'Menu',
  items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }],
  align = 'start',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
        <div className={`absolute top-full mt-1 ${alignClasses[align]} z-50 min-w-[8rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md ${className}`}>
          {items.map((item, i) =>
            item.separator ? (
              <div key={i} className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            ) : (
              <button
                key={i}
                disabled={item.disabled}
                onClick={() => setOpen(false)}
                className="relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && (
                  <span className="ml-auto text-xs text-zinc-500">{item.shortcut}</span>
                )}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

(DropdownMenu as any).meta = {
  type: "dropdownmenu",
  name: "DropdownMenu",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Dropdown menu with items, shortcuts, separators. For actions and navigation.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "align", label: "Alignment", type: "select", options: ["start", "center", "end"] },
  ],
};
