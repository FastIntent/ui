import * as React from "react";
/**
 * Card primitives — follow the latest shadcn/ui pattern with `data-slot`
 * attributes for slot-based composition & theming.
 */
export declare const Card: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare function CardHeader({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export declare function CardTitle({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export declare function CardDescription({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export declare function CardAction({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export declare function CardContent({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
export declare function CardFooter({ className, ...props }: React.ComponentProps<"div">): import("react/jsx-runtime").JSX.Element;
