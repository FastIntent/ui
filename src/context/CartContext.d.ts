import { ReactNode } from "react";
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}
export declare const CartProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useCart: () => any;
