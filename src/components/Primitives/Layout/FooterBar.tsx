import React from 'react';

interface FooterBarProps extends React.HTMLAttributes<HTMLElement> {
  brand?: string;
  copyright?: string;
}

export const FooterBar: React.FC<FooterBarProps> = ({
  brand,
  copyright,
  children,
  className = '',
  ...rest
}) => {
  return (
    <footer {...rest} className={`w-full bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {brand && (
            <div className="flex flex-col gap-2 md:w-1/3">
              <span className="font-bold text-lg text-zinc-900 dark:text-white">{brand}</span>
            </div>
          )}
          <div className="flex-1 flex flex-wrap gap-8">
            {children}
          </div>
        </div>
        {copyright && (
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
};

FooterBar.displayName = 'FooterBar';

(FooterBar as any).meta = {
  type: "ui_shadcn_footer",
  name: "Footer (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A page footer with brand, link columns, and copyright text.",
  propControls: [
    { name: "brand", label: "Brand name", type: "string" },
    { name: "copyright", label: "Copyright text", type: "string" },
  ]
};
