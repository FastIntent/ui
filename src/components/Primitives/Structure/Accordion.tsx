"use client";
import React, { useState } from 'react';

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items?: AccordionItem[];
  type?: 'single' | 'multiple';
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items = [
    { title: 'Is this accessible?', content: 'Yes. It follows the WAI-ARIA design pattern.' },
    { title: 'Is it styled?', content: 'Yes. It comes with default styles that match the other components.' },
    { title: 'Is it animated?', content: 'Yes. It uses CSS transitions for smooth open/close animations.' },
  ],
  type = 'single',
  className = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (type === 'single') next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={`w-full divide-y divide-zinc-200 dark:divide-zinc-800 border-b border-zinc-200 dark:border-zinc-800 ${className}`}>
      {items.map((item, i) => {
        const isOpen = openItems.has(i);
        return (
          <div key={i}>
            <button
              onClick={() => toggle(i)}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-zinc-900 dark:text-white hover:underline transition-all"
            >
              {item.title}
              <svg
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}
            >
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = 'Accordion';

(Accordion as any).meta = {
  type: "accordion",
  name: "Accordion",
  version: "1.0.0",
  category: "Data Display",
  isSlot: false,
  isContainer: false,
  description: "Collapsible content sections. Great for FAQ, settings, documentation.",
  propControls: [
    { name: "type", label: "Type", type: "select", options: ["single", "multiple"] },
  ],
};
