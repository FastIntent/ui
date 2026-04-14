"use client";
import React, { useState } from 'react';

interface TabItem {
  label: string;
  content: string;
}

interface TabsProps {
  items?: TabItem[];
  defaultIndex?: number;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items = [
    { label: 'Account', content: 'Make changes to your account settings here.' },
    { label: 'Password', content: 'Change your password here.' },
    { label: 'Notifications', content: 'Configure your notification preferences.' },
  ],
  defaultIndex = 0,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              i === activeIndex
                ? 'border-primary text-zinc-900 dark:text-white'
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-zinc-700 dark:text-zinc-300">
        {items[activeIndex]?.content}
      </div>
    </div>
  );
};

Tabs.displayName = 'Tabs';

(Tabs as any).meta = {
  type: "tabs",
  name: "Tabs",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Tabbed content switcher. For settings, categories, content organization.",
  propControls: [
    { name: "defaultIndex", label: "Default Tab", type: "number" },
  ],
};
