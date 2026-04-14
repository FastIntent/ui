import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  content: string;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export const Badge: React.FC<BadgeProps> = ({
  content,
  variant = 'default',
  className = '',
  ...rest
}) => {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  return (
    <span {...rest} className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {content}
    </span>
  );
};

Badge.displayName = 'Badge';

(Badge as any).meta = {
  type: "ui_shadcn_badge",
  name: "Badge (Atomic)",
  version: "1.0.0",
  category: "Data Display",
  description: "A small label badge for tags, status, or categories.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
  ]
};
