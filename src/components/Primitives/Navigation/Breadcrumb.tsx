import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Current Page' },
  ],
  separator = '/',
  className = '',
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`${className}`}>
      <ol className="flex items-center gap-1.5 text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-zinc-400 dark:text-zinc-600">{separator}</span>}
            {item.href && i < items.length - 1 ? (
              <a href={item.href} className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-zinc-900 dark:text-white font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

(Breadcrumb as any).meta = {
  type: "breadcrumb",
  name: "Breadcrumb",
  version: "1.0.0",
  category: "Navigation",
  description: "Breadcrumb navigation trail.",
  propControls: [
    { name: "separator", label: "Separator", type: "text" },
  ],
};
