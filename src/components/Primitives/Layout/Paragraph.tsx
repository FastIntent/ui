import React from 'react';

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  content: string;
  size?: 'sm' | 'base' | 'lg';
  muted?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const Paragraph: React.FC<ParagraphProps> = ({
  content,
  size = 'base',
  muted = false,
  align = 'left',
  className = '',
  ...rest
}) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const colorClass = muted
    ? 'text-zinc-500 dark:text-zinc-400'
    : 'text-zinc-700 dark:text-zinc-300';

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <p {...rest} className={`leading-relaxed ${sizes[size]} ${colorClass} ${alignClass[align]} ${className}`}>
      {content}
    </p>
  );
};

Paragraph.displayName = 'Paragraph';

(Paragraph as any).meta = {
  type: "ui_shadcn_paragraph",
  name: "Paragraph (Atomic)",
  version: "1.0.0",
  category: "Typography",
  description: "A paragraph text block with size, muted, and alignment control.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "base", "lg"],
    },
    { name: "muted", label: "Muted color", type: "boolean" },
    {
      name: "align",
      label: "Align",
      type: "select",
      options: ["left", "center", "right"],
    },
  ]
};
