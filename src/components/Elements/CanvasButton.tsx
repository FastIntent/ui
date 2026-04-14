import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface CanvasButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  content?: string;
}

export const CanvasButton = forwardRef<HTMLButtonElement, CanvasButtonProps>(
  ({ className, style, content, children, ...props }, ref) => {
    return (
      <button 
        ref={ref} 
        className={cn("box-border flex items-center justify-center bg-transparent border-none text-inherit cursor-pointer", className)} 
        style={style} 
        {...props}
      >
        {content}
        {children}
      </button>
    );
  }
);

(CanvasButton as any).meta = {
  type: "ui_canvas_button",
  name: "Canvas Button",
  version: "1.0.0",
  category: "Basic",
  propControls: [
     { name: "content", label: "Texto", type: "string", defaultValue: "Button" }
  ]
};

CanvasButton.displayName = "CanvasButton";
