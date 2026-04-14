import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface CanvasLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CanvasLayout = forwardRef<HTMLDivElement, CanvasLayoutProps>(
  ({ className, children, style, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn("box-border relative flex flex-col min-h-[40px]", className)} 
        style={style} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

(CanvasLayout as any).meta = {
  type: "ui_canvas_layout",
  name: "Canvas Layout",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  propControls: []
};

CanvasLayout.displayName = "CanvasLayout";
