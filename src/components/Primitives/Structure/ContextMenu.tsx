"use client";
import React, { useState } from 'react';

interface ContextMenuItem {
  label: string;
  shortcut?: string;
  separator?: boolean;
}

interface ContextMenuProps {
  items?: ContextMenuItem[];
  children?: React.ReactNode;
  className?: string;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  items = [{ label: 'Cut', shortcut: '⌘X' }, { label: 'Copy', shortcut: '⌘C' }, { label: 'Paste', shortcut: '⌘V' }],
  children,
  className = '',
}) => {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const handleContext = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        onContextMenu={handleContext}
        className={`min-h-[100px] rounded-md border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm text-zinc-500 ${className}`}
      >
        {children || 'Right-click here'}
      </div>

      {pos && (
        <>
          <div className="fixed inset-0 z-50" onClick={() => setPos(null)} />
          <div
            className="fixed z-50 min-w-[8rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md"
            style={{ left: pos.x, top: pos.y }}
          >
            {items.map((item, i) =>
              item.separator ? (
                <div key={i} className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
              ) : (
                <button
                  key={i}
                  onClick={() => setPos(null)}
                  className="relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && <span className="ml-auto text-xs text-zinc-500">{item.shortcut}</span>}
                </button>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};

ContextMenu.displayName = 'ContextMenu';

(ContextMenu as any).meta = {
  type: "contextmenu",
  name: "ContextMenu",
  version: "1.0.0",
  category: "Navigation",
  isSlot: true,
  isContainer: true,
  description: "Right-click context menu with items and shortcuts.",
  propControls: [],
};
