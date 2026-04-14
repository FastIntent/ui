import React, { forwardRef } from "react";
import { cn } from "../../utils/cn";
import { CanvasLayout } from "./CanvasLayout";
import { CanvasText } from "./CanvasText";
import { CanvasButton } from "./CanvasButton";

export interface CanvasHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  props?: { 
    logoText?: string;
    links?: string[];
    buttonText?: string;
  };
}

/**
 * 🛰️ CANVAS HEADER
 * High-performance sticky header migrated to @FastIntent/ui core.
 */
export const CanvasHeader = forwardRef<HTMLDivElement, CanvasHeaderProps>(
  ({ className, style, content, children, props, ...rest }, ref) => {
    const logoText = props?.logoText || "ACME Corp";
    const links = props?.links || ["Features", "Pricing"];
    const buttonText = props?.buttonText || "Sign in";

    return (
      <CanvasLayout 
        ref={ref}
        className={cn("custom-header !flex flex-row justify-between items-center px-4 py-4 bg-[var(--token-background)] border-b border-[var(--token-border)] md:px-8 md:py-4 transition-all", className)} 
        style={style}
        {...rest}
      >
        <CanvasText style={{ fontWeight: 800, color: "var(--token-text)", width: "auto" }} className="text-[16px] md:text-[24px]">
          {logoText}
        </CanvasText>
        
        <CanvasLayout style={{ display: "flex", alignItems: "center", padding: 0, minHeight: 0, border: "none" }} className="flex-row gap-4 md:gap-8">
          {links.map(link => (
            <CanvasText key={link} style={{ color: "var(--token-muted)", fontWeight: 500 }} className="text-[12px] md:text-[14px]">
              {link}
            </CanvasText>
          ))}
          <CanvasButton style={{ backgroundColor: "var(--token-text)", color: "var(--token-background)", borderRadius: 8, fontWeight: 600, border: "none" }} className="text-[12px] md:text-[18px] px-3 py-2 md:px-4 md:py-2">
            {buttonText}
          </CanvasButton>
        </CanvasLayout>
        
        {children}
      </CanvasLayout>
    );
  }
);

(CanvasHeader as any).meta = {
  type: "ui_canvas_header",
  name: "Enterprise Header",
  version: "1.0.0",
  category: "Navigation",
  description: "Sticky header con logo, links y acción de login.",
  propControls: [
    { name: "logoText", label: "Texto Logo", type: "string", defaultValue: "ACME Corp" },
    { name: "buttonText", label: "Texto Botón", type: "string", defaultValue: "Sign in" }
  ]
};

CanvasHeader.displayName = "CanvasHeader";
