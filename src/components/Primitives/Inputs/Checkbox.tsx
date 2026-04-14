import React from 'react';

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onCheckedChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      />
      {label && (
        <label className="text-sm font-medium leading-none">
          {label}
        </label>
      )}
    </div>
  );
};

(Checkbox as any).meta = {
  type: "ui_shadcn_checkbox",
  name: "Checkbox (Atomic)",
  version: "1.0.0",
  category: "Forms",
  description: "Standard Shadcn Checkbox for form atomic building.",
  propControls: [
    { name: "label", label: "Label text", type: "string" },
    { name: "checked", label: "Is checked?", type: "boolean" }
  ]
};
