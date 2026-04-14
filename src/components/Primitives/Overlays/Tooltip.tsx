"use client";
import React, { useState } from 'react';

interface TooltipProps {
  content?: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content = 'Tooltip text',
  side = 'top',
  children,
  className = '',
}) => {
  const [visible, setVisible] = useState(false);

  const sideClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children || (
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white">
          Hover me
        </button>
      )}

      {visible && (
        <div className={`absolute z-50 ${sideClasses[side]} px-3 py-1.5 rounded-md bg-zinc-900 dark:bg-zinc-50 text-xs text-white dark:text-zinc-900 shadow-md whitespace-nowrap ${className}`}>
          {content}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

(Tooltip as any).meta = {
  type: "tooltip",
  name: "Tooltip",
  version: "1.0.0",
  category: "Overlays",
  description: "Small floating label on hover.",
  propControls: [
    { name: "content", label: "Text", type: "text" },
    { name: "side", label: "Side", type: "select", options: ["top", "bottom", "left", "right"] },
  ],
};
