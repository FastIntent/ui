"use client";
import React, { useState } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options?: SelectOption[];
  defaultValue?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select an option',
  options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ],
  defaultValue,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || '');

  const selectedLabel = options.find(o => o.value === selected)?.label;

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{label}</label>}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <span className={selectedLabel ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'}>
            {selectedLabel || placeholder}
          </span>
          <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-1 shadow-md">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSelected(opt.value); setOpen(false); }}
                  className={`flex w-full items-center px-3 py-1.5 text-sm transition-colors ${
                    selected === opt.value
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

Select.displayName = 'Select';

(Select as any).meta = {
  type: "select",
  name: "Select",
  version: "1.0.0",
  category: "Inputs",
  description: "Dropdown select with custom styling.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "placeholder", label: "Placeholder", type: "text" },
  ],
};
