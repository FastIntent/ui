"use client";
import React, { useState } from 'react';

interface HoverCardProps {
  trigger?: string;
  children?: React.ReactNode;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({
  trigger = 'Hover me',
  children,
  className = '',
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="text-sm font-medium text-primary underline underline-offset-4 cursor-pointer">
        {trigger}
      </span>

      {open && (
        <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-80 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-md ${className}`}>
          {children}
        </div>
      )}
    </div>
  );
};

HoverCard.displayName = 'HoverCard';

(HoverCard as any).meta = {
  type: "hovercard",
  name: "HoverCard",
  version: "1.0.0",
  category: "Overlays",
  isSlot: true,
  isContainer: true,
  description: "Card that appears on hover. Great for user profiles, previews.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
  ],
};
