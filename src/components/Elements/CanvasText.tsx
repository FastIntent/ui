import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";

export interface CanvasTextProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
}

export const CanvasText = forwardRef<HTMLDivElement, CanvasTextProps>(
  ({ className, style, content, children, ...props }, ref) => {
    const mergedStyle: React.CSSProperties = {
      display: "block",
      ...style,
    };
    return (
      <div
        ref={ref}
        className={cn("box-border", className)}
        style={mergedStyle}
        {...props}
      >
        {content}
        {children}
      </div>
    );
  }
);

(CanvasText as any).meta = {
  type: "ui_canvas_text",
  name: "Canvas Text",
  version: "1.0.0",
  category: "Basic",
  propControls: [
     { name: "content", label: "Contenido", type: "string", defaultValue: "" }
  ]
};

CanvasText.displayName = "CanvasText";
