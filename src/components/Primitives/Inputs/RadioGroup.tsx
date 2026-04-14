"use client";
import React, { useState } from 'react';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label?: string;
  options?: RadioOption[];
  defaultValue?: string;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ],
  defaultValue,
  orientation = 'vertical',
  className = '',
}) => {
  const [selected, setSelected] = useState(defaultValue || options[0]?.value);

  return (
    <fieldset className={`${className}`}>
      {label && <legend className="text-sm font-medium text-zinc-900 dark:text-white mb-3">{label}</legend>}
      <div className={`flex ${orientation === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4'}`}>
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setSelected(opt.value)}
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                selected === opt.value
                  ? 'border-primary'
                  : 'border-zinc-300 dark:border-zinc-700'
              }`}
            >
              {selected === opt.value && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

RadioGroup.displayName = 'RadioGroup';

(RadioGroup as any).meta = {
  type: "radiogroup",
  name: "RadioGroup",
  version: "1.0.0",
  category: "Inputs",
  description: "Group of radio buttons for single selection.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "orientation", label: "Orientation", type: "select", options: ["vertical", "horizontal"] },
  ],
};
