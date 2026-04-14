import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: 'default' | 'muted' | 'primary' | 'dark';
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section: React.FC<SectionProps> = ({
  background = 'default',
  paddingY = 'lg',
  maxWidth = 'lg',
  children,
  className = '',
  ...rest
}) => {
  const bgClasses = {
    default: 'bg-white dark:bg-zinc-950',
    muted: 'bg-zinc-50 dark:bg-zinc-900',
    primary: 'bg-primary text-primary-foreground',
    dark: 'bg-zinc-900 dark:bg-zinc-950 text-white',
  };

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24',
  };

  const maxWidthClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <section {...rest} className={`w-full ${bgClasses[background]} ${paddingClasses[paddingY]} ${className}`}>
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]}`}>
        {children}
      </div>
    </section>
  );
};

Section.displayName = 'Section';

(Section as any).meta = {
  type: "ui_shadcn_section",
  name: "Section (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A page section with background, padding, and max-width controls. Used for hero, pricing, testimonials, etc.",
  propControls: [
    {
      name: "background",
      label: "Background",
      type: "select",
      options: ["default", "muted", "primary", "dark"],
    },
    {
      name: "paddingY",
      label: "Vertical Padding",
      type: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    {
      name: "maxWidth",
      label: "Max Width",
      type: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  ]
};
