import React, { forwardRef } from "react";
import { cn } from "../lib/utils";
import { sanitizeProps } from "../lib/sanitizer";

export interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  shadow?: "none" | "sm" | "md" | "lg" | "xl" | "2xl";
  radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  as?: React.ElementType;
  /** Number of cart items — auto-bound from CartContext via dataBinding. Destructured to prevent DOM leak. */
  cartCount?: number;
}

export const CardWrapper = forwardRef<HTMLDivElement, CardWrapperProps>(
  ({ className, children, backgroundColor, textColor, shadow, radius, style, as, cartCount, ...allProps }, ref) => {
    // 🛡️ SANITIZACIÓN AUTOMÁTICA EN RUNTIME
    const domProps = sanitizeProps(allProps, (CardWrapper as any).meta);

    return (
      <div
        ref={ref}
        className={cn(
          "box-border border overflow-hidden transition-all duration-300",
          shadow && `shadow-${shadow}`,
          radius && `rounded-${radius}`,
          !shadow && "shadow-sm",
          !radius && "rounded-xl",
          className
        )}
        style={{ backgroundColor, color: textColor, ...style }}
        {...domProps}
      >
        {children}
      </div>
    );
  }
);

(CardWrapper as any).meta = {
  type: "ui_card_wrapper",
  name: "Enterprise Card Wrapper",
  version: "1.3.0",
  category: "Layout",
  description: "Contenedor de alto nivel con Navbar, Carrito y protección de estado global.",
  propControls: [
    { 
      name: "backgroundColor", 
      label: "Fondo", 
      type: "color", 
      defaultValue: "var(--background)" 
    },
    { 
      name: "textColor", 
      label: "Color Texto", 
      type: "color", 
      defaultValue: "var(--foreground)" 
    },
    {
      name: "shadow",
      label: "Sombra",
      type: "enum",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
      defaultValue: "sm"
    },
    {
      name: "radius",
      label: "Redondeado",
      type: "enum",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      defaultValue: "xl"
    },
    {
      name: "cartCount",
      label: "Items Carrito",
      type: "number",
      defaultValue: 0,
      dataBinding: {
        context: "CartProvider",
        hookName: "useCart",
        importPath: "@FastIntent/ui",
        value: "totalItems"
      }
    }
  ],
  migrations: {
    "1.1.2": (props: any) => {
      const { ctaText, logoText, companyName, ...rest } = props;
      return rest;
    }
  }
};

CardWrapper.displayName = "CardWrapper";

export default CardWrapper;
