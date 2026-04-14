import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  content: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
}

export const Heading: React.FC<HeadingProps> = ({
  content,
  level = 2,
  align = 'left',
  className = '',
  ...rest
}) => {
  const sizes: Record<number, string> = {
    1: 'text-4xl md:text-5xl font-extrabold tracking-tight',
    2: 'text-3xl md:text-4xl font-bold tracking-tight',
    3: 'text-2xl font-bold',
    4: 'text-xl font-semibold',
    5: 'text-lg font-semibold',
    6: 'text-base font-medium',
  };

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Tag = `h${level}` as React.ElementType;

  return (
    <Tag {...rest} className={`text-zinc-900 dark:text-white ${sizes[level]} ${alignClass[align]} ${className}`}>
      {content}
    </Tag>
  );
};

Heading.displayName = 'Heading';

(Heading as any).meta = {
  type: "ui_shadcn_heading",
  name: "Heading (Atomic)",
  version: "1.0.0",
  category: "Typography",
  description: "A semantic heading (h1-h6) with size and alignment control.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    {
      name: "level",
      label: "Level (1-6)",
      type: "number",
    },
    {
      name: "align",
      label: "Align",
      type: "select",
      options: ["left", "center", "right"],
    },
  ]
};
