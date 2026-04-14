import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, className, type, children, ...props }, ref) => {
    // children destructured and discarded — <input> is a void element
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
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

Input.displayName = 'Input';

(Input as any).meta = {
  type: "ui_shadcn_input",
  name: "Input (Atomic)",
  version: "1.0.0",
  category: "Forms",
  description: "Standard Shadcn Input for atomic form building.",
  propControls: [
    { name: "placeholder", label: "Placeholder", type: "string" },
    { name: "label", label: "Label", type: "string" },
    { name: "description", label: "Description", type: "string" },
    { 
      name: "type", 
      label: "Type", 
      type: "select", 
      options: ["text", "password", "email", "number", "tel", "url"] 
    }
  ]
};
