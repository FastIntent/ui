import React from 'react';
import { cn } from '../../../utils/cn';

interface LayoutBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'horizontal' | 'vertical' | 'grid';
  gap?: number;
  padding?: number;
  columns?: number;
}

export const LayoutBox: React.FC<LayoutBoxProps> = ({
  direction = 'vertical',
  gap = 4,
  padding = 0,
  columns = 1,
  children,
  className = '',
  ...rest
}) => {
  const baseClass = direction === 'grid' ? 'grid' : direction === 'horizontal' ? 'flex flex-row flex-wrap' : 'flex flex-col';

  const style: React.CSSProperties = {
    gap: `${gap * 4}px`,
    padding: padding > 0 ? `${padding * 4}px` : undefined,
    ...(direction === 'grid' ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {}),
  };

  return (
    <div {...rest} className={cn(baseClass, "min-h-[40px]", className)} style={style}>
      {children}
    </div>
  );
};

(LayoutBox as any).meta = {
  type: "ui_shadcn_layout",
  name: "Layout Box (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A flexible container for building layouts from images using Flex or Grid.",
  propControls: [
    { 
      name: "direction", 
      label: "Direction", 
      type: "select", 
      options: ["horizontal", "vertical", "grid"] 
    },
    { name: "gap", label: "Gap (TW units)", type: "number" },
    { name: "padding", label: "Padding (TW units)", type: "number" },
    { name: "columns", label: "Grid Columns", type: "number" }
  ]
};
