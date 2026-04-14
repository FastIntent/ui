"use client";
import React, { useState, useMemo } from 'react';

interface ComboboxOption {
  label: string;
  value: string;
}

interface ComboboxProps {
  label?: string;
  placeholder?: string;
  options?: ComboboxOption[];
  defaultValue?: string;
  className?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  label,
  placeholder = 'Search...',
  options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Next.js', value: 'nextjs' },
  ],
  defaultValue,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(defaultValue || '');

  const filtered = useMemo(
    () => options.filter(o => o.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  const selectedLabel = options.find(o => o.value === selected)?.label;

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{label}</label>}
      <div className="relative">
        <input
          type="text"
          value={open ? query : (selectedLabel || '')}
          onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setQuery(''); }} />
            <div className="absolute top-full left-0 z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-1 shadow-md">
              {filtered.length === 0 ? (
                <div className="px-3 py-2 text-sm text-zinc-500">No results found</div>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSelected(opt.value); setOpen(false); setQuery(''); }}
                    className={`flex w-full items-center px-3 py-1.5 text-sm transition-colors ${
                      selected === opt.value
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                        : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Combobox.displayName = 'Combobox';

(Combobox as any).meta = {
  type: "combobox",
  name: "Combobox",
  version: "1.0.0",
  category: "Inputs",
  description: "Searchable dropdown select. Autocomplete with filtering.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "placeholder", label: "Placeholder", type: "text" },
  ],
};
