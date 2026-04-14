import React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className = '',
  ...rest
}) => {
  return orientation === 'horizontal' ? (
    <div {...rest} className={`w-full h-px bg-zinc-200 dark:bg-zinc-800 ${className}`} role="separator" />
  ) : (
    <div {...rest} className={`h-full w-px bg-zinc-200 dark:bg-zinc-800 ${className}`} role="separator" />
  );
};

Separator.displayName = 'Separator';

(Separator as any).meta = {
  type: "ui_shadcn_separator",
  name: "Separator (Atomic)",
  version: "1.0.0",
  category: "Layout",
  description: "A horizontal or vertical separator line.",
  propControls: [
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["horizontal", "vertical"],
    },
  ]
};
