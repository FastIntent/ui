import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback = '?',
  size = 'md',
  className = '',
  ...rest
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  const initials = fallback.slice(0, 2).toUpperCase();

  return (
    <div {...rest} className={`relative inline-flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium overflow-hidden shrink-0 ${sizes[size]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';

(Avatar as any).meta = {
  type: "ui_shadcn_avatar",
  name: "Avatar (Atomic)",
  version: "1.0.0",
  category: "Data Display",
  description: "A circular avatar with image or fallback initials.",
  propControls: [
    { name: "src", label: "Image URL", type: "string" },
    { name: "alt", label: "Alt text", type: "string" },
    { name: "fallback", label: "Fallback initials", type: "string" },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "md", "lg"],
    },
  ]
};
