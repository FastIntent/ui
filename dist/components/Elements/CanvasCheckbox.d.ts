import React from "react";
export interface CanvasCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
    styles?: React.CSSProperties;
    props?: {
        checked?: boolean;
    };
    "props.checked"?: boolean;
}
export declare const CanvasCheckbox: React.FC<CanvasCheckboxProps>;
