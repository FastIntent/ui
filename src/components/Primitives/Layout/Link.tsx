import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  content: string;
  variant?: 'default' | 'muted' | 'nav';
}

export const Link: React.FC<LinkProps> = ({
  content,
  href = '#',
  variant = 'default',
  className = '',
  ...rest
}) => {
  const variants = {
    default: 'text-primary hover:underline underline-offset-4',
    muted: 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors',
    nav: 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-sm font-medium transition-colors',
  };

  return (
    <a {...rest} href={href} className={`${variants[variant]} ${className}`}>
      {content}
    </a>
  );
};

Link.displayName = 'Link';

(Link as any).meta = {
  type: "ui_shadcn_link",
  name: "Link (Atomic)",
  version: "1.0.0",
  category: "Navigation",
  description: "A styled anchor link with variant support.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    { name: "href", label: "URL", type: "string" },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "muted", "nav"],
    },
  ]
};
