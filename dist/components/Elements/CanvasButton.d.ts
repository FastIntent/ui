import React from "react";
export interface CanvasButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    content?: string;
}
export declare const CanvasButton: React.ForwardRefExoticComponent<CanvasButtonProps & React.RefAttributes<HTMLButtonElement>>;
