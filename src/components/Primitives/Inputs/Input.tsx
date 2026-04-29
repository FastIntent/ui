"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        data-slot="input"
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "selection:bg-primary selection:text-primary-foreground",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

(Input as any).meta = {
  type: "ui_shadcn_input",
  name: "Input",
  version: "2.0.0",
  category: "Forms",
  description: "Composable shadcn Input. Native HTML input with shadcn styling.",
  propControls: [
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search", "date"],
    },
    { name: "placeholder", label: "Placeholder", type: "string" },
    { name: "disabled", label: "Disabled", type: "boolean" },
  ],
};
