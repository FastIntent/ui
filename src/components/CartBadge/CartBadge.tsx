"use client";

import React from 'react';
import { useCart } from '../../context/CartContext';

/**
 * 📘 MANUAL DEL DESARROLLADOR: INDICADORES (BADGES)
 *
 * Lee el estado del carrito directamente desde CartContext.
 * Requiere <CartProvider> en un ancestro del árbol.
 */

export const CartBadge = ({
  color = "#dc2626",
}: {
  color?: string;
}) => {
  const { totalItems } = useCart();
  const displayCount = totalItems;
  return (
    <div 
      id="ui-cart-badge"
      className="relative flex items-center justify-center w-10 h-10 bg-white shadow-sm border border-zinc-100 rounded-full cursor-pointer hover:bg-zinc-50 transition-all duration-300"
    >
      <svg className="w-5 h-5 text-zinc-900" 
        fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {displayCount > 0 && (
        <span 
          className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-white text-[10px] font-bold border-2 border-white"
          style={{ backgroundColor: color }}
        >
          {displayCount}
        </span>
      )}
    </div>
  );
};

(CartBadge as any).meta = {
  type: "ui_cart_badge",
  name: "Cart Pulse Badge",
  version: "1.1.0",
  category: "Commerce",
  description: "Indicador flotante del carrito. Lee de CartContext — requiere CartProvider.",
  // ─── Rendering contract ──────────────────────────────────────────────────
  renderMode: "client",
  requiresProvider: {
    name: "CartProvider",
    importPath: "@FastIntent/ui",
  },
  consumesContext: {
    hookName: "useCart",
    importPath: "@FastIntent/ui",
    fields: ["totalItems"],
  },
  propControls: [
    { name: "color", label: "Color Badge", type: "color", defaultValue: "#dc2626" }
  ]
};

export default CartBadge;
