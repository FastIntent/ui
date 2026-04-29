"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

/**
 * Label primitive — shadcn-compatible.
 *
 * Uses a native <label> with the standard `htmlFor` attribute to associate
 * with an input, so we avoid the extra @radix-ui/react-label dependency.
 * The `peer-disabled:*` utilities still work when the paired input has the
 * `peer` class.
 */
export const Label = React.forwardRef<HTMLLabelElement, React.ComponentProps<"label">>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          "flex items-center gap-2 text-sm leading-none font-medium select-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

(Label as any).meta = {
  type: "ui_shadcn_label",
  name: "Label",
  version: "1.0.0",
  category: "Forms",
  description: "Composable shadcn Label. Associate with inputs via htmlFor.",
  propControls: [
    { name: "htmlFor", label: "For (input id)", type: "string" },
  ],
};
