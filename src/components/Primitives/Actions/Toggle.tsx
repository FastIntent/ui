"use client";
import React, { useState } from 'react';

interface ToggleProps {
  content?: string;
  pressed?: boolean;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  content = 'Toggle',
  pressed: controlledPressed,
  variant = 'default',
  size = 'default',
  className = '',
}) => {
  const [internalPressed, setInternalPressed] = useState(false);
  const isPressed = controlledPressed ?? internalPressed;

  const sizeClasses = {
    sm: 'h-8 px-2 text-xs',
    default: 'h-10 px-3 text-sm',
    lg: 'h-11 px-4 text-sm',
  };

  const baseClasses = `inline-flex items-center justify-center rounded-md font-medium transition-colors ${sizeClasses[size]}`;

  const variantClasses = isPressed
    ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white'
    : variant === 'outline'
      ? 'border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
      : 'bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800';

  return (
    <button
      aria-pressed={isPressed}
      onClick={() => setInternalPressed(!isPressed)}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {content}
    </button>
  );
};

Toggle.displayName = 'Toggle';

(Toggle as any).meta = {
  type: "toggle",
  name: "Toggle",
  version: "1.0.0",
  category: "Actions",
  description: "Two-state toggle button.",
  propControls: [
    { name: "content", label: "Label", type: "text" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "outline"] },
    { name: "size", label: "Size", type: "select", options: ["sm", "default", "lg"] },
    { name: "pressed", label: "Pressed", type: "boolean" },
  ],
};
