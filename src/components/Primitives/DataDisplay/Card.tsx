import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  image?: string;
  badge?: string;
  footer?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  badge,
  footer,
  children,
  className = '',
  ...rest
}) => {
  return (
    <div {...rest} className={`rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden ${className}`}>
      {image && (
        <div className="relative">
          <div className="w-full h-48 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-sm">
            {image}
          </div>
          {badge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-4 flex flex-col gap-2">
        {title && <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>}
        {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
        {children}
      </div>
      {footer && (
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.displayName = 'Card';

(Card as any).meta = {
  type: "ui_shadcn_card",
  name: "Card (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A card container with optional image, title, description, badge, and footer.",
  propControls: [
    { name: "title", label: "Title", type: "string" },
    { name: "description", label: "Description", type: "string" },
    { name: "image", label: "Image placeholder", type: "string" },
    { name: "badge", label: "Badge text", type: "string" },
    { name: "footer", label: "Footer text", type: "string" },
  ]
};
