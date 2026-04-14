import React from 'react';

interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  sticky?: boolean;
}

export const NavBar: React.FC<NavBarProps> = ({
  brand = '',
  children,
  sticky = true,
  className = '',
  ...rest
}) => {
  return (
    <nav {...rest} className={`w-full flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 ${sticky ? 'sticky top-0 z-50' : ''} ${className}`}>
      {brand && (
        <div className="font-bold text-lg text-zinc-900 dark:text-white shrink-0">
          {brand}
        </div>
      )}
      <div className="flex items-center gap-4 flex-1 justify-end">
        {children}
      </div>
    </nav>
  );
};

NavBar.displayName = 'NavBar';

(NavBar as any).meta = {
  type: "ui_shadcn_navbar",
  name: "Navigation Bar (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A top navigation bar with brand text and children for links/buttons.",
  propControls: [
    { name: "brand", label: "Brand name", type: "string" },
    { name: "sticky", label: "Sticky", type: "boolean" },
  ]
};
