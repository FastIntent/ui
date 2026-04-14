import React from "react";
export interface CanvasSwitchProps extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
    styles?: React.CSSProperties;
    props?: {
        active?: boolean;
    };
    "props.active"?: boolean;
}
export declare const CanvasSwitch: React.FC<CanvasSwitchProps>;
