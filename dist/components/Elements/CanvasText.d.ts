import React from "react";
export interface CanvasTextProps extends React.HTMLAttributes<HTMLDivElement> {
    content?: string;
}
export declare const CanvasText: React.ForwardRefExoticComponent<CanvasTextProps & React.RefAttributes<HTMLDivElement>>;
