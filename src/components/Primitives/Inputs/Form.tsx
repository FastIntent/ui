import React from 'react';
import { cn } from '../../../utils/cn';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ title, description, children, className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6 w-full max-w-md p-6 border rounded-xl bg-card text-card-foreground shadow-sm", className)}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submitted');
        }}
        {...props}
      >
        {(title || description) && (
          <div className="space-y-1.5 mb-4">
            {title && <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        )}
        <div className="space-y-4">
          {children}
        </div>
      </form>
    );
  }
);

Form.displayName = 'Form';

(Form as any).meta = {
  type: "ui_shadcn_form",
  name: "Form Container (Atomic)",
  version: "1.0.0",
  category: "Forms",
  isSlot: true,
  isContainer: true,
  description: "A Shadcn-styled form container that accepts inputs and buttons as children.",
  propControls: [
    { name: "title", label: "Form Title", type: "string" },
    { name: "description", label: "Description", type: "string" }
  ]
};
