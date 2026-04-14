import React from "react";
import { cn } from "../../utils/cn";

export interface CanvasInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  content?: string;
  styles?: React.CSSProperties;
  props?: { placeholder?: string };
  "props.placeholder"?: string; // Allow editor prop mapping
}

export const CanvasInput: React.FC<CanvasInputProps> = ({
  content,
  styles,
  props,
  "props.placeholder": _px, // Prevent leak to DOM
  className,
  children: _children, // Strip children — input is a void element
  ...rest
}) => {
  return (
    <div className={cn("w-full h-auto", className)} style={styles}>
      <input
        type="text"
        placeholder={props?.placeholder || "Type something..."}
        className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 hover:border-zinc-300 dark:hover:border-zinc-700"
        defaultValue={content}
        {...rest}
      />
    </div>
  );
};

(CanvasInput as any).meta = {
  type: "ui_canvas_input",
  name: "Form Input",
  version: "1.0.0",
  category: "Forms",
  propControls: [
     { name: "props.placeholder", label: "Placeholder", type: "string", defaultValue: "Type something..." }
  ]
};
