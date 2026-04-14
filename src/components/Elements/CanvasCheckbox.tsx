import React from "react";
import { cn } from "../../utils/cn";
import { Check } from "lucide-react";

export interface CanvasCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  styles?: React.CSSProperties;
  props?: { checked?: boolean };
  "props.checked"?: boolean;
}

export const CanvasCheckbox: React.FC<CanvasCheckboxProps> = ({ 
  content, 
  styles, 
  props, 
  "props.checked": _px, // Capturamos la prop "leakeada" del editor
  className, 
  ...rest 
}) => {
  const isChecked = props?.checked ?? true;
  return (
    <div className={cn("flex items-center gap-2 px-1 py-1", className)} style={styles} {...rest}>
      <div className={cn(
        "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
        isChecked 
          ? "bg-blue-500 border-blue-500 text-white" 
          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
      )}>
        {isChecked && <Check size={12} strokeWidth={3} />}
      </div>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none">
        {content || "Checkbox label"}
      </span>
    </div>
  );
};

(CanvasCheckbox as any).meta = {
  type: "ui_canvas_checkbox",
  name: "Checkbox",
  version: "1.0.0",
  category: "Forms",
  propControls: [
     { name: "props.checked", label: "Checked", type: "boolean", defaultValue: true },
     { name: "content", label: "Label", type: "string", defaultValue: "Checkbox label" }
  ]
};
