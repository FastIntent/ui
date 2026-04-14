"use client";
import React, { useState } from 'react';

interface MenubarMenu {
  label: string;
  items: { label: string; shortcut?: string; separator?: boolean }[];
}

interface MenubarProps {
  menus?: MenubarMenu[];
  className?: string;
}

export const Menubar: React.FC<MenubarProps> = ({
  menus = [
    { label: 'File', items: [{ label: 'New' }, { label: 'Open' }, { separator: true, label: '' }, { label: 'Save', shortcut: '⌘S' }] },
    { label: 'Edit', items: [{ label: 'Undo', shortcut: '⌘Z' }, { label: 'Redo', shortcut: '⌘⇧Z' }] },
    { label: 'View', items: [{ label: 'Zoom In' }, { label: 'Zoom Out' }] },
  ],
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`flex items-center space-x-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-sm ${className}`}>
      {menus.map((menu, idx) => (
        <div key={idx} className="relative">
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            onMouseEnter={() => openIndex !== null && setOpenIndex(idx)}
            className={`rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${
              openIndex === idx
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            {menu.label}
          </button>

          {openIndex === idx && (
            <div className="absolute left-0 top-full mt-1 z-50 min-w-[12rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md">
              {menu.items.map((item, i) =>
                item.separator ? (
                  <div key={i} className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                ) : (
                  <button
                    key={i}
                    onClick={() => setOpenIndex(null)}
                    className="relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && <span className="ml-auto text-xs text-zinc-500">{item.shortcut}</span>}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

Menubar.displayName = 'Menubar';

(Menubar as any).meta = {
  type: "menubar",
  name: "Menubar",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Desktop application-style menu bar with dropdown menus.",
  propControls: [],
};
