"use client";
import React, { useState } from 'react';

interface SliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  showValue?: boolean;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  showValue = true,
  className = '',
}) => {
  const [value, setValue] = useState(defaultValue);
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>}
          {showValue && <span className="text-sm text-zinc-500 dark:text-zinc-400">{value}</span>}
        </div>
      )}
      <div className="relative w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="absolute h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-primary bg-white shadow-sm transition-all"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
    </div>
  );
};

Slider.displayName = 'Slider';

(Slider as any).meta = {
  type: "slider",
  name: "Slider",
  version: "1.0.0",
  category: "Inputs",
  description: "Range slider for numeric values.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "min", label: "Min", type: "number" },
    { name: "max", label: "Max", type: "number" },
    { name: "defaultValue", label: "Default Value", type: "number" },
    { name: "showValue", label: "Show Value", type: "boolean" },
  ],
};
