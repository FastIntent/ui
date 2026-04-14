import React from 'react';
import { cn } from '../../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, description, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

(Textarea as any).meta = {
  type: "ui_shadcn_textarea",
  name: "Textarea (Atomic)",
  version: "1.0.0",
  category: "Forms",
  description: "Standard Shadcn Textarea for long text input.",
  propControls: [
    { name: "placeholder", label: "Placeholder", type: "string" },
    { name: "label", label: "Label", type: "string" },
    { name: "description", label: "Description", type: "string" }
  ]
};
