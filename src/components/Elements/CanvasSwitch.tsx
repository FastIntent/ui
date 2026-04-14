import React from "react";
import { cn } from "../../utils/cn";

export interface CanvasSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  styles?: React.CSSProperties;
  props?: { active?: boolean };
  "props.active"?: boolean;
}

export const CanvasSwitch: React.FC<CanvasSwitchProps> = ({ 
  content, 
  styles, 
  props, 
  "props.active": _px,
  className, 
  ...rest 
}) => {
  const isOn = props?.active ?? true;
  return (
    <div className={cn("flex items-center gap-3 py-1 px-1", className)} style={styles} {...rest}>
      <div className={cn(
        "relative w-9 h-5 rounded-full transition-all duration-300",
        isOn ? "bg-blue-500 shadow-inner" : "bg-zinc-200 dark:bg-zinc-800"
      )}>
        <div className={cn(
          "absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300 transform",
          isOn ? "translate-x-4 shadow-md scale-110" : ""
        )} />
      </div>
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none">
        {content || "Toggle switch"}
      </span>
    </div>
  );
};

(CanvasSwitch as any).meta = {
  type: "ui_canvas_switch",
  name: "Switch/Toggle",
  version: "1.0.0",
  category: "Forms",
  propControls: [
     { name: "props.active", label: "Active", type: "boolean", defaultValue: true },
     { name: "content", label: "Label", type: "string", defaultValue: "Toggle switch" }
  ]
};
