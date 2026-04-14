import React from "react";
export interface CanvasInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    content?: string;
    styles?: React.CSSProperties;
    props?: {
        placeholder?: string;
    };
    "props.placeholder"?: string;
}
export declare const CanvasInput: React.FC<CanvasInputProps>;
