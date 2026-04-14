"use client";
import React, { useState } from 'react';

interface NavItem {
  label: string;
  href?: string;
  description?: string;
  children?: { label: string; href?: string; description?: string }[];
}

interface NavigationMenuProps {
  items?: NavItem[];
  className?: string;
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items = [
    { label: 'Getting Started', children: [
      { label: 'Introduction', description: 'Learn the basics', href: '#' },
      { label: 'Installation', description: 'How to install', href: '#' },
    ]},
    { label: 'Components', children: [
      { label: 'Button', description: 'Interactive button', href: '#' },
      { label: 'Card', description: 'Content container', href: '#' },
    ]},
    { label: 'Documentation', href: '#' },
  ],
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav className={`flex items-center space-x-1 ${className}`}>
      {items.map((item, idx) => (
        <div key={idx} className="relative">
          {item.children ? (
            <>
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                onMouseEnter={() => openIndex !== null && setOpenIndex(idx)}
                className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  openIndex === idx
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {item.label}
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>

              {openIndex === idx && (
                <div className="absolute left-0 top-full mt-1.5 z-50 w-[400px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-lg">
                  <div className="grid gap-3">
                    {item.children.map((child, ci) => (
                      <a
                        key={ci}
                        href={child.href || '#'}
                        className="block rounded-md p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setOpenIndex(null)}
                      >
                        <div className="text-sm font-medium text-zinc-900 dark:text-white">{child.label}</div>
                        {child.description && (
                          <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{child.description}</div>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <a
              href={item.href || '#'}
              className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
};

NavigationMenu.displayName = 'NavigationMenu';

(NavigationMenu as any).meta = {
  type: "navigationmenu",
  name: "NavigationMenu",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Horizontal navigation with dropdown mega-menus. For site-wide navigation.",
  propControls: [],
};
