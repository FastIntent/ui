import React from 'react';

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt = 'Image',
  aspectRatio = 'video',
  rounded = 'md',
  className = '',
  ...rest
}) => {
  const ratios = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  if (src) {
    return (
      <div {...rest}>
        <img
          src={src}
          alt={alt}
          className={`w-full object-cover ${ratios[aspectRatio]} ${roundedClasses[rounded]} ${className}`}
        />
      </div>
    );
  }

  return (
    <div {...rest} className={`w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 ${ratios[aspectRatio]} ${roundedClasses[rounded]} ${className}`}>
      <div className="flex flex-col items-center gap-1">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <span className="text-xs">{alt}</span>
      </div>
    </div>
  );
};

ImagePlaceholder.displayName = 'ImagePlaceholder';

(ImagePlaceholder as any).meta = {
  type: "ui_shadcn_image",
  name: "Image (Atomic)",
  version: "1.0.0",
  category: "Media",
  description: "An image component with placeholder fallback and aspect ratio control.",
  propControls: [
    { name: "src", label: "Image URL", type: "string" },
    { name: "alt", label: "Alt text / label", type: "string" },
    {
      name: "aspectRatio",
      label: "Aspect Ratio",
      type: "select",
      options: ["square", "video", "wide", "portrait"],
    },
    {
      name: "rounded",
      label: "Border Radius",
      type: "select",
      options: ["none", "sm", "md", "lg", "full"],
    },
  ]
};
