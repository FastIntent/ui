"use client";

import React from 'react';
import { motion } from 'framer-motion';

/**
 * 📘 MANUAL DEL DESARROLLADOR: BOTÓN ATC (ACTION COMPONENT)
 * 
 * Un componente de acción es un 'Parent' que puede ejecutar lógica (ej: add to cart).
 * 
 * REGLAS:
 * 1. Define estilos base atómicos (Flex, Padding).
 * 2. Soporta {children} para que el diseñador pueda inyectar iconos o badges.
 */

import { useCart } from '../../context/CartContext';

export const AddToCartButton = ({
  children,
  text = "Add to Cart",
  color = "#f97316",
  productId,
  price = 0,
}: {
  children?: React.ReactNode;
  text?: string;
  color?: string;
  productId?: string;
  price?: number;
}) => {
  const { addItem } = useCart();

  const handleClick = () => {
    addItem({
      id: productId ?? crypto.randomUUID(),
      name: text,
      price,
      quantity: 1,
    });
  };

  return (
    <motion.button
      id="ui-atc-parent"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex w-fit items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 mx-auto sm:mx-0"
      style={{ backgroundColor: color }}
    >
      <span>{text}</span>
      {children}
    </motion.button>
  );
};

(AddToCartButton as any).meta = {
  type: "ui_atc_button",
  name: "Action Button",
  version: "1.1.0",
  category: "Commerce",
  description: "Botón de acción con soporte para slots internos (ej: iconos).",
  // ─── Rendering contract ──────────────────────────────────────────────────
  // The Weaver reads these to decide whether to mark the wrapper as client,
  // which provider to inject in the root layout, and which hook to import.
  renderMode: "client",
  requiresProvider: {
    name: "CartProvider",
    importPath: "@FastIntent/ui",
  },
  consumesContext: {
    hookName: "useCart",
    importPath: "@FastIntent/ui",
    fields: ["addItem"],
  },
  // ─── Editor prop controls ────────────────────────────────────────────────
  propControls: [
    { name: "text", label: "Texto", type: "string", defaultValue: "Add to Cart" },
    { name: "color", label: "Color Fondo", type: "color", defaultValue: "#f97316" },
    { name: "productId", label: "Product ID", type: "string", defaultValue: "" },
    { name: "price", label: "Price", type: "number", defaultValue: 0 }
  ],
  dependencies: { "framer-motion": "latest" }
};

export default AddToCartButton;
