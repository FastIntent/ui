"use client";
import React, { useState } from 'react';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  label,
  checked: controlledChecked,
  onCheckedChange,
  disabled = false,
  className = '',
}) => {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = controlledChecked ?? internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <label className={`flex items-center gap-3 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${
          isChecked ? 'bg-primary' : 'bg-zinc-200 dark:bg-zinc-800'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${
            isChecked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      {label && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>}
    </label>
  );
};

Switch.displayName = 'Switch';

(Switch as any).meta = {
  type: "switch",
  name: "Switch",
  version: "1.0.0",
  category: "Inputs",
  description: "Toggle switch for boolean settings.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "checked", label: "Checked", type: "boolean" },
    { name: "disabled", label: "Disabled", type: "boolean" },
  ],
};
