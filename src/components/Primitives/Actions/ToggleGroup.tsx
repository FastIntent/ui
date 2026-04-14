"use client";
import React, { useState } from 'react';

interface ToggleGroupProps {
  items?: string[];
  type?: 'single' | 'multiple';
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  defaultValue?: string[];
  className?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  items = ['Bold', 'Italic', 'Underline'],
  type = 'multiple',
  variant = 'outline',
  size = 'default',
  defaultValue = [],
  className = '',
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(defaultValue));

  const toggle = (item: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        if (type === 'single') next.clear();
        next.add(item);
      }
      return next;
    });
  };

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3 text-sm',
    lg: 'h-11 px-4 text-sm',
  };

  return (
    <div className={`inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 ${className}`}>
      {items.map((item, i) => {
        const isActive = selected.has(item);
        return (
          <button
            key={item}
            onClick={() => toggle(item)}
            className={`${sizeClasses[size]} font-medium transition-colors ${
              i > 0 ? 'border-l border-zinc-200 dark:border-zinc-800' : ''
            } ${
              isActive
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
            } ${i === 0 ? 'rounded-l-md' : ''} ${i === items.length - 1 ? 'rounded-r-md' : ''}`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

ToggleGroup.displayName = 'ToggleGroup';

(ToggleGroup as any).meta = {
  type: "togglegroup",
  name: "ToggleGroup",
  version: "1.0.0",
  category: "Actions",
  description: "Group of toggles for multi-select or single-select.",
  propControls: [
    { name: "type", label: "Type", type: "select", options: ["single", "multiple"] },
    { name: "variant", label: "Variant", type: "select", options: ["default", "outline"] },
    { name: "size", label: "Size", type: "select", options: ["sm", "default", "lg"] },
  ],
};
