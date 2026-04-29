"use client";


// src/components/Text.tsx
import { colors } from "@fastintent/design-tokens";
import { jsx } from "react/jsx-runtime";
var Text = ({
  children,
  color,
  size = "base",
  weight = "normal",
  as,
  ...all
}) => {
  const Component = as || "p";
  const { className = "", ...props } = all;
  const style = {
    color: color || colors.text.body,
    ...color && { color }
  };
  return /* @__PURE__ */ jsx(
    Component,
    {
      className: `ui-text-${size} ui-weight-${weight} ${className}`,
      style,
      ...props,
      children
    }
  );
};
Text.meta = {
  type: "ui_text",
  name: "Master Typography",
  version: "1.2.0",
  category: "Typography",
  description: "Componente de texto core impulsado por Design Tokens y SSOT.",
  propControls: [
    {
      name: "children",
      label: "Texto / Contenido",
      type: "string",
      defaultValue: "Escribe algo..."
    },
    {
      name: "color",
      label: "Color Texto",
      type: "color",
      defaultValue: "var(--foreground)"
    },
    {
      name: "as",
      label: "Tag Sem\xE1ntico",
      type: "enum",
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div"],
      defaultValue: "p"
    },
    {
      name: "size",
      label: "Tama\xF1o",
      type: "enum",
      options: ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
      defaultValue: "base",
      coercesFrom: "fontSize",
      weaverCoercionTable: { "<=12": "xs", "<=14": "sm", "<=16": "base", "<=18": "lg", "<=20": "xl", "<=24": "2xl", "<=30": "3xl", "<=36": "4xl", "<=48": "5xl", ">48": "6xl" }
    },
    {
      name: "weight",
      label: "Grosor",
      type: "enum",
      options: ["light", "normal", "medium", "semibold", "bold", "black"],
      defaultValue: "normal",
      coercesFrom: "fontWeight",
      weaverCoercionTable: { "100-300": "light", "400": "normal", "500": "medium", "600": "semibold", "700-800": "bold", "900": "black" }
    }
  ],
  migrations: {
    "1.2.0": (props) => {
      if (props.content && !props.children) {
        const { content, ...rest } = props;
        return { ...rest, children: content };
      }
      return props;
    }
  },
  dependencies: {
    "@fastintent/design-tokens": "1.0.0"
  }
};

// src/components/AddToCartButton/AddToCartButton.tsx
import { motion } from "framer-motion";

// src/context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var CartContext = createContext(void 0);
var CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem("intent_cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("intent_cart", JSON.stringify(items));
  }, [items]);
  const addItem = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const clearCart = () => setItems([]);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return /* @__PURE__ */ jsx2(CartContext.Provider, { value: { items, addItem, removeItem, clearCart, totalItems, totalPrice }, children });
};
var useCart = () => {
  if (typeof window !== "undefined" && window.__INTENT_CART_BRIDGE__) {
    return window.__INTENT_CART_BRIDGE__.useCart();
  }
  const context = useContext(CartContext);
  if (context === void 0) {
    return {
      items: [],
      addItem: () => {
      },
      removeItem: () => {
      },
      clearCart: () => {
      },
      totalItems: 0,
      totalPrice: 0
    };
  }
  return context;
};

// src/components/AddToCartButton/AddToCartButton.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
var AddToCartButton = ({
  children,
  text = "Add to Cart",
  color = "#f97316",
  productId,
  price = 0
}) => {
  const { addItem } = useCart();
  const handleClick = () => {
    addItem({
      id: productId ?? crypto.randomUUID(),
      name: text,
      price,
      quantity: 1
    });
  };
  return /* @__PURE__ */ jsxs(
    motion.button,
    {
      id: "ui-atc-parent",
      onClick: handleClick,
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      className: "flex w-fit items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 mx-auto sm:mx-0",
      style: { backgroundColor: color },
      children: [
        /* @__PURE__ */ jsx3("span", { children: text }),
        children
      ]
    }
  );
};
AddToCartButton.meta = {
  type: "ui_atc_button",
  name: "Action Button",
  version: "1.1.0",
  category: "Commerce",
  description: "Bot\xF3n de acci\xF3n con soporte para slots internos (ej: iconos).",
  // ─── Rendering contract ──────────────────────────────────────────────────
  // The Weaver reads these to decide whether to mark the wrapper as client,
  // which provider to inject in the root layout, and which hook to import.
  renderMode: "client",
  requiresProvider: {
    name: "CartProvider",
    importPath: "@fastintent/ui"
  },
  consumesContext: {
    hookName: "useCart",
    importPath: "@fastintent/ui",
    fields: ["addItem"]
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

// src/components/Hero/Hero.tsx
import { motion as motion2 } from "framer-motion";
import { colors as colors2, spacing as spacing2 } from "@fastintent/design-tokens";
import { jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
var Hero = ({
  children,
  backgroundColor = colors2.background.dark,
  // 💎 Usando tokens
  as,
  ...props
}) => {
  const Component = as || "section";
  return /* @__PURE__ */ jsxs2(
    Component,
    {
      id: "ui-hero-parent",
      className: "relative w-full min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden",
      style: {
        backgroundColor,
        padding: spacing2.lg
        // 💎 Usando tokens
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx4(
          motion2.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 0.1 },
            className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"
          }
        ),
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: "relative z-10 max-w-4xl w-full flex flex-col items-center",
            style: { gap: spacing2.md },
            children: children || /* @__PURE__ */ jsx4("p", { className: "text-zinc-500 italic", children: "Arrastra tus slots aqu\xED..." })
          }
        )
      ]
    }
  );
};
Hero.meta = {
  type: "ui_hero",
  name: "Enterprise Hero Master",
  version: "1.3.0",
  category: "Marketing",
  description: "Secci\xF3n hero polim\xF3rfica optimizada para el Weaver y SSOT.",
  propControls: [
    {
      name: "backgroundColor",
      label: "Fondo",
      type: "color",
      defaultValue: "var(--background-dark)"
    },
    {
      name: "padding",
      label: "Padding (Spacing)",
      type: "enum",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
      defaultValue: "lg"
    },
    {
      name: "alignment",
      label: "Alineaci\xF3n",
      type: "enum",
      options: ["left", "center", "right"],
      defaultValue: "center"
    },
    {
      name: "as",
      label: "Tag Sem\xE1ntico",
      type: "enum",
      options: ["section", "article", "div", "header"],
      defaultValue: "section"
    }
  ],
  dependencies: {
    "framer-motion": "latest",
    "@fastintent/design-tokens": "1.0.0"
  }
};
var Hero_default = Hero;

// src/components/Hero/HeroTitle.tsx
import { motion as motion3 } from "framer-motion";
import { jsx as jsx5 } from "react/jsx-runtime";
var HeroTitle = ({
  text = "Building the Future",
  color = "#ffffff"
}) => {
  return /* @__PURE__ */ jsx5(
    motion3.h1,
    {
      id: "ui-hero-title",
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      className: "text-4xl md:text-6xl font-bold tracking-tight",
      style: { color },
      children: text
    }
  );
};
HeroTitle.meta = {
  type: "ui_hero_title",
  name: "Hero Title",
  version: "1.0.0",
  category: "Marketing",
  isSlot: true,
  visibility: "internal",
  parentConstraint: "ui_hero",
  // 🛡️ Protección de jerarquía
  description: "T\xEDtulo din\xE1mico para el Hero Section.",
  propControls: [
    { name: "text", label: "Texto", type: "string", defaultValue: "Building the Future" },
    { name: "color", label: "Color", type: "color", defaultValue: "#ffffff" }
  ],
  dependencies: { "framer-motion": "latest" }
};
var HeroTitle_default = HeroTitle;

// src/components/Hero/HeroSubtitle.tsx
import { motion as motion4 } from "framer-motion";
import { jsx as jsx6 } from "react/jsx-runtime";
var HeroSubtitle = ({
  text = "Unleash your creativity.",
  color = "#a1a1aa"
}) => {
  return /* @__PURE__ */ jsx6(
    motion4.p,
    {
      id: "ui-hero-subtitle",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "text-lg md:text-xl font-medium tracking-wide max-w-2xl mx-auto",
      style: { color },
      children: text
    }
  );
};
HeroSubtitle.meta = {
  type: "ui_hero_subtitle",
  name: "Hero Subtitle",
  version: "1.0.0",
  category: "Marketing",
  isSlot: true,
  visibility: "internal",
  parentConstraint: "ui_hero",
  // 🛡️ Protección de jerarquía
  description: "Subt\xEDtulo din\xE1mico para el Hero Section.",
  propControls: [
    { name: "text", label: "Texto", type: "string", defaultValue: "Unleash your creativity." },
    { name: "color", label: "Color", type: "color", defaultValue: "#a1a1aa" }
  ],
  dependencies: { "framer-motion": "latest" }
};
var HeroSubtitle_default = HeroSubtitle;

// src/components/Footer/Footer.tsx
import { colors as colors3, spacing as spacing3 } from "@fastintent/design-tokens";

// src/lib/sanitizer.ts
var SAFE_DOM_PROPS = /* @__PURE__ */ new Set([
  "id",
  "className",
  "style",
  "children",
  "onClick",
  "onMouseEnter",
  "onMouseLeave",
  "href",
  "target",
  "rel",
  "alt",
  "src",
  "type",
  "disabled"
]);
function sanitizeProps(props, meta) {
  if (!meta) return props;
  const allowedProps = new Set(
    (meta.propControls || []).map((p) => p.name)
  );
  const clean = {};
  for (const key in props) {
    if (allowedProps.has(key) || SAFE_DOM_PROPS.has(key)) {
      clean[key] = props[key];
    }
  }
  return clean;
}

// src/components/Footer/Footer.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var Footer = ({
  children,
  backgroundColor,
  textColor,
  companyName = "FastIntent Builder",
  logo,
  as,
  ...allProps
  // ✅ Tomamos todas las props
}) => {
  const Component = as || "footer";
  const domProps = sanitizeProps(allProps, Footer.meta);
  const style = {
    ...backgroundColor && { backgroundColor },
    ...textColor && { color: textColor },
    padding: `${spacing3.lg} ${spacing3.md}`,
    borderColor: colors3.background.subtle,
    gap: spacing3.xl
  };
  const fallbackClasses = `
    ${!backgroundColor ? "bg-zinc-950" : ""}
    ${!textColor ? "text-white" : ""}
  `;
  return /* @__PURE__ */ jsxs3(
    Component,
    {
      id: "ui-footer-parent",
      className: `w-full flex flex-col items-center border-t overflow-hidden ${fallbackClasses}`,
      style,
      ...domProps,
      children: [
        /* @__PURE__ */ jsxs3("div", { className: "w-full max-w-6xl flex flex-wrap justify-between gap-8", children: [
          /* @__PURE__ */ jsxs3("div", { className: "flex flex-col", style: { gap: spacing3.sm }, children: [
            /* @__PURE__ */ jsxs3("div", { className: "text-2xl font-black tracking-tighter flex items-center gap-2", children: [
              /* @__PURE__ */ jsx7("span", { className: "w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm", children: "F" }),
              /* @__PURE__ */ jsx7("span", { children: logo || "FastIntent" })
            ] }),
            /* @__PURE__ */ jsx7("p", { className: "max-w-xs text-sm opacity-60 leading-relaxed font-medium", children: "Building the next generation of SaaS products with a visual-first approach." })
          ] }),
          /* @__PURE__ */ jsx7("div", { className: "flex gap-16 flex-wrap", children: children || /* @__PURE__ */ jsx7("div", { className: "flex gap-16", children: /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsx7("h4", { className: "font-bold text-sm uppercase tracking-widest opacity-40", children: "Producto" }),
            /* @__PURE__ */ jsxs3("ul", { className: "flex flex-col gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ jsx7("li", { className: "cursor-pointer hover:opacity-50 transition-opacity", children: "Caracter\xEDsticas" }),
              /* @__PURE__ */ jsx7("li", { className: "cursor-pointer hover:opacity-50 transition-opacity", children: "Precios" })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxs3(
          "div",
          {
            className: "w-full max-w-6xl flex justify-between items-center text-[11px] font-bold uppercase tracking-widest border-t opacity-70",
            style: {
              paddingTop: spacing3.md,
              borderColor: "inherit"
            },
            children: [
              /* @__PURE__ */ jsxs3("span", { children: [
                "\xA9 ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " ",
                companyName
              ] }),
              /* @__PURE__ */ jsxs3("div", { className: "flex space-x-6", children: [
                /* @__PURE__ */ jsx7("span", { className: "cursor-pointer hover:opacity-100 transition-opacity", children: "Privacy Policy" }),
                /* @__PURE__ */ jsx7("span", { className: "cursor-pointer hover:opacity-100 transition-opacity", children: "Terms of Service" })
              ] })
            ]
          }
        )
      ]
    }
  );
};
Footer.meta = {
  type: "ui_footer",
  name: "Enterprise Static Footer",
  version: "1.3.0",
  category: "Layout",
  description: "Pie de p\xE1gina sem\xE1nticamente adaptable impulsado por Design Tokens y SSOT.",
  propControls: [
    {
      name: "companyName",
      label: "Nombre Empresa",
      type: "string",
      defaultValue: "FastIntent Builder",
      dataBinding: { context: "SiteProvider", value: "config.companyName" }
    },
    {
      name: "logo",
      label: "Texto Logo",
      type: "string",
      defaultValue: "FastIntent"
    },
    {
      name: "backgroundColor",
      label: "Fondo",
      type: "color",
      defaultValue: "var(--background-dark)"
      // Tokens por defecto
    },
    {
      name: "textColor",
      label: "Color Texto",
      type: "color",
      defaultValue: "var(--text-light)"
    },
    {
      name: "as",
      label: "Tag Sem\xE1ntico",
      type: "enum",
      options: ["footer", "section", "div"],
      defaultValue: "footer"
    }
  ],
  migrations: {
    "1.0.0": (props) => {
      const { ctaText, logoText, ...rest } = props;
      return {
        ...rest,
        companyName: logoText || "FastIntent Builder",
        logo: logoText || "FastIntent"
      };
    },
    "1.2.1": (props) => {
      const { ctaText, ...rest } = props;
      return rest;
    }
  },
  dependencies: {
    "@fastintent/design-tokens": "1.0.0"
  }
};

// src/components/CartBadge/CartBadge.tsx
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var CartBadge = ({
  color = "#dc2626"
}) => {
  const { totalItems } = useCart();
  const displayCount = totalItems;
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      id: "ui-cart-badge",
      className: "relative flex items-center justify-center w-10 h-10 bg-white shadow-sm border border-zinc-100 rounded-full cursor-pointer hover:bg-zinc-50 transition-all duration-300",
      children: [
        /* @__PURE__ */ jsx8(
          "svg",
          {
            className: "w-5 h-5 text-zinc-900",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx8("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" })
          }
        ),
        displayCount > 0 && /* @__PURE__ */ jsx8(
          "span",
          {
            className: "absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-white text-[10px] font-bold border-2 border-white",
            style: { backgroundColor: color },
            children: displayCount
          }
        )
      ]
    }
  );
};
CartBadge.meta = {
  type: "ui_cart_badge",
  name: "Cart Pulse Badge",
  version: "1.1.0",
  category: "Commerce",
  description: "Indicador flotante del carrito. Lee de CartContext \u2014 requiere CartProvider.",
  // ─── Rendering contract ──────────────────────────────────────────────────
  renderMode: "client",
  requiresProvider: {
    name: "CartProvider",
    importPath: "@fastintent/ui"
  },
  consumesContext: {
    hookName: "useCart",
    importPath: "@fastintent/ui",
    fields: ["totalItems"]
  },
  propControls: [
    { name: "color", label: "Color Badge", type: "color", defaultValue: "#dc2626" }
  ]
};

// src/components/CardWrapper.tsx
import { forwardRef } from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/CardWrapper.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var CardWrapper = forwardRef(
  ({ className, children, backgroundColor, textColor, shadow, radius, style, as, cartCount, ...allProps }, ref) => {
    const domProps = sanitizeProps(allProps, CardWrapper.meta);
    return /* @__PURE__ */ jsx9(
      "div",
      {
        ref,
        className: cn(
          "box-border border overflow-hidden transition-all duration-300",
          shadow && `shadow-${shadow}`,
          radius && `rounded-${radius}`,
          !shadow && "shadow-sm",
          !radius && "rounded-xl",
          className
        ),
        style: { backgroundColor, color: textColor, ...style },
        ...domProps,
        children
      }
    );
  }
);
CardWrapper.meta = {
  type: "ui_card_wrapper",
  name: "Enterprise Card Wrapper",
  version: "1.3.0",
  category: "Layout",
  description: "Contenedor de alto nivel con Navbar, Carrito y protecci\xF3n de estado global.",
  propControls: [
    {
      name: "backgroundColor",
      label: "Fondo",
      type: "color",
      defaultValue: "var(--background)"
    },
    {
      name: "textColor",
      label: "Color Texto",
      type: "color",
      defaultValue: "var(--foreground)"
    },
    {
      name: "shadow",
      label: "Sombra",
      type: "enum",
      options: ["none", "sm", "md", "lg", "xl", "2xl"],
      defaultValue: "sm"
    },
    {
      name: "radius",
      label: "Redondeado",
      type: "enum",
      options: ["none", "sm", "md", "lg", "xl", "full"],
      defaultValue: "xl"
    },
    {
      name: "cartCount",
      label: "Items Carrito",
      type: "number",
      defaultValue: 0,
      dataBinding: {
        context: "CartProvider",
        hookName: "useCart",
        importPath: "@fastintent/ui",
        value: "totalItems"
      }
    }
  ],
  migrations: {
    "1.1.2": (props) => {
      const { ctaText, logoText, companyName, ...rest } = props;
      return rest;
    }
  }
};
CardWrapper.displayName = "CardWrapper";

// src/components/Elements/CanvasBento.tsx
import { forwardRef as forwardRef2 } from "react";
import { Sparkles, ArrowRight, Zap } from "lucide-react";

// src/utils/cn.ts
import { clsx as clsx2 } from "clsx";
import { twMerge as twMerge2 } from "tailwind-merge";
function cn2(...inputs) {
  return twMerge2(clsx2(inputs));
}

// src/components/Elements/CanvasBento.tsx
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
var CanvasBento = forwardRef2(({ className, style, children, ...props }, ref) => {
  return /* @__PURE__ */ jsx10(
    "div",
    {
      ref,
      ...props,
      style,
      className: cn2("w-full box-border p-[40px_20px] md:p-[60px_20px] bg-[var(--token-background)] border border-[var(--token-border)] rounded-[32px] md:rounded-[48px] overflow-hidden transition-colors duration-500", className),
      children: /* @__PURE__ */ jsxs5("div", { className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 md:grid-rows-6 gap-6 min-h-[1200px] md:h-[700px]", children: [
        /* @__PURE__ */ jsxs5("div", { className: "col-span-1 md:col-span-4 lg:col-span-8 row-span-4 bg-[var(--token-background)] border border-[var(--token-border)] rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx10("div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,var(--token-accent),transparent_70%)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000" }),
          /* @__PURE__ */ jsxs5("div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ jsx10("div", { className: "w-fit p-[8px_16px] bg-[var(--token-accent)]/5 border border-[var(--token-accent)]/10 rounded-full mb-8", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx10(Sparkles, { className: "w-3.5 h-3.5 text-[var(--token-accent)] animate-pulse" }),
              /* @__PURE__ */ jsx10("span", { className: "text-[10px] font-black uppercase tracking-[0.15em] text-[var(--token-accent)]", children: "Stress Test Active" })
            ] }) }),
            /* @__PURE__ */ jsxs5("h2", { className: "text-3xl md:text-5xl font-black text-[var(--token-text)] leading-[1.1] tracking-[-0.03em] mb-6", children: [
              "Pushing the ",
              /* @__PURE__ */ jsx10("br", {}),
              /* @__PURE__ */ jsx10("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-[var(--token-accent)] via-pink-500 to-purple-600", children: "Compiler Limits." })
            ] }),
            /* @__PURE__ */ jsx10("p", { className: "text-[var(--token-muted)] max-w-sm text-sm leading-relaxed mb-10", children: "This component uses arbitrary multi-values, responsive prefixes, and nested glassmorphism to validate the robustness of the SaaS Hybrid Styler." }),
            /* @__PURE__ */ jsx10("div", { className: "mt-auto flex flex-col sm:flex-row items-center gap-4", children: /* @__PURE__ */ jsxs5("button", { className: "w-full sm:w-auto p-[14px_28px] bg-[var(--token-text)] text-[var(--token-background)] rounded-2xl font-bold text-sm shadow-xl shadow-black/5 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3", children: [
              "View Benchmarks ",
              /* @__PURE__ */ jsx10(ArrowRight, { className: "w-4 h-4" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx10("div", { className: "col-span-1 md:col-span-2 lg:col-span-4 row-span-3 bg-[var(--token-text)] rounded-[32px] md:rounded-[40px] p-8 text-[var(--token-background)] relative flex flex-col justify-between overflow-hidden shadow-2xl", children: /* @__PURE__ */ jsxs5("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsx10(Zap, { className: "w-8 h-8 text-[var(--token-accent)] mb-4" }),
          /* @__PURE__ */ jsxs5("div", { className: "text-4xl font-black mb-1", children: [
            "0.03",
            /* @__PURE__ */ jsx10("span", { className: "text-[var(--token-background)]/40 text-lg ml-1 font-medium", children: "ms" })
          ] }),
          /* @__PURE__ */ jsx10("div", { className: "text-[11px] font-bold uppercase tracking-widest text-[var(--token-background)]/40", children: "Tailwind JIT Latency" })
        ] }) })
      ] })
    }
  );
});
CanvasBento.meta = {
  type: "ui_canvas_bento",
  name: "Bento Stress Test",
  version: "1.0.0",
  category: "Visual Features",
  description: "Bento Grid complejo para validar la compilaci\xF3n de estilos avanzados.",
  propControls: [],
  dependencies: {
    "lucide-react": "^0.300.0",
    "framer-motion": "^10.0.0"
  }
};

// src/components/Elements/CanvasButton.tsx
import { forwardRef as forwardRef3 } from "react";
import { jsxs as jsxs6 } from "react/jsx-runtime";
var CanvasButton = forwardRef3(
  ({ className, style, content, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs6(
      "button",
      {
        ref,
        className: cn2("box-border flex items-center justify-center bg-transparent border-none text-inherit cursor-pointer", className),
        style,
        ...props,
        children: [
          content,
          children
        ]
      }
    );
  }
);
CanvasButton.meta = {
  type: "ui_canvas_button",
  name: "Canvas Button",
  version: "1.0.0",
  category: "Basic",
  propControls: [
    { name: "content", label: "Texto", type: "string", defaultValue: "Button" }
  ]
};
CanvasButton.displayName = "CanvasButton";

// src/components/Elements/CanvasCheckbox.tsx
import { Check } from "lucide-react";
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var CanvasCheckbox = ({
  content,
  styles,
  props,
  "props.checked": _px,
  // Capturamos la prop "leakeada" del editor
  className,
  ...rest
}) => {
  const isChecked = props?.checked ?? true;
  return /* @__PURE__ */ jsxs7("div", { className: cn2("flex items-center gap-2 px-1 py-1", className), style: styles, ...rest, children: [
    /* @__PURE__ */ jsx11("div", { className: cn2(
      "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
      isChecked ? "bg-blue-500 border-blue-500 text-white" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
    ), children: isChecked && /* @__PURE__ */ jsx11(Check, { size: 12, strokeWidth: 3 }) }),
    /* @__PURE__ */ jsx11("span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none", children: content || "Checkbox label" })
  ] });
};
CanvasCheckbox.meta = {
  type: "ui_canvas_checkbox",
  name: "Checkbox",
  version: "1.0.0",
  category: "Forms",
  propControls: [
    { name: "props.checked", label: "Checked", type: "boolean", defaultValue: true },
    { name: "content", label: "Label", type: "string", defaultValue: "Checkbox label" }
  ]
};

// src/components/Elements/CanvasHeader.tsx
import { forwardRef as forwardRef6 } from "react";

// src/components/Elements/CanvasLayout.tsx
import { forwardRef as forwardRef4 } from "react";
import { jsx as jsx12 } from "react/jsx-runtime";
var CanvasLayout = forwardRef4(
  ({ className, children, style, ...props }, ref) => {
    return /* @__PURE__ */ jsx12(
      "div",
      {
        ref,
        className: cn2("box-border relative flex flex-col min-h-[40px]", className),
        style,
        ...props,
        children
      }
    );
  }
);
CanvasLayout.meta = {
  type: "ui_canvas_layout",
  name: "Canvas Layout",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  propControls: []
};
CanvasLayout.displayName = "CanvasLayout";

// src/components/Elements/CanvasText.tsx
import { forwardRef as forwardRef5 } from "react";
import { jsxs as jsxs8 } from "react/jsx-runtime";
var CanvasText = forwardRef5(
  ({ className, style, content, children, ...props }, ref) => {
    const mergedStyle = {
      display: "block",
      ...style
    };
    return /* @__PURE__ */ jsxs8(
      "div",
      {
        ref,
        className: cn2("box-border", className),
        style: mergedStyle,
        ...props,
        children: [
          content,
          children
        ]
      }
    );
  }
);
CanvasText.meta = {
  type: "ui_canvas_text",
  name: "Canvas Text",
  version: "1.0.0",
  category: "Basic",
  propControls: [
    { name: "content", label: "Contenido", type: "string", defaultValue: "" }
  ]
};
CanvasText.displayName = "CanvasText";

// src/components/Elements/CanvasHeader.tsx
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
var CanvasHeader = forwardRef6(
  ({ className, style, content, children, props, ...rest }, ref) => {
    const logoText = props?.logoText || "ACME Corp";
    const links = props?.links || ["Features", "Pricing"];
    const buttonText = props?.buttonText || "Sign in";
    return /* @__PURE__ */ jsxs9(
      CanvasLayout,
      {
        ref,
        className: cn2("custom-header !flex flex-row justify-between items-center px-4 py-4 bg-[var(--token-background)] border-b border-[var(--token-border)] md:px-8 md:py-4 transition-all", className),
        style,
        ...rest,
        children: [
          /* @__PURE__ */ jsx13(CanvasText, { style: { fontWeight: 800, color: "var(--token-text)", width: "auto" }, className: "text-[16px] md:text-[24px]", children: logoText }),
          /* @__PURE__ */ jsxs9(CanvasLayout, { style: { display: "flex", alignItems: "center", padding: 0, minHeight: 0, border: "none" }, className: "flex-row gap-4 md:gap-8", children: [
            links.map((link) => /* @__PURE__ */ jsx13(CanvasText, { style: { color: "var(--token-muted)", fontWeight: 500 }, className: "text-[12px] md:text-[14px]", children: link }, link)),
            /* @__PURE__ */ jsx13(CanvasButton, { style: { backgroundColor: "var(--token-text)", color: "var(--token-background)", borderRadius: 8, fontWeight: 600, border: "none" }, className: "text-[12px] md:text-[18px] px-3 py-2 md:px-4 md:py-2", children: buttonText })
          ] }),
          children
        ]
      }
    );
  }
);
CanvasHeader.meta = {
  type: "ui_canvas_header",
  name: "Enterprise Header",
  version: "1.0.0",
  category: "Navigation",
  description: "Sticky header con logo, links y acci\xF3n de login.",
  propControls: [
    { name: "logoText", label: "Texto Logo", type: "string", defaultValue: "ACME Corp" },
    { name: "buttonText", label: "Texto Bot\xF3n", type: "string", defaultValue: "Sign in" }
  ]
};
CanvasHeader.displayName = "CanvasHeader";

// src/components/Elements/CanvasInput.tsx
import { jsx as jsx14 } from "react/jsx-runtime";
var CanvasInput = ({
  content,
  styles,
  props,
  "props.placeholder": _px,
  // Prevent leak to DOM
  className,
  children: _children,
  // Strip children — input is a void element
  ...rest
}) => {
  return /* @__PURE__ */ jsx14("div", { className: cn2("w-full h-auto", className), style: styles, children: /* @__PURE__ */ jsx14(
    "input",
    {
      type: "text",
      placeholder: props?.placeholder || "Type something...",
      className: "w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:outline-none focus:border-blue-500 hover:border-zinc-300 dark:hover:border-zinc-700",
      defaultValue: content,
      ...rest
    }
  ) });
};
CanvasInput.meta = {
  type: "ui_canvas_input",
  name: "Form Input",
  version: "1.0.0",
  category: "Forms",
  propControls: [
    { name: "props.placeholder", label: "Placeholder", type: "string", defaultValue: "Type something..." }
  ]
};

// src/components/Elements/CanvasSwitch.tsx
import { jsx as jsx15, jsxs as jsxs10 } from "react/jsx-runtime";
var CanvasSwitch = ({
  content,
  styles,
  props,
  "props.active": _px,
  className,
  ...rest
}) => {
  const isOn = props?.active ?? true;
  return /* @__PURE__ */ jsxs10("div", { className: cn2("flex items-center gap-3 py-1 px-1", className), style: styles, ...rest, children: [
    /* @__PURE__ */ jsx15("div", { className: cn2(
      "relative w-9 h-5 rounded-full transition-all duration-300",
      isOn ? "bg-blue-500 shadow-inner" : "bg-zinc-200 dark:bg-zinc-800"
    ), children: /* @__PURE__ */ jsx15("div", { className: cn2(
      "absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300 transform",
      isOn ? "translate-x-4 shadow-md scale-110" : ""
    ) }) }),
    /* @__PURE__ */ jsx15("span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none", children: content || "Toggle switch" })
  ] });
};
CanvasSwitch.meta = {
  type: "ui_canvas_switch",
  name: "Switch/Toggle",
  version: "1.0.0",
  category: "Forms",
  propControls: [
    { name: "props.active", label: "Active", type: "boolean", defaultValue: true },
    { name: "content", label: "Label", type: "string", defaultValue: "Toggle switch" }
  ]
};

// src/components/Elements/StickyHeader.tsx
import React8, {
  forwardRef as forwardRef7,
  useCallback,
  useEffect as useEffect2,
  useRef,
  useState as useState2
} from "react";
import { Fragment, jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
var HEADER_DEFAULT_MAX_WIDTH = 1240;
var VARIANT_OPTIONS = ["h1", "h2", "h3", "h4", "h5"];
var WIDTH_OPTIONS = ["full", "box"];
var StickyHeader = forwardRef7(
  ({
    className,
    style: styleAttr,
    // Props del manifest — destructuradas explícitamente para no caer en
    // `...rest` y filtrarse al `<header>` como atributos DOM desconocidos.
    logoText: logoTextProp,
    logoSrc: logoSrcProp,
    variant: variantProp,
    width: widthProp,
    maxWidth: maxWidthProp,
    height: heightProp,
    disableStickyOnScroll: disableStickyOnScrollProp,
    // `content` viene del wrapper editor pero el componente no lo usa.
    content: _content,
    // Props v1 que pueden persistir en projectos pre-migración. La
    // migración declarada `2.0.0` es null (no-op) en el catálogo JSON
    // porque las funciones no se serializan; las descartamos acá para
    // que NO caigan en `...rest` ni se filtren al DOM como atributos
    // desconocidos. El usuario re-customiza los slots vía el subtree
    // por defecto que el editor hidrata al re-insertar.
    links: _legacyLinks,
    buttonText: _legacyButtonText,
    buttonHref: _legacyButtonHref,
    children,
    ...rest
  }, ref) => {
    const logoText = logoTextProp || "Shop";
    const logoSrc = typeof logoSrcProp === "string" ? logoSrcProp.trim() : "";
    const styleVariant = VARIANT_OPTIONS.includes(
      variantProp
    ) ? variantProp : "h1";
    const widthMode = WIDTH_OPTIONS.includes(
      widthProp
    ) ? widthProp : "full";
    const maxWidth = typeof maxWidthProp === "number" && maxWidthProp > 0 ? maxWidthProp : HEADER_DEFAULT_MAX_WIDTH;
    const minHeight = typeof heightProp === "number" && heightProp > 0 ? heightProp : 0;
    const disableStickyOnScroll = disableStickyOnScrollProp === true;
    const childArr = React8.Children.toArray(children);
    const slotA = childArr[0] ?? null;
    const slotB = childArr[1] ?? null;
    const headerRef = useRef(null);
    const [drawerOpen, setDrawerOpen] = useState2(false);
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);
    const [sticky, setSticky] = useState2(false);
    const [visible, setVisible] = useState2(false);
    const lastYRef = useRef(0);
    useEffect2(() => {
      if (disableStickyOnScroll) return;
      const onScroll = () => {
        const y = window.scrollY;
        const down = y > lastYRef.current;
        lastYRef.current = y;
        if (y <= 0) {
          setSticky(false);
          setVisible(false);
        } else if (down && y > 300 && !sticky) {
          setSticky(true);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
          });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, [sticky, disableStickyOnScroll]);
    useEffect2(() => {
      if (typeof document === "undefined") return;
      document.body.style.overflow = drawerOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [drawerOpen]);
    useEffect2(() => {
      if (!drawerOpen) return;
      const onKey = (e) => {
        if (e.key === "Escape") closeDrawer();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [drawerOpen, closeDrawer]);
    const [headerH, setHeaderH] = useState2(64);
    useEffect2(() => {
      if (!headerRef.current) return;
      const measure = () => setHeaderH(headerRef.current?.offsetHeight ?? 64);
      measure();
      const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
      if (ro && headerRef.current) ro.observe(headerRef.current);
      window.addEventListener("resize", measure);
      return () => {
        ro?.disconnect();
        window.removeEventListener("resize", measure);
      };
    }, []);
    const containerStyle = {
      ...styleAttr || {},
      ...widthMode === "box" ? { "--header-max-w": `${maxWidth}px` } : {},
      ...minHeight > 0 ? { "--header-min-h": `${minHeight}px` } : {}
    };
    const innerWidthCls = widthMode === "box" ? "md:max-w-[var(--header-max-w)]" : "max-w-full";
    const innerMinHCls = minHeight > 0 ? "md:min-h-[var(--header-min-h)]" : "";
    const innerLayoutCls = (() => {
      switch (styleVariant) {
        case "h2":
          return "md:grid md:grid-cols-3 md:items-center";
        case "h3":
          return "md:flex md:flex-col md:gap-2";
        case "h4":
        case "h5":
        case "h1":
        default:
          return "md:flex md:items-center md:justify-between";
      }
    })();
    const renderDesktopBody = () => {
      const Logo = /* @__PURE__ */ jsx16("div", { className: "flex items-center gap-3 shrink-0", children: logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        /* @__PURE__ */ jsx16(
          "img",
          {
            src: logoSrc,
            alt: logoText,
            className: "h-8 w-auto object-contain"
          }
        )
      ) : /* @__PURE__ */ jsx16("span", { className: "font-bold text-[18px] md:text-[20px] text-zinc-900", children: logoText }) });
      const SlotA = /* @__PURE__ */ jsx16("div", { "data-slot": "a", className: "hidden md:flex items-center gap-6", children: slotA });
      const SlotB = /* @__PURE__ */ jsx16("div", { "data-slot": "b", className: "hidden md:flex items-center gap-4", children: slotB });
      switch (styleVariant) {
        case "h2":
          return /* @__PURE__ */ jsxs11(Fragment, { children: [
            SlotA,
            /* @__PURE__ */ jsx16("div", { className: "flex justify-center", children: Logo }),
            SlotB
          ] });
        case "h3":
          return /* @__PURE__ */ jsxs11(Fragment, { children: [
            /* @__PURE__ */ jsx16("div", { className: "flex justify-center", children: Logo }),
            /* @__PURE__ */ jsxs11("div", { className: "hidden md:flex items-center justify-between gap-6", children: [
              slotA && /* @__PURE__ */ jsx16("div", { "data-slot": "a", className: "flex items-center gap-6", children: slotA }),
              slotB && /* @__PURE__ */ jsx16("div", { "data-slot": "b", className: "flex items-center gap-4", children: slotB })
            ] })
          ] });
        case "h4":
          return /* @__PURE__ */ jsxs11(Fragment, { children: [
            Logo,
            /* @__PURE__ */ jsxs11("div", { className: "hidden md:flex items-center gap-6", children: [
              slotA && /* @__PURE__ */ jsx16("div", { "data-slot": "a", className: "flex items-center gap-6", children: slotA }),
              slotB && /* @__PURE__ */ jsx16("div", { "data-slot": "b", className: "flex items-center gap-4", children: slotB })
            ] })
          ] });
        case "h5":
          return /* @__PURE__ */ jsxs11(Fragment, { children: [
            Logo,
            /* @__PURE__ */ jsxs11("div", { className: "hidden md:flex flex-col items-end gap-1", children: [
              slotA && /* @__PURE__ */ jsx16("div", { "data-slot": "a", className: "flex items-center gap-6", children: slotA }),
              slotB && /* @__PURE__ */ jsx16("div", { "data-slot": "b", className: "flex items-center gap-4", children: slotB })
            ] })
          ] });
        case "h1":
        default:
          return /* @__PURE__ */ jsxs11(Fragment, { children: [
            Logo,
            SlotA,
            SlotB
          ] });
      }
    };
    const headerInner = /* @__PURE__ */ jsxs11(
      "div",
      {
        className: cn2(
          "relative z-50 mx-auto flex items-center justify-between px-5 md:px-10 py-4",
          innerWidthCls,
          innerMinHCls,
          innerLayoutCls
        ),
        children: [
          renderDesktopBody(),
          /* @__PURE__ */ jsx16(
            HamburgerButton,
            {
              open: drawerOpen,
              onClick: () => setDrawerOpen((v) => !v)
            }
          )
        ]
      }
    );
    return /* @__PURE__ */ jsxs11(Fragment, { children: [
      /* @__PURE__ */ jsxs11(
        "header",
        {
          ref: (el) => {
            headerRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref)
              ref.current = el;
          },
          className: cn2(
            "relative z-50 bg-white border-b border-zinc-200 w-full",
            className
          ),
          style: containerStyle,
          ...rest,
          children: [
            headerInner,
            /* @__PURE__ */ jsx16(
              MobileDrawer,
              {
                open: drawerOpen,
                onClose: closeDrawer,
                offsetTop: headerH,
                slotA,
                slotB
              }
            )
          ]
        }
      ),
      sticky && /* @__PURE__ */ jsx16(
        "header",
        {
          className: cn2(
            "fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 shadow-sm",
            "transition-transform duration-500",
            visible ? "translate-y-0" : "-translate-y-full"
          ),
          children: headerInner
        }
      )
    ] });
  }
);
StickyHeader.displayName = "StickyHeader";
var HamburgerButton = ({ open, onClick }) => /* @__PURE__ */ jsxs11(
  "button",
  {
    type: "button",
    onClick,
    className: "md:hidden relative w-6 h-5 flex flex-col justify-between",
    "aria-label": open ? "Close menu" : "Open menu",
    "aria-expanded": open,
    children: [
      /* @__PURE__ */ jsx16(
        "span",
        {
          className: cn2(
            "block h-[2px] w-6 bg-zinc-900 rounded-full transition-all duration-300 origin-center",
            open && "translate-y-[9px] rotate-45"
          )
        }
      ),
      /* @__PURE__ */ jsx16(
        "span",
        {
          className: cn2(
            "block h-[2px] w-6 bg-zinc-900 rounded-full transition-all duration-300",
            open && "opacity-0 scale-x-0"
          )
        }
      ),
      /* @__PURE__ */ jsx16(
        "span",
        {
          className: cn2(
            "block h-[2px] w-6 bg-zinc-900 rounded-full transition-all duration-300 origin-center",
            open && "-translate-y-[9px] -rotate-45"
          )
        }
      )
    ]
  }
);
var MobileDrawer = ({
  open,
  onClose,
  offsetTop,
  slotA,
  slotB
}) => {
  return /* @__PURE__ */ jsxs11(Fragment, { children: [
    /* @__PURE__ */ jsx16(
      "div",
      {
        className: cn2(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        ),
        style: { top: offsetTop },
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs11(
      "div",
      {
        className: cn2(
          "fixed right-0 z-50 w-[280px] max-w-[80vw] bg-white border-l border-zinc-200",
          "shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out",
          "flex flex-col md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        ),
        style: { top: offsetTop, height: `calc(100vh - ${offsetTop}px)` },
        role: "dialog",
        "aria-modal": "true",
        onClick: onClose,
        children: [
          slotA && /* @__PURE__ */ jsx16(
            "div",
            {
              "data-slot": "a",
              className: "flex flex-col px-5 pt-6 pb-2 gap-1 [&_a]:text-[15px] [&_a]:font-medium [&_a]:text-zinc-900 [&_a]:py-3 [&_a]:border-b [&_a]:border-zinc-200",
              children: slotA
            }
          ),
          slotB && /* @__PURE__ */ jsx16(
            "div",
            {
              "data-slot": "b",
              className: "mt-auto px-5 pb-10 flex flex-col items-center gap-6 [&_a]:w-full [&_a]:text-center",
              children: slotB
            }
          )
        ]
      }
    )
  ] });
};
StickyHeader.meta = {
  type: "ui_sticky_header",
  name: "Sticky Header",
  version: "2.0.0",
  // Cadena de migraciones declaradas. La migración 2.0.0 es BREAKING:
  // las props `links`, `buttonText`, `buttonHref` desaparecen en favor de
  // dos slots editables. La función transforma el `props` shape vieja al
  // shape nuevo, descartando lo que ya no aplica. El editor se encarga de
  // hidratar los slots default vía `meta.defaultChildren` al reinsertar
  // (no hay forma de re-construir contenido editable desde un string CSV
  // de links pasado como prop sin perder fidelidad — el migrate sólo
  // limpia y deja al usuario re-customizar el subtree).
  // 2.0.0 es declarativamente no-op: las funciones no sobreviven a
  // JSON.stringify del catálogo y `applyComponentMigration` (modal del
  // editor) lee desde el catalog JSON. Las props v1 (links, buttonText,
  // buttonHref) sobreviven en el state pero el componente las descarta
  // en el destructure — no se filtran al DOM ni rompen render. El stamp
  // sube a 2.0.0 con appliedSteps=["1.1.0", "2.0.0"], el badge desaparece.
  migrations: {
    "1.1.0": null,
    "2.0.0": null
  },
  category: "Navigation",
  description: "Header con scroll-reveal sticky, dos slots editables (nav + cta), 5 estilos de layout y drawer mobile. Logo configurable como texto o imagen.",
  isContainer: true,
  propControls: [
    { name: "logoText", label: "Logo (texto)", type: "string", defaultValue: "Shop" },
    { name: "logoSrc", label: "Logo (URL imagen)", type: "string", defaultValue: "" },
    {
      name: "variant",
      label: "Estilo de layout",
      type: "select",
      options: ["h1", "h2", "h3", "h4", "h5"],
      defaultValue: "h1"
    },
    {
      name: "width",
      label: "Ancho",
      type: "select",
      options: ["full", "box"],
      defaultValue: "full"
    },
    {
      name: "maxWidth",
      label: "Ancho m\xE1ximo (px, s\xF3lo si width=box)",
      type: "number",
      defaultValue: HEADER_DEFAULT_MAX_WIDTH
    },
    {
      name: "height",
      label: "Altura m\xEDnima desktop (px, 0=auto)",
      type: "number",
      defaultValue: 0
    }
  ],
  /**
   * Subtree default universal — idéntico para landing, e-commerce, dashboard.
   * El editor lo hidrata al insertar (ver `insertNewComponent` →
   * `insertRemoteElement` → `defaultChildren`). El usuario edita textos /
   * URLs en cada link, agrega/elimina items dentro del slot.
   */
  defaultChildren: [
    {
      type: "slot",
      name: "Nav links",
      styles: {},
      children: [
        {
          type: "html_tag",
          tag: "a",
          name: "Home link",
          content: "Home",
          styles: { color: "#3f3f46", fontSize: 14, fontWeight: 500 },
          props: { href: "#" }
        },
        {
          type: "html_tag",
          tag: "a",
          name: "Shop link",
          content: "Shop",
          styles: { color: "#3f3f46", fontSize: 14, fontWeight: 500 },
          props: { href: "#" }
        },
        {
          type: "html_tag",
          tag: "a",
          name: "About link",
          content: "About",
          styles: { color: "#3f3f46", fontSize: 14, fontWeight: 500 },
          props: { href: "#" }
        },
        {
          type: "html_tag",
          tag: "a",
          name: "Contact link",
          content: "Contact",
          styles: { color: "#3f3f46", fontSize: 14, fontWeight: 500 },
          props: { href: "#" }
        }
      ]
    },
    {
      type: "slot",
      name: "CTA",
      styles: {},
      children: [
        {
          type: "html_tag",
          tag: "a",
          name: "Sign in CTA",
          content: "Sign in",
          styles: {
            backgroundColor: "#18181b",
            color: "#ffffff",
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600
          },
          props: { href: "#" }
        }
      ]
    }
  ]
};

// src/components/Navbar.tsx
import { forwardRef as forwardRef8 } from "react";
import { jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
var Navbar = forwardRef8(
  ({ logoText = "ACME Corp", links = ["Features", "Pricing"], ctaText = "Sign in", className, style, children, ...props }, ref) => {
    return /* @__PURE__ */ jsxs12(
      "nav",
      {
        ref,
        style,
        className: cn(
          "flex flex-row justify-between items-center px-4 py-4 bg-white border-b border-zinc-200 md:px-8 md:py-4 w-full",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx17("span", { className: "font-extrabold text-zinc-900 text-base md:text-2xl tracking-tighter shrink-0", children: logoText }),
          /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-4 md:gap-8 grow justify-end", children: [
            /* @__PURE__ */ jsx17("div", { className: "hidden md:flex gap-8 px-8 items-center", children: links?.map((link, idx) => {
              const label = typeof link === "string" ? link : link.label;
              const href = typeof link === "string" ? "#" : link.href;
              return /* @__PURE__ */ jsx17(
                "a",
                {
                  href,
                  className: "text-zinc-500 font-bold text-xs cursor-pointer hover:text-zinc-900 transition-colors uppercase tracking-widest no-underline",
                  children: label
                },
                idx
              );
            }) }),
            /* @__PURE__ */ jsxs12("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx17("button", { className: "bg-zinc-900 text-white text-xs md:text-sm px-4 py-2.5 rounded-[12px] font-bold hover:bg-zinc-700 transition-all active:scale-95 shadow-sm", children: ctaText }),
              /* @__PURE__ */ jsx17("div", { className: "flex items-center gap-2 empty:hidden border-l border-zinc-100 pl-4 ml-2", children })
            ] })
          ] })
        ]
      }
    );
  }
);
Navbar.displayName = "Navbar";
Navbar.meta = {
  type: "navbar",
  name: "Enterprise Global Navbar",
  version: "1.2.0",
  isSlot: true,
  category: "Navigation",
  description: "Barra de navegaci\xF3n con soporte para links inteligentes, contextos globales y slots.",
  propControls: [
    {
      name: "logoText",
      label: "Text / Brand Name",
      type: "string",
      defaultValue: "ACME Corp",
      dataBinding: { context: "SiteProvider", value: "config.companyName" }
    },
    {
      name: "ctaText",
      label: "CTA Button Text",
      type: "string",
      defaultValue: "Sign in"
    },
    {
      name: "links",
      label: "Navigation Links",
      type: "array",
      // Cambiado a array para el nuevo estándar de lista
      defaultValue: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" }
      ]
    }
  ]
};

// src/components/Primitives/Actions/Button.tsx
import * as React10 from "react";
import { cva } from "class-variance-authority";
import { jsx as jsx18 } from "react/jsx-runtime";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);
var Button = React10.forwardRef(
  ({ className, variant, size, ...props }, ref) => {
    return /* @__PURE__ */ jsx18("button", { ref, className: cn(buttonVariants({ variant, size }), className), ...props });
  }
);
Button.displayName = "Button";
Button.meta = {
  type: "ui_shadcn_button",
  name: "Button",
  version: "2.0.0",
  category: "Actions",
  description: "Composable shadcn Button with CVA-driven variants and sizes.",
  propControls: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"]
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["default", "sm", "lg", "icon"]
    }
  ]
};

// src/components/Primitives/Actions/Toggle.tsx
import { useState as useState3 } from "react";
import { jsx as jsx19 } from "react/jsx-runtime";
var Toggle = ({
  content = "Toggle",
  pressed: controlledPressed,
  variant = "default",
  size = "default",
  className = ""
}) => {
  const [internalPressed, setInternalPressed] = useState3(false);
  const isPressed = controlledPressed ?? internalPressed;
  const sizeClasses = {
    sm: "h-8 px-2 text-xs",
    default: "h-10 px-3 text-sm",
    lg: "h-11 px-4 text-sm"
  };
  const baseClasses = `inline-flex items-center justify-center rounded-md font-medium transition-colors ${sizeClasses[size]}`;
  const variantClasses = isPressed ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white" : variant === "outline" ? "border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800" : "bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800";
  return /* @__PURE__ */ jsx19(
    "button",
    {
      "aria-pressed": isPressed,
      onClick: () => setInternalPressed(!isPressed),
      className: `${baseClasses} ${variantClasses} ${className}`,
      children: content
    }
  );
};
Toggle.displayName = "Toggle";
Toggle.meta = {
  type: "toggle",
  name: "Toggle",
  version: "1.0.0",
  category: "Actions",
  description: "Two-state toggle button.",
  propControls: [
    { name: "content", label: "Label", type: "text" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "outline"] },
    { name: "size", label: "Size", type: "select", options: ["sm", "default", "lg"] },
    { name: "pressed", label: "Pressed", type: "boolean" }
  ]
};

// src/components/Primitives/Actions/ToggleGroup.tsx
import { useState as useState4 } from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var ToggleGroup = ({
  items = ["Bold", "Italic", "Underline"],
  type = "multiple",
  variant = "outline",
  size = "default",
  defaultValue = [],
  className = ""
}) => {
  const [selected, setSelected] = useState4(new Set(defaultValue));
  const toggle = (item) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        if (type === "single") next.clear();
        next.add(item);
      }
      return next;
    });
  };
  const sizeClasses = {
    sm: "h-8 px-2 text-xs",
    default: "h-10 px-3 text-sm",
    lg: "h-11 px-4 text-sm"
  };
  return /* @__PURE__ */ jsx20("div", { className: `inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 ${className}`, children: items.map((item, i) => {
    const isActive = selected.has(item);
    return /* @__PURE__ */ jsx20(
      "button",
      {
        onClick: () => toggle(item),
        className: `${sizeClasses[size]} font-medium transition-colors ${i > 0 ? "border-l border-zinc-200 dark:border-zinc-800" : ""} ${isActive ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"} ${i === 0 ? "rounded-l-md" : ""} ${i === items.length - 1 ? "rounded-r-md" : ""}`,
        children: item
      },
      item
    );
  }) });
};
ToggleGroup.displayName = "ToggleGroup";
ToggleGroup.meta = {
  type: "togglegroup",
  name: "ToggleGroup",
  version: "1.0.0",
  category: "Actions",
  description: "Group of toggles for multi-select or single-select.",
  propControls: [
    { name: "type", label: "Type", type: "select", options: ["single", "multiple"] },
    { name: "variant", label: "Variant", type: "select", options: ["default", "outline"] },
    { name: "size", label: "Size", type: "select", options: ["sm", "default", "lg"] }
  ]
};

// src/components/Primitives/DataDisplay/Avatar.tsx
import { jsx as jsx21 } from "react/jsx-runtime";
var Avatar = ({
  src,
  alt = "",
  fallback = "?",
  size = "md",
  className = "",
  ...rest
}) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base"
  };
  const initials = fallback.slice(0, 2).toUpperCase();
  return /* @__PURE__ */ jsx21("div", { ...rest, className: `relative inline-flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium overflow-hidden shrink-0 ${sizes[size]} ${className}`, children: src ? /* @__PURE__ */ jsx21("img", { src, alt, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsx21("span", { children: initials }) });
};
Avatar.displayName = "Avatar";
Avatar.meta = {
  type: "ui_shadcn_avatar",
  name: "Avatar (Atomic)",
  version: "1.0.0",
  category: "Data Display",
  description: "A circular avatar with image or fallback initials.",
  propControls: [
    { name: "src", label: "Image URL", type: "string" },
    { name: "alt", label: "Alt text", type: "string" },
    { name: "fallback", label: "Fallback initials", type: "string" },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "md", "lg"]
    }
  ]
};

// src/components/Primitives/DataDisplay/Badge.tsx
import * as React13 from "react";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx22 } from "react/jsx-runtime";
var badgeVariants = cva2(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-border bg-background text-foreground",
        ghost: "border-transparent bg-transparent px-0"
      }
    },
    defaultVariants: { variant: "outline" }
  }
);
var Badge = React13.forwardRef(
  ({ className, variant, ...props }, ref) => {
    return /* @__PURE__ */ jsx22("div", { ref, className: cn(badgeVariants({ variant }), className), ...props });
  }
);
Badge.displayName = "Badge";
Badge.meta = {
  type: "ui_shadcn_badge",
  name: "Badge",
  version: "2.0.0",
  category: "Data Display",
  description: "Composable shadcn Badge with CVA-driven variants.",
  propControls: [
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost"]
    }
  ]
};

// src/components/Primitives/DataDisplay/Card.tsx
import * as React14 from "react";
import { jsx as jsx23 } from "react/jsx-runtime";
var Card = React14.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx23(
      "div",
      {
        ref,
        "data-slot": "card",
        className: cn(
          "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm",
          className
        ),
        ...props
      }
    );
  }
);
Card.displayName = "Card";
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "card-action",
      className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx23(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
Card.meta = {
  type: "ui_shadcn_card",
  name: "Card",
  version: "2.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "Composable shadcn Card. Compose with CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction.",
  propControls: []
};

// src/components/Primitives/DataDisplay/Table.tsx
import * as React15 from "react";
import { jsx as jsx24 } from "react/jsx-runtime";
var Table = React15.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx24("table", { ref, className: cn("w-full caption-bottom text-sm", className), ...props }) })
);
Table.displayName = "Table";
var TableHeader = React15.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24("thead", { ref, className: cn("[&_tr]:border-b", className), ...props })
);
TableHeader.displayName = "TableHeader";
var TableBody = React15.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
var TableRow = React15.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
    "tr",
    {
      ref,
      className: cn("border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
var TableHead = React15.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
    "th",
    {
      ref,
      className: cn("h-10 px-3 text-left align-middle text-xs font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
var TableCell = React15.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx24(
    "td",
    {
      ref,
      className: cn("px-3 py-2.5 align-middle [&:has([role=checkbox])]:pr-0", className),
      ...props
    }
  )
);
TableCell.displayName = "TableCell";
Table.meta = {
  type: "table",
  name: "Table",
  version: "2.0.0",
  category: "Data Display",
  isSlot: true,
  isContainer: true,
  description: "Composable shadcn Table. Compose with TableHeader, TableBody, TableRow, TableHead, TableCell.",
  propControls: []
};

// src/components/Primitives/Inputs/Checkbox.tsx
import * as React16 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check as Check2 } from "lucide-react";
import { jsx as jsx25 } from "react/jsx-runtime";
var Checkbox = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx25(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-border bg-background shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary transition-colors",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx25(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center text-current", children: /* @__PURE__ */ jsx25(Check2, { className: "h-3.5 w-3.5", strokeWidth: 3 }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
Checkbox.meta = {
  type: "ui_shadcn_checkbox",
  name: "Checkbox",
  version: "2.0.0",
  category: "Forms",
  description: "Composable shadcn Checkbox built on Radix UI primitive.",
  propControls: [
    { name: "checked", label: "Checked", type: "boolean" },
    { name: "disabled", label: "Disabled", type: "boolean" }
  ]
};

// src/components/Primitives/Inputs/Combobox.tsx
import { useState as useState5, useMemo } from "react";
import { Fragment as Fragment2, jsx as jsx26, jsxs as jsxs13 } from "react/jsx-runtime";
var Combobox = ({
  label,
  placeholder = "Search...",
  options = [
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Next.js", value: "nextjs" }
  ],
  defaultValue,
  className = ""
}) => {
  const [open, setOpen] = useState5(false);
  const [query, setQuery] = useState5("");
  const [selected, setSelected] = useState5(defaultValue || "");
  const filtered = useMemo(
    () => options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );
  const selectedLabel = options.find((o) => o.value === selected)?.label;
  return /* @__PURE__ */ jsxs13("div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ jsx26("label", { className: "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5", children: label }),
    /* @__PURE__ */ jsxs13("div", { className: "relative", children: [
      /* @__PURE__ */ jsx26(
        "input",
        {
          type: "text",
          value: open ? query : selectedLabel || "",
          onChange: (e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          },
          onFocus: () => setOpen(true),
          placeholder,
          className: "w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        }
      ),
      open && /* @__PURE__ */ jsxs13(Fragment2, { children: [
        /* @__PURE__ */ jsx26("div", { className: "fixed inset-0 z-40", onClick: () => {
          setOpen(false);
          setQuery("");
        } }),
        /* @__PURE__ */ jsx26("div", { className: "absolute top-full left-0 z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-1 shadow-md", children: filtered.length === 0 ? /* @__PURE__ */ jsx26("div", { className: "px-3 py-2 text-sm text-zinc-500", children: "No results found" }) : filtered.map((opt) => /* @__PURE__ */ jsx26(
          "button",
          {
            onClick: () => {
              setSelected(opt.value);
              setOpen(false);
              setQuery("");
            },
            className: `flex w-full items-center px-3 py-1.5 text-sm transition-colors ${selected === opt.value ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`,
            children: opt.label
          },
          opt.value
        )) })
      ] })
    ] })
  ] });
};
Combobox.displayName = "Combobox";
Combobox.meta = {
  type: "combobox",
  name: "Combobox",
  version: "1.0.0",
  category: "Inputs",
  description: "Searchable dropdown select. Autocomplete with filtering.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "placeholder", label: "Placeholder", type: "text" }
  ]
};

// src/components/Primitives/Inputs/Form.tsx
import React18 from "react";
import { jsx as jsx27, jsxs as jsxs14 } from "react/jsx-runtime";
var Form = React18.forwardRef(
  ({ title, description, children, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxs14(
      "form",
      {
        ref,
        className: cn2("space-y-6 w-full max-w-md p-6 border rounded-xl bg-card text-card-foreground shadow-sm", className),
        onSubmit: (e) => {
          e.preventDefault();
          console.log("Form submitted");
        },
        ...props,
        children: [
          (title || description) && /* @__PURE__ */ jsxs14("div", { className: "space-y-1.5 mb-4", children: [
            title && /* @__PURE__ */ jsx27("h3", { className: "text-2xl font-semibold leading-none tracking-tight", children: title }),
            description && /* @__PURE__ */ jsx27("p", { className: "text-sm text-muted-foreground", children: description })
          ] }),
          /* @__PURE__ */ jsx27("div", { className: "space-y-4", children })
        ]
      }
    );
  }
);
Form.displayName = "Form";
Form.meta = {
  type: "ui_shadcn_form",
  name: "Form Container (Atomic)",
  version: "1.0.0",
  category: "Forms",
  isSlot: true,
  isContainer: true,
  description: "A Shadcn-styled form container that accepts inputs and buttons as children.",
  propControls: [
    { name: "title", label: "Form Title", type: "string" },
    { name: "description", label: "Description", type: "string" }
  ]
};

// src/components/Primitives/Inputs/Input.tsx
import * as React19 from "react";
import { jsx as jsx28 } from "react/jsx-runtime";
var Input = React19.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx28(
      "input",
      {
        type,
        "data-slot": "input",
        className: cn(
          "flex h-9 w-full min-w-0 rounded-md border border-border bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "selection:bg-primary selection:text-primary-foreground",
          "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
Input.meta = {
  type: "ui_shadcn_input",
  name: "Input",
  version: "2.0.0",
  category: "Forms",
  description: "Composable shadcn Input. Native HTML input with shadcn styling.",
  propControls: [
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["text", "password", "email", "number", "tel", "url", "search", "date"]
    },
    { name: "placeholder", label: "Placeholder", type: "string" },
    { name: "disabled", label: "Disabled", type: "boolean" }
  ]
};

// src/components/Primitives/Inputs/Label.tsx
import * as React20 from "react";
import { jsx as jsx29 } from "react/jsx-runtime";
var Label = React20.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx29(
      "label",
      {
        ref,
        "data-slot": "label",
        className: cn(
          "flex items-center gap-2 text-sm leading-none font-medium select-none",
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
          className
        ),
        ...props
      }
    );
  }
);
Label.displayName = "Label";
Label.meta = {
  type: "ui_shadcn_label",
  name: "Label",
  version: "1.0.0",
  category: "Forms",
  description: "Composable shadcn Label. Associate with inputs via htmlFor.",
  propControls: [
    { name: "htmlFor", label: "For (input id)", type: "string" }
  ]
};

// src/components/Primitives/Inputs/RadioGroup.tsx
import { useState as useState6 } from "react";
import { jsx as jsx30, jsxs as jsxs15 } from "react/jsx-runtime";
var RadioGroup = ({
  label,
  options = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" }
  ],
  defaultValue,
  orientation = "vertical",
  className = ""
}) => {
  const [selected, setSelected] = useState6(defaultValue || options[0]?.value);
  return /* @__PURE__ */ jsxs15("fieldset", { className: `${className}`, children: [
    label && /* @__PURE__ */ jsx30("legend", { className: "text-sm font-medium text-zinc-900 dark:text-white mb-3", children: label }),
    /* @__PURE__ */ jsx30("div", { className: `flex ${orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4"}`, children: options.map((opt) => /* @__PURE__ */ jsxs15("label", { className: "flex items-center gap-2 cursor-pointer", children: [
      /* @__PURE__ */ jsx30(
        "div",
        {
          onClick: () => setSelected(opt.value),
          className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selected === opt.value ? "border-primary" : "border-zinc-300 dark:border-zinc-700"}`,
          children: selected === opt.value && /* @__PURE__ */ jsx30("div", { className: "w-2 h-2 rounded-full bg-primary" })
        }
      ),
      /* @__PURE__ */ jsx30("span", { className: "text-sm text-zinc-700 dark:text-zinc-300", children: opt.label })
    ] }, opt.value)) })
  ] });
};
RadioGroup.displayName = "RadioGroup";
RadioGroup.meta = {
  type: "radiogroup",
  name: "RadioGroup",
  version: "1.0.0",
  category: "Inputs",
  description: "Group of radio buttons for single selection.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "orientation", label: "Orientation", type: "select", options: ["vertical", "horizontal"] }
  ]
};

// src/components/Primitives/Inputs/Select.tsx
import * as React22 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check3, ChevronDown } from "lucide-react";
import { jsx as jsx31, jsxs as jsxs16 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React22.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs16(
  SelectPrimitive.Trigger,
  {
    ref,
    "data-slot": "select-trigger",
    className: cn(
      "flex h-9 w-fit items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm shadow-xs transition-colors outline-none",
      "placeholder:text-muted-foreground",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "[&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx31(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx31(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = React22.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx31(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx31(
  SelectPrimitive.Content,
  {
    ref,
    "data-slot": "select-content",
    position,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background text-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx31(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        ),
        children
      }
    )
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectItem = React22.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs16(
  SelectPrimitive.Item,
  {
    ref,
    "data-slot": "select-item",
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx31("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx31(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx31(Check3, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx31(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
Select.meta = {
  type: "select",
  name: "Select",
  version: "2.0.0",
  category: "Inputs",
  isSlot: true,
  isContainer: true,
  description: "Composable shadcn Select built on Radix UI. Compose with SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup.",
  propControls: []
};

// src/components/Primitives/Inputs/Slider.tsx
import { useState as useState7 } from "react";
import { jsx as jsx32, jsxs as jsxs17 } from "react/jsx-runtime";
var Slider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  showValue = true,
  className = ""
}) => {
  const [value, setValue] = useState7(defaultValue);
  const pct = (value - min) / (max - min) * 100;
  return /* @__PURE__ */ jsxs17("div", { className: `w-full ${className}`, children: [
    (label || showValue) && /* @__PURE__ */ jsxs17("div", { className: "flex items-center justify-between mb-2", children: [
      label && /* @__PURE__ */ jsx32("span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300", children: label }),
      showValue && /* @__PURE__ */ jsx32("span", { className: "text-sm text-zinc-500 dark:text-zinc-400", children: value })
    ] }),
    /* @__PURE__ */ jsxs17("div", { className: "relative w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800", children: [
      /* @__PURE__ */ jsx32(
        "div",
        {
          className: "absolute h-full rounded-full bg-primary transition-all",
          style: { width: `${pct}%` }
        }
      ),
      /* @__PURE__ */ jsx32(
        "input",
        {
          type: "range",
          min,
          max,
          step,
          value,
          onChange: (e) => setValue(Number(e.target.value)),
          className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        }
      ),
      /* @__PURE__ */ jsx32(
        "div",
        {
          className: "absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-primary bg-white shadow-sm transition-all",
          style: { left: `calc(${pct}% - 10px)` }
        }
      )
    ] })
  ] });
};
Slider.displayName = "Slider";
Slider.meta = {
  type: "slider",
  name: "Slider",
  version: "1.0.0",
  category: "Inputs",
  description: "Range slider for numeric values.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "min", label: "Min", type: "number" },
    { name: "max", label: "Max", type: "number" },
    { name: "defaultValue", label: "Default Value", type: "number" },
    { name: "showValue", label: "Show Value", type: "boolean" }
  ]
};

// src/components/Primitives/Inputs/Switch.tsx
import { useState as useState8 } from "react";
import { jsx as jsx33, jsxs as jsxs18 } from "react/jsx-runtime";
var Switch = ({
  label,
  checked: controlledChecked,
  onCheckedChange,
  disabled = false,
  className = ""
}) => {
  const [internalChecked, setInternalChecked] = useState8(false);
  const isChecked = controlledChecked ?? internalChecked;
  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onCheckedChange?.(next);
  };
  return /* @__PURE__ */ jsxs18("label", { className: `flex items-center gap-3 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`, children: [
    /* @__PURE__ */ jsx33(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": isChecked,
        disabled,
        onClick: toggle,
        className: `relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${isChecked ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"}`,
        children: /* @__PURE__ */ jsx33(
          "span",
          {
            className: `pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${isChecked ? "translate-x-5" : "translate-x-0"}`
          }
        )
      }
    ),
    label && /* @__PURE__ */ jsx33("span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300", children: label })
  ] });
};
Switch.displayName = "Switch";
Switch.meta = {
  type: "switch",
  name: "Switch",
  version: "1.0.0",
  category: "Inputs",
  description: "Toggle switch for boolean settings.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "checked", label: "Checked", type: "boolean" },
    { name: "disabled", label: "Disabled", type: "boolean" }
  ]
};

// src/components/Primitives/Inputs/Textarea.tsx
import React25 from "react";
import { jsx as jsx34, jsxs as jsxs19 } from "react/jsx-runtime";
var Textarea = React25.forwardRef(
  ({ label, description, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxs19("div", { className: "w-full space-y-1.5", children: [
      label && /* @__PURE__ */ jsx34("label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label }),
      /* @__PURE__ */ jsx34(
        "textarea",
        {
          className: cn2(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          ),
          ref,
          ...props
        }
      ),
      description && /* @__PURE__ */ jsx34("p", { className: "text-xs text-muted-foreground", children: description })
    ] });
  }
);
Textarea.displayName = "Textarea";
Textarea.meta = {
  type: "ui_shadcn_textarea",
  name: "Textarea (Atomic)",
  version: "1.0.0",
  category: "Forms",
  description: "Standard Shadcn Textarea for long text input.",
  propControls: [
    { name: "placeholder", label: "Placeholder", type: "string" },
    { name: "label", label: "Label", type: "string" },
    { name: "description", label: "Description", type: "string" }
  ]
};

// src/components/Primitives/Layout/FooterBar.tsx
import { jsx as jsx35, jsxs as jsxs20 } from "react/jsx-runtime";
var FooterBar = ({
  brand,
  copyright,
  children,
  className = "",
  ...rest
}) => {
  return /* @__PURE__ */ jsx35("footer", { ...rest, className: `w-full bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 ${className}`, children: /* @__PURE__ */ jsxs20("div", { className: "max-w-6xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ jsxs20("div", { className: "flex flex-col md:flex-row gap-8", children: [
      brand && /* @__PURE__ */ jsx35("div", { className: "flex flex-col gap-2 md:w-1/3", children: /* @__PURE__ */ jsx35("span", { className: "font-bold text-lg text-zinc-900 dark:text-white", children: brand }) }),
      /* @__PURE__ */ jsx35("div", { className: "flex-1 flex flex-wrap gap-8", children })
    ] }),
    copyright && /* @__PURE__ */ jsx35("div", { className: "mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500", children: copyright })
  ] }) });
};
FooterBar.displayName = "FooterBar";
FooterBar.meta = {
  type: "ui_shadcn_footer",
  name: "Footer (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A page footer with brand, link columns, and copyright text.",
  propControls: [
    { name: "brand", label: "Brand name", type: "string" },
    { name: "copyright", label: "Copyright text", type: "string" }
  ]
};

// src/components/Primitives/Layout/Heading.tsx
import { jsx as jsx36 } from "react/jsx-runtime";
var Heading = ({
  content,
  level = 2,
  align = "left",
  className = "",
  ...rest
}) => {
  const sizes = {
    1: "text-4xl md:text-5xl font-extrabold tracking-tight",
    2: "text-3xl md:text-4xl font-bold tracking-tight",
    3: "text-2xl font-bold",
    4: "text-xl font-semibold",
    5: "text-lg font-semibold",
    6: "text-base font-medium"
  };
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  const Tag = `h${level}`;
  return /* @__PURE__ */ jsx36(Tag, { ...rest, className: `text-zinc-900 dark:text-white ${sizes[level]} ${alignClass[align]} ${className}`, children: content });
};
Heading.displayName = "Heading";
Heading.meta = {
  type: "ui_shadcn_heading",
  name: "Heading (Atomic)",
  version: "1.0.0",
  category: "Typography",
  description: "A semantic heading (h1-h6) with size and alignment control.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    {
      name: "level",
      label: "Level (1-6)",
      type: "number"
    },
    {
      name: "align",
      label: "Align",
      type: "select",
      options: ["left", "center", "right"]
    }
  ]
};

// src/components/Primitives/Layout/ImagePlaceholder.tsx
import { jsx as jsx37, jsxs as jsxs21 } from "react/jsx-runtime";
var ImagePlaceholder = ({
  src,
  alt = "Image",
  aspectRatio = "video",
  rounded = "md",
  className = "",
  ...rest
}) => {
  const ratios = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[21/9]",
    portrait: "aspect-[3/4]"
  };
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  };
  if (src) {
    return /* @__PURE__ */ jsx37("div", { ...rest, children: /* @__PURE__ */ jsx37(
      "img",
      {
        src,
        alt,
        className: `w-full object-cover ${ratios[aspectRatio]} ${roundedClasses[rounded]} ${className}`
      }
    ) });
  }
  return /* @__PURE__ */ jsx37("div", { ...rest, className: `w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 ${ratios[aspectRatio]} ${roundedClasses[rounded]} ${className}`, children: /* @__PURE__ */ jsxs21("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ jsxs21("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx37("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
      /* @__PURE__ */ jsx37("circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
      /* @__PURE__ */ jsx37("path", { d: "M21 15l-5-5L5 21" })
    ] }),
    /* @__PURE__ */ jsx37("span", { className: "text-xs", children: alt })
  ] }) });
};
ImagePlaceholder.displayName = "ImagePlaceholder";
ImagePlaceholder.meta = {
  type: "ui_shadcn_image",
  name: "Image (Atomic)",
  version: "1.0.0",
  category: "Media",
  description: "An image component with placeholder fallback and aspect ratio control.",
  propControls: [
    { name: "src", label: "Image URL", type: "string" },
    { name: "alt", label: "Alt text / label", type: "string" },
    {
      name: "aspectRatio",
      label: "Aspect Ratio",
      type: "select",
      options: ["square", "video", "wide", "portrait"]
    },
    {
      name: "rounded",
      label: "Border Radius",
      type: "select",
      options: ["none", "sm", "md", "lg", "full"]
    }
  ]
};

// src/components/Primitives/Layout/LayoutBox.tsx
import { jsx as jsx38 } from "react/jsx-runtime";
var LayoutBox = ({
  direction = "vertical",
  gap = 4,
  padding = 0,
  columns = 1,
  children,
  className = "",
  ...rest
}) => {
  const baseClass = direction === "grid" ? "grid" : direction === "horizontal" ? "flex flex-row flex-wrap" : "flex flex-col";
  const style = {
    gap: `${gap * 4}px`,
    padding: padding > 0 ? `${padding * 4}px` : void 0,
    ...direction === "grid" ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {}
  };
  return /* @__PURE__ */ jsx38("div", { ...rest, className: cn2(baseClass, "min-h-[40px]", className), style, children });
};
LayoutBox.meta = {
  type: "ui_shadcn_layout",
  name: "Layout Box (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A flexible container for building layouts from images using Flex or Grid.",
  propControls: [
    {
      name: "direction",
      label: "Direction",
      type: "select",
      options: ["horizontal", "vertical", "grid"]
    },
    { name: "gap", label: "Gap (TW units)", type: "number" },
    { name: "padding", label: "Padding (TW units)", type: "number" },
    { name: "columns", label: "Grid Columns", type: "number" }
  ]
};

// src/components/Primitives/Layout/Link.tsx
import { jsx as jsx39 } from "react/jsx-runtime";
var Link = ({
  content,
  href = "#",
  variant = "default",
  className = "",
  ...rest
}) => {
  const variants = {
    default: "text-primary hover:underline underline-offset-4",
    muted: "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors",
    nav: "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white text-sm font-medium transition-colors"
  };
  return /* @__PURE__ */ jsx39("a", { ...rest, href, className: `${variants[variant]} ${className}`, children: content });
};
Link.displayName = "Link";
Link.meta = {
  type: "ui_shadcn_link",
  name: "Link (Atomic)",
  version: "1.0.0",
  category: "Navigation",
  description: "A styled anchor link with variant support.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    { name: "href", label: "URL", type: "string" },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "muted", "nav"]
    }
  ]
};

// src/components/Primitives/Layout/NavBar.tsx
import { jsx as jsx40, jsxs as jsxs22 } from "react/jsx-runtime";
var NavBar = ({
  brand = "",
  children,
  sticky = true,
  className = "",
  ...rest
}) => {
  return /* @__PURE__ */ jsxs22("nav", { ...rest, className: `w-full flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 ${sticky ? "sticky top-0 z-50" : ""} ${className}`, children: [
    brand && /* @__PURE__ */ jsx40("div", { className: "font-bold text-lg text-zinc-900 dark:text-white shrink-0", children: brand }),
    /* @__PURE__ */ jsx40("div", { className: "flex items-center gap-4 flex-1 justify-end", children })
  ] });
};
NavBar.displayName = "NavBar";
NavBar.meta = {
  type: "ui_shadcn_navbar",
  name: "Navigation Bar (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A top navigation bar with brand text and children for links/buttons.",
  propControls: [
    { name: "brand", label: "Brand name", type: "string" },
    { name: "sticky", label: "Sticky", type: "boolean" }
  ]
};

// src/components/Primitives/Layout/Paragraph.tsx
import { jsx as jsx41 } from "react/jsx-runtime";
var Paragraph = ({
  content,
  size = "base",
  muted = false,
  align = "left",
  className = "",
  ...rest
}) => {
  const sizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg"
  };
  const colorClass = muted ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-700 dark:text-zinc-300";
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };
  return /* @__PURE__ */ jsx41("p", { ...rest, className: `leading-relaxed ${sizes[size]} ${colorClass} ${alignClass[align]} ${className}`, children: content });
};
Paragraph.displayName = "Paragraph";
Paragraph.meta = {
  type: "ui_shadcn_paragraph",
  name: "Paragraph (Atomic)",
  version: "1.0.0",
  category: "Typography",
  description: "A paragraph text block with size, muted, and alignment control.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: ["sm", "base", "lg"]
    },
    { name: "muted", label: "Muted color", type: "boolean" },
    {
      name: "align",
      label: "Align",
      type: "select",
      options: ["left", "center", "right"]
    }
  ]
};

// src/components/Primitives/Layout/Section.tsx
import { jsx as jsx42 } from "react/jsx-runtime";
var Section = ({
  background = "default",
  paddingY = "lg",
  maxWidth = "lg",
  children,
  className = "",
  ...rest
}) => {
  const bgClasses = {
    default: "bg-white dark:bg-zinc-950",
    muted: "bg-zinc-50 dark:bg-zinc-900",
    primary: "bg-primary text-primary-foreground",
    dark: "bg-zinc-900 dark:bg-zinc-950 text-white"
  };
  const paddingClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-16",
    xl: "py-24"
  };
  const maxWidthClasses = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full"
  };
  return /* @__PURE__ */ jsx42("section", { ...rest, className: `w-full ${bgClasses[background]} ${paddingClasses[paddingY]} ${className}`, children: /* @__PURE__ */ jsx42("div", { className: `mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]}`, children }) });
};
Section.displayName = "Section";
Section.meta = {
  type: "ui_shadcn_section",
  name: "Section (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A page section with background, padding, and max-width controls. Used for hero, pricing, testimonials, etc.",
  propControls: [
    {
      name: "background",
      label: "Background",
      type: "select",
      options: ["default", "muted", "primary", "dark"]
    },
    {
      name: "paddingY",
      label: "Vertical Padding",
      type: "select",
      options: ["sm", "md", "lg", "xl"]
    },
    {
      name: "maxWidth",
      label: "Max Width",
      type: "select",
      options: ["sm", "md", "lg", "xl", "full"]
    }
  ]
};

// src/components/Primitives/Layout/Separator.tsx
import { jsx as jsx43 } from "react/jsx-runtime";
var Separator = ({
  orientation = "horizontal",
  className = "",
  ...rest
}) => {
  return orientation === "horizontal" ? /* @__PURE__ */ jsx43("div", { ...rest, className: `w-full h-px bg-zinc-200 dark:bg-zinc-800 ${className}`, role: "separator" }) : /* @__PURE__ */ jsx43("div", { ...rest, className: `h-full w-px bg-zinc-200 dark:bg-zinc-800 ${className}`, role: "separator" });
};
Separator.displayName = "Separator";
Separator.meta = {
  type: "ui_shadcn_separator",
  name: "Separator (Atomic)",
  version: "1.0.0",
  category: "Layout",
  description: "A horizontal or vertical separator line.",
  propControls: [
    {
      name: "orientation",
      label: "Orientation",
      type: "select",
      options: ["horizontal", "vertical"]
    }
  ]
};

// src/components/Primitives/Navigation/Breadcrumb.tsx
import * as React26 from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { jsx as jsx44, jsxs as jsxs23 } from "react/jsx-runtime";
var Breadcrumb = React26.forwardRef(
  ({ ...props }, ref) => /* @__PURE__ */ jsx44("nav", { ref, "data-slot": "breadcrumb", "aria-label": "breadcrumb", ...props })
);
Breadcrumb.displayName = "Breadcrumb";
var BreadcrumbList = React26.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx44(
    "ol",
    {
      ref,
      "data-slot": "breadcrumb-list",
      className: cn("flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground sm:gap-2.5", className),
      ...props
    }
  )
);
BreadcrumbList.displayName = "BreadcrumbList";
var BreadcrumbItem = React26.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx44("li", { ref, "data-slot": "breadcrumb-item", className: cn("inline-flex items-center gap-1.5", className), ...props })
);
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbLink = React26.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx44(
    "a",
    {
      ref,
      "data-slot": "breadcrumb-link",
      className: cn("transition-colors hover:text-foreground", className),
      ...props
    }
  )
);
BreadcrumbLink.displayName = "BreadcrumbLink";
var BreadcrumbPage = React26.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx44(
    "span",
    {
      ref,
      "data-slot": "breadcrumb-page",
      "aria-current": "page",
      "aria-disabled": "true",
      className: cn("font-normal text-foreground", className),
      ...props
    }
  )
);
BreadcrumbPage.displayName = "BreadcrumbPage";
var BreadcrumbSeparator = ({ children, className, ...props }) => /* @__PURE__ */ jsx44(
  "li",
  {
    "data-slot": "breadcrumb-separator",
    role: "presentation",
    "aria-hidden": "true",
    className: cn("[&>svg]:size-3.5", className),
    ...props,
    children: children ?? /* @__PURE__ */ jsx44(ChevronRight, {})
  }
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
var BreadcrumbEllipsis = ({ className, ...props }) => /* @__PURE__ */ jsxs23(
  "span",
  {
    "data-slot": "breadcrumb-ellipsis",
    role: "presentation",
    "aria-hidden": "true",
    className: cn("flex h-9 w-9 items-center justify-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx44(MoreHorizontal, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx44("span", { className: "sr-only", children: "More" })
    ]
  }
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
Breadcrumb.meta = {
  type: "breadcrumb",
  name: "Breadcrumb",
  version: "2.0.0",
  category: "Navigation",
  isSlot: true,
  isContainer: true,
  description: "Composable shadcn Breadcrumb. Compose with BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis.",
  propControls: []
};

// src/components/Primitives/Navigation/Pagination.tsx
import { useState as useState9 } from "react";
import { jsx as jsx45, jsxs as jsxs24 } from "react/jsx-runtime";
var Pagination = ({
  totalPages = 10,
  defaultPage = 1,
  className = ""
}) => {
  const [current, setCurrent] = useState9(defaultPage);
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");
      for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
        pages.push(i);
      }
      if (current < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };
  const btnBase = "inline-flex items-center justify-center rounded-md text-sm font-medium h-9 w-9 transition-colors";
  return /* @__PURE__ */ jsxs24("nav", { className: `flex items-center gap-1 ${className}`, children: [
    /* @__PURE__ */ jsx45(
      "button",
      {
        disabled: current <= 1,
        onClick: () => setCurrent((p) => Math.max(1, p - 1)),
        className: `${btnBase} border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 text-zinc-700 dark:text-zinc-300`,
        children: "\u2039"
      }
    ),
    getPages().map(
      (page, i) => page === "..." ? /* @__PURE__ */ jsx45("span", { className: "px-1 text-zinc-400", children: "..." }, `dots-${i}`) : /* @__PURE__ */ jsx45(
        "button",
        {
          onClick: () => setCurrent(page),
          className: `${btnBase} ${current === page ? "bg-primary text-primary-foreground" : "border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`,
          children: page
        },
        page
      )
    ),
    /* @__PURE__ */ jsx45(
      "button",
      {
        disabled: current >= totalPages,
        onClick: () => setCurrent((p) => Math.min(totalPages, p + 1)),
        className: `${btnBase} border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 text-zinc-700 dark:text-zinc-300`,
        children: "\u203A"
      }
    )
  ] });
};
Pagination.displayName = "Pagination";
Pagination.meta = {
  type: "pagination",
  name: "Pagination",
  version: "1.0.0",
  category: "Navigation",
  description: "Page navigation with numbered buttons.",
  propControls: [
    { name: "totalPages", label: "Total Pages", type: "number" },
    { name: "defaultPage", label: "Default Page", type: "number" }
  ]
};

// src/components/Primitives/Overlays/AlertDialog.tsx
import { useState as useState10 } from "react";
import { Fragment as Fragment3, jsx as jsx46, jsxs as jsxs25 } from "react/jsx-runtime";
var AlertDialog = ({
  trigger = "Delete",
  title = "Are you sure?",
  description = "This action cannot be undone.",
  cancelText = "Cancel",
  confirmText = "Continue",
  variant = "default",
  open: controlledOpen,
  className = ""
}) => {
  const [internalOpen, setInternalOpen] = useState10(false);
  const isOpen = controlledOpen ?? internalOpen;
  const confirmClasses = variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700" : "bg-primary text-primary-foreground hover:bg-primary/90";
  return /* @__PURE__ */ jsxs25(Fragment3, { children: [
    /* @__PURE__ */ jsx46(
      "button",
      {
        onClick: () => setInternalOpen(true),
        className: `inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors ${variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700" : "bg-primary text-primary-foreground hover:bg-primary/90"}`,
        children: trigger
      }
    ),
    isOpen && /* @__PURE__ */ jsxs25("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx46("div", { className: "fixed inset-0 bg-black/80" }),
      /* @__PURE__ */ jsxs25("div", { className: `relative z-50 w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg ${className}`, children: [
        /* @__PURE__ */ jsx46("h2", { className: "text-lg font-semibold text-zinc-900 dark:text-white", children: title }),
        /* @__PURE__ */ jsx46("p", { className: "mt-2 text-sm text-zinc-500 dark:text-zinc-400", children: description }),
        /* @__PURE__ */ jsxs25("div", { className: "mt-6 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx46(
            "button",
            {
              onClick: () => setInternalOpen(false),
              className: "inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white",
              children: cancelText
            }
          ),
          /* @__PURE__ */ jsx46(
            "button",
            {
              onClick: () => setInternalOpen(false),
              className: `inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors ${confirmClasses}`,
              children: confirmText
            }
          )
        ] })
      ] })
    ] })
  ] });
};
AlertDialog.displayName = "AlertDialog";
AlertDialog.meta = {
  type: "alertdialog",
  name: "AlertDialog",
  version: "1.0.0",
  category: "Overlays",
  description: "Confirmation dialog with cancel/confirm actions.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "cancelText", label: "Cancel Text", type: "text" },
    { name: "confirmText", label: "Confirm Text", type: "text" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "destructive"] }
  ]
};

// src/components/Primitives/Overlays/Toast.tsx
import { useState as useState11, useEffect as useEffect3 } from "react";
import { jsx as jsx47, jsxs as jsxs26 } from "react/jsx-runtime";
var Toast = ({
  title = "Notification",
  description,
  variant = "default",
  duration = 5e3,
  open: controlledOpen = true,
  className = ""
}) => {
  const [visible, setVisible] = useState11(controlledOpen);
  useEffect3(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [visible, duration]);
  if (!visible) return null;
  const variantClasses = {
    default: "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800",
    success: "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800",
    destructive: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
  };
  return /* @__PURE__ */ jsx47("div", { className: `fixed bottom-4 right-4 z-50 w-[360px] rounded-lg border p-4 shadow-lg ${variantClasses[variant]} ${className}`, children: /* @__PURE__ */ jsxs26("div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ jsxs26("div", { children: [
      /* @__PURE__ */ jsx47("p", { className: "text-sm font-semibold text-zinc-900 dark:text-white", children: title }),
      description && /* @__PURE__ */ jsx47("p", { className: "mt-1 text-sm text-zinc-500 dark:text-zinc-400", children: description })
    ] }),
    /* @__PURE__ */ jsx47("button", { onClick: () => setVisible(false), className: "text-zinc-400 hover:text-zinc-600 transition-colors", children: "\u2715" })
  ] }) });
};
Toast.displayName = "Toast";
Toast.meta = {
  type: "toast",
  name: "Toast",
  version: "1.0.0",
  category: "Overlays",
  description: "Notification toast with auto-dismiss.",
  propControls: [
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "variant", label: "Variant", type: "select", options: ["default", "success", "destructive"] },
    { name: "duration", label: "Duration (ms)", type: "number" }
  ]
};

// src/components/Primitives/Overlays/Tooltip.tsx
import { useState as useState12 } from "react";
import { jsx as jsx48, jsxs as jsxs27 } from "react/jsx-runtime";
var Tooltip = ({
  content = "Tooltip text",
  side = "top",
  children,
  className = ""
}) => {
  const [visible, setVisible] = useState12(false);
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  return /* @__PURE__ */ jsxs27(
    "div",
    {
      className: "relative inline-block",
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      children: [
        children || /* @__PURE__ */ jsx48("button", { className: "inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white", children: "Hover me" }),
        visible && /* @__PURE__ */ jsx48("div", { className: `absolute z-50 ${sideClasses[side]} px-3 py-1.5 rounded-md bg-zinc-900 dark:bg-zinc-50 text-xs text-white dark:text-zinc-900 shadow-md whitespace-nowrap ${className}`, children: content })
      ]
    }
  );
};
Tooltip.displayName = "Tooltip";
Tooltip.meta = {
  type: "tooltip",
  name: "Tooltip",
  version: "1.0.0",
  category: "Overlays",
  description: "Small floating label on hover.",
  propControls: [
    { name: "content", label: "Text", type: "text" },
    { name: "side", label: "Side", type: "select", options: ["top", "bottom", "left", "right"] }
  ]
};

// src/components/Primitives/Structure/Accordion.tsx
import { useState as useState13 } from "react";
import { jsx as jsx49, jsxs as jsxs28 } from "react/jsx-runtime";
var Accordion = ({
  items = [
    { title: "Is this accessible?", content: "Yes. It follows the WAI-ARIA design pattern." },
    { title: "Is it styled?", content: "Yes. It comes with default styles that match the other components." },
    { title: "Is it animated?", content: "Yes. It uses CSS transitions for smooth open/close animations." }
  ],
  type = "single",
  className = ""
}) => {
  const [openItems, setOpenItems] = useState13(/* @__PURE__ */ new Set());
  const toggle = (index) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (type === "single") next.clear();
        next.add(index);
      }
      return next;
    });
  };
  return /* @__PURE__ */ jsx49("div", { className: `w-full divide-y divide-zinc-200 dark:divide-zinc-800 border-b border-zinc-200 dark:border-zinc-800 ${className}`, children: items.map((item, i) => {
    const isOpen = openItems.has(i);
    return /* @__PURE__ */ jsxs28("div", { children: [
      /* @__PURE__ */ jsxs28(
        "button",
        {
          onClick: () => toggle(i),
          className: "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-zinc-900 dark:text-white hover:underline transition-all",
          children: [
            item.title,
            /* @__PURE__ */ jsx49(
              "svg",
              {
                className: `h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx49("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx49(
        "div",
        {
          className: `overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`,
          children: /* @__PURE__ */ jsx49("p", { className: "text-sm text-zinc-500 dark:text-zinc-400", children: item.content })
        }
      )
    ] }, i);
  }) });
};
Accordion.displayName = "Accordion";
Accordion.meta = {
  type: "accordion",
  name: "Accordion",
  version: "1.0.0",
  category: "Data Display",
  isSlot: false,
  isContainer: false,
  description: "Collapsible content sections. Great for FAQ, settings, documentation.",
  propControls: [
    { name: "type", label: "Type", type: "select", options: ["single", "multiple"] }
  ]
};

// src/components/Primitives/Structure/Collapsible.tsx
import { useState as useState14 } from "react";
import { jsx as jsx50, jsxs as jsxs29 } from "react/jsx-runtime";
var Collapsible = ({
  title = "Toggle content",
  open: controlledOpen,
  children,
  className = ""
}) => {
  const [internalOpen, setInternalOpen] = useState14(false);
  const isOpen = controlledOpen ?? internalOpen;
  return /* @__PURE__ */ jsxs29("div", { className: `w-full rounded-md border border-zinc-200 dark:border-zinc-800 ${className}`, children: [
    /* @__PURE__ */ jsxs29(
      "button",
      {
        onClick: () => setInternalOpen(!isOpen),
        className: "flex w-full items-center justify-between p-4 text-left text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors rounded-t-md",
        children: [
          title,
          /* @__PURE__ */ jsx50(
            "svg",
            {
              className: `h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx50("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx50("div", { className: `overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[500px]" : "max-h-0"}`, children: /* @__PURE__ */ jsx50("div", { className: "p-4 pt-0 text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800", children: children || "Collapsible content goes here." }) })
  ] });
};
Collapsible.displayName = "Collapsible";
Collapsible.meta = {
  type: "collapsible",
  name: "Collapsible",
  version: "1.0.0",
  category: "Data Display",
  isSlot: true,
  isContainer: true,
  description: "Single collapsible section with toggle. For expandable content.",
  propControls: [
    { name: "title", label: "Title", type: "text" },
    { name: "open", label: "Open", type: "boolean" }
  ]
};

// src/components/Primitives/Structure/Command.tsx
import * as React33 from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { jsx as jsx51, jsxs as jsxs30 } from "react/jsx-runtime";
var Command = React33.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx51(
  CommandPrimitive,
  {
    ref,
    "data-slot": "command",
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = CommandPrimitive.displayName;
var CommandInput = React33.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs30("div", { className: "flex items-center border-b border-border px-3", "data-slot": "command-input-wrapper", children: [
  /* @__PURE__ */ jsx51(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx51(
    CommandPrimitive.Input,
    {
      ref,
      "data-slot": "command-input",
      className: cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = CommandPrimitive.Input.displayName;
var CommandList = React33.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx51(
  CommandPrimitive.List,
  {
    ref,
    "data-slot": "command-list",
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = CommandPrimitive.List.displayName;
var CommandEmpty = React33.forwardRef((props, ref) => /* @__PURE__ */ jsx51(
  CommandPrimitive.Empty,
  {
    ref,
    "data-slot": "command-empty",
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;
var CommandGroup = React33.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx51(
  CommandPrimitive.Group,
  {
    ref,
    "data-slot": "command-group",
    className: cn(
      "overflow-hidden p-1 text-foreground",
      "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = CommandPrimitive.Group.displayName;
var CommandSeparator = React33.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx51(
  CommandPrimitive.Separator,
  {
    ref,
    "data-slot": "command-separator",
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;
var CommandItem = React33.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx51(
  CommandPrimitive.Item,
  {
    ref,
    "data-slot": "command-item",
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
      "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "[&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = CommandPrimitive.Item.displayName;
var CommandShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx51(
  "span",
  {
    "data-slot": "command-shortcut",
    className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className),
    ...props
  }
);
CommandShortcut.displayName = "CommandShortcut";
Command.meta = {
  type: "command",
  name: "Command",
  version: "2.0.0",
  category: "Navigation",
  isSlot: true,
  isContainer: true,
  description: "Composable shadcn Command palette built on cmdk. Compose with CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut.",
  propControls: []
};

// src/components/Primitives/Structure/ContextMenu.tsx
import { useState as useState15 } from "react";
import { Fragment as Fragment4, jsx as jsx52, jsxs as jsxs31 } from "react/jsx-runtime";
var ContextMenu = ({
  items = [{ label: "Cut", shortcut: "\u2318X" }, { label: "Copy", shortcut: "\u2318C" }, { label: "Paste", shortcut: "\u2318V" }],
  children,
  className = ""
}) => {
  const [pos, setPos] = useState15(null);
  const handleContext = (e) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };
  return /* @__PURE__ */ jsxs31(Fragment4, { children: [
    /* @__PURE__ */ jsx52(
      "div",
      {
        onContextMenu: handleContext,
        className: `min-h-[100px] rounded-md border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm text-zinc-500 ${className}`,
        children: children || "Right-click here"
      }
    ),
    pos && /* @__PURE__ */ jsxs31(Fragment4, { children: [
      /* @__PURE__ */ jsx52("div", { className: "fixed inset-0 z-50", onClick: () => setPos(null) }),
      /* @__PURE__ */ jsx52(
        "div",
        {
          className: "fixed z-50 min-w-[8rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md",
          style: { left: pos.x, top: pos.y },
          children: items.map(
            (item, i) => item.separator ? /* @__PURE__ */ jsx52("div", { className: "my-1 h-px bg-zinc-200 dark:bg-zinc-800" }, i) : /* @__PURE__ */ jsxs31(
              "button",
              {
                onClick: () => setPos(null),
                className: "relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                children: [
                  /* @__PURE__ */ jsx52("span", { className: "flex-1 text-left", children: item.label }),
                  item.shortcut && /* @__PURE__ */ jsx52("span", { className: "ml-auto text-xs text-zinc-500", children: item.shortcut })
                ]
              },
              i
            )
          )
        }
      )
    ] })
  ] });
};
ContextMenu.displayName = "ContextMenu";
ContextMenu.meta = {
  type: "contextmenu",
  name: "ContextMenu",
  version: "1.0.0",
  category: "Navigation",
  isSlot: true,
  isContainer: true,
  description: "Right-click context menu with items and shortcuts.",
  propControls: []
};

// src/components/Primitives/Structure/Dialog.tsx
import { useState as useState16 } from "react";
import { Fragment as Fragment5, jsx as jsx53, jsxs as jsxs32 } from "react/jsx-runtime";
var Dialog = ({
  trigger = "Open",
  title = "Dialog Title",
  description,
  open: controlledOpen,
  children,
  className = ""
}) => {
  const [internalOpen, setInternalOpen] = useState16(false);
  const isOpen = controlledOpen ?? internalOpen;
  return /* @__PURE__ */ jsxs32(Fragment5, { children: [
    /* @__PURE__ */ jsx53(
      "button",
      {
        onClick: () => setInternalOpen(true),
        className: "inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90 transition-colors",
        children: trigger
      }
    ),
    isOpen && /* @__PURE__ */ jsxs32("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ jsx53("div", { className: "fixed inset-0 bg-black/80", onClick: () => setInternalOpen(false) }),
      /* @__PURE__ */ jsxs32("div", { className: `relative z-50 w-full max-w-lg rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg ${className}`, children: [
        title && /* @__PURE__ */ jsx53("h2", { className: "text-lg font-semibold text-zinc-900 dark:text-white", children: title }),
        description && /* @__PURE__ */ jsx53("p", { className: "mt-1.5 text-sm text-zinc-500 dark:text-zinc-400", children: description }),
        /* @__PURE__ */ jsx53("div", { className: "mt-4", children }),
        /* @__PURE__ */ jsx53(
          "button",
          {
            onClick: () => setInternalOpen(false),
            className: "absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-zinc-500 transition-opacity",
            children: "\u2715"
          }
        )
      ] })
    ] })
  ] });
};
Dialog.displayName = "Dialog";
Dialog.meta = {
  type: "dialog",
  name: "Dialog",
  version: "1.0.0",
  category: "Overlays",
  isSlot: true,
  isContainer: true,
  description: "Modal dialog with trigger button, title, description, and content slot.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "open", label: "Open", type: "boolean" }
  ]
};

// src/components/Primitives/Structure/DropdownMenu.tsx
import * as React36 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { jsx as jsx54 } from "react/jsx-runtime";
var DropdownMenu = DropdownMenuPrimitive.Root;
var DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
var DropdownMenuPortal = DropdownMenuPrimitive.Portal;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
var DropdownMenuContent = React36.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx54(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx54(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-background p-1 text-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
var DropdownMenuItem = React36.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx54(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
var DropdownMenuLabel = React36.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx54(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
var DropdownMenuSeparator = React36.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx54(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-border", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => /* @__PURE__ */ jsx54("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
DropdownMenu.meta = {
  type: "dropdownmenu",
  name: "DropdownMenu",
  version: "2.0.0",
  category: "Navigation",
  isSlot: true,
  isContainer: true,
  description: "Composable shadcn DropdownMenu built on Radix UI. Compose with DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuGroup.",
  propControls: []
};

// src/components/Primitives/Structure/HoverCard.tsx
import { useState as useState17 } from "react";
import { jsx as jsx55, jsxs as jsxs33 } from "react/jsx-runtime";
var HoverCard = ({
  trigger = "Hover me",
  children,
  className = ""
}) => {
  const [open, setOpen] = useState17(false);
  return /* @__PURE__ */ jsxs33(
    "div",
    {
      className: "relative inline-block",
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      children: [
        /* @__PURE__ */ jsx55("span", { className: "text-sm font-medium text-primary underline underline-offset-4 cursor-pointer", children: trigger }),
        open && /* @__PURE__ */ jsx55("div", { className: `absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-80 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-md ${className}`, children })
      ]
    }
  );
};
HoverCard.displayName = "HoverCard";
HoverCard.meta = {
  type: "hovercard",
  name: "HoverCard",
  version: "1.0.0",
  category: "Overlays",
  isSlot: true,
  isContainer: true,
  description: "Card that appears on hover. Great for user profiles, previews.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" }
  ]
};

// src/components/Primitives/Structure/Menubar.tsx
import { useState as useState18 } from "react";
import { jsx as jsx56, jsxs as jsxs34 } from "react/jsx-runtime";
var Menubar = ({
  menus = [
    { label: "File", items: [{ label: "New" }, { label: "Open" }, { separator: true, label: "" }, { label: "Save", shortcut: "\u2318S" }] },
    { label: "Edit", items: [{ label: "Undo", shortcut: "\u2318Z" }, { label: "Redo", shortcut: "\u2318\u21E7Z" }] },
    { label: "View", items: [{ label: "Zoom In" }, { label: "Zoom Out" }] }
  ],
  className = ""
}) => {
  const [openIndex, setOpenIndex] = useState18(null);
  return /* @__PURE__ */ jsx56("div", { className: `flex items-center space-x-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-sm ${className}`, children: menus.map((menu, idx) => /* @__PURE__ */ jsxs34("div", { className: "relative", children: [
    /* @__PURE__ */ jsx56(
      "button",
      {
        onClick: () => setOpenIndex(openIndex === idx ? null : idx),
        onMouseEnter: () => openIndex !== null && setOpenIndex(idx),
        className: `rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${openIndex === idx ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`,
        children: menu.label
      }
    ),
    openIndex === idx && /* @__PURE__ */ jsx56("div", { className: "absolute left-0 top-full mt-1 z-50 min-w-[12rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md", children: menu.items.map(
      (item, i) => item.separator ? /* @__PURE__ */ jsx56("div", { className: "my-1 h-px bg-zinc-200 dark:bg-zinc-800" }, i) : /* @__PURE__ */ jsxs34(
        "button",
        {
          onClick: () => setOpenIndex(null),
          className: "relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
          children: [
            /* @__PURE__ */ jsx56("span", { className: "flex-1 text-left", children: item.label }),
            item.shortcut && /* @__PURE__ */ jsx56("span", { className: "ml-auto text-xs text-zinc-500", children: item.shortcut })
          ]
        },
        i
      )
    ) })
  ] }, idx)) });
};
Menubar.displayName = "Menubar";
Menubar.meta = {
  type: "menubar",
  name: "Menubar",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Desktop application-style menu bar with dropdown menus.",
  propControls: []
};

// src/components/Primitives/Structure/NavigationMenu.tsx
import { useState as useState19 } from "react";
import { Fragment as Fragment6, jsx as jsx57, jsxs as jsxs35 } from "react/jsx-runtime";
var NavigationMenu = ({
  items = [
    { label: "Getting Started", children: [
      { label: "Introduction", description: "Learn the basics", href: "#" },
      { label: "Installation", description: "How to install", href: "#" }
    ] },
    { label: "Components", children: [
      { label: "Button", description: "Interactive button", href: "#" },
      { label: "Card", description: "Content container", href: "#" }
    ] },
    { label: "Documentation", href: "#" }
  ],
  className = ""
}) => {
  const [openIndex, setOpenIndex] = useState19(null);
  return /* @__PURE__ */ jsx57("nav", { className: `flex items-center space-x-1 ${className}`, children: items.map((item, idx) => /* @__PURE__ */ jsx57("div", { className: "relative", children: item.children ? /* @__PURE__ */ jsxs35(Fragment6, { children: [
    /* @__PURE__ */ jsxs35(
      "button",
      {
        onClick: () => setOpenIndex(openIndex === idx ? null : idx),
        onMouseEnter: () => openIndex !== null && setOpenIndex(idx),
        className: `inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${openIndex === idx ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`,
        children: [
          item.label,
          /* @__PURE__ */ jsx57("svg", { className: "h-3 w-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx57("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
        ]
      }
    ),
    openIndex === idx && /* @__PURE__ */ jsx57("div", { className: "absolute left-0 top-full mt-1.5 z-50 w-[400px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-lg", children: /* @__PURE__ */ jsx57("div", { className: "grid gap-3", children: item.children.map((child, ci) => /* @__PURE__ */ jsxs35(
      "a",
      {
        href: child.href || "#",
        className: "block rounded-md p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
        onClick: () => setOpenIndex(null),
        children: [
          /* @__PURE__ */ jsx57("div", { className: "text-sm font-medium text-zinc-900 dark:text-white", children: child.label }),
          child.description && /* @__PURE__ */ jsx57("div", { className: "mt-1 text-sm text-zinc-500 dark:text-zinc-400", children: child.description })
        ]
      },
      ci
    )) }) })
  ] }) : /* @__PURE__ */ jsx57(
    "a",
    {
      href: item.href || "#",
      className: "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
      children: item.label
    }
  ) }, idx)) });
};
NavigationMenu.displayName = "NavigationMenu";
NavigationMenu.meta = {
  type: "navigationmenu",
  name: "NavigationMenu",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Horizontal navigation with dropdown mega-menus. For site-wide navigation.",
  propControls: []
};

// src/components/Primitives/Structure/Popover.tsx
import { useState as useState20, useRef as useRef2 } from "react";
import { jsx as jsx58, jsxs as jsxs36 } from "react/jsx-runtime";
var Popover = ({
  trigger = "Open",
  children,
  align = "center",
  className = ""
}) => {
  const [open, setOpen] = useState20(false);
  const ref = useRef2(null);
  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };
  return /* @__PURE__ */ jsxs36("div", { className: "relative inline-block", ref, children: [
    /* @__PURE__ */ jsx58(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white",
        children: trigger
      }
    ),
    open && /* @__PURE__ */ jsx58("div", { className: `absolute top-full mt-2 ${alignClasses[align]} z-50 w-72 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-md ${className}`, children })
  ] });
};
Popover.displayName = "Popover";
Popover.meta = {
  type: "popover",
  name: "Popover",
  version: "1.0.0",
  category: "Overlays",
  isSlot: true,
  isContainer: true,
  description: "Floating content panel attached to a trigger button.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "align", label: "Alignment", type: "select", options: ["start", "center", "end"] }
  ]
};

// src/components/Primitives/Structure/Sheet.tsx
import { useState as useState21 } from "react";
import { Fragment as Fragment7, jsx as jsx59, jsxs as jsxs37 } from "react/jsx-runtime";
var Sheet = ({
  trigger = "Open",
  title,
  description,
  side = "right",
  open: controlledOpen,
  children,
  className = ""
}) => {
  const [internalOpen, setInternalOpen] = useState21(false);
  const isOpen = controlledOpen ?? internalOpen;
  const sideClasses = {
    left: "inset-y-0 left-0 w-3/4 max-w-sm border-r",
    right: "inset-y-0 right-0 w-3/4 max-w-sm border-l",
    top: "inset-x-0 top-0 h-auto border-b",
    bottom: "inset-x-0 bottom-0 h-auto border-t"
  };
  const translateClasses = {
    left: isOpen ? "translate-x-0" : "-translate-x-full",
    right: isOpen ? "translate-x-0" : "translate-x-full",
    top: isOpen ? "translate-y-0" : "-translate-y-full",
    bottom: isOpen ? "translate-y-0" : "translate-y-full"
  };
  return /* @__PURE__ */ jsxs37(Fragment7, { children: [
    /* @__PURE__ */ jsx59(
      "button",
      {
        onClick: () => setInternalOpen(true),
        className: "inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90 transition-colors",
        children: trigger
      }
    ),
    isOpen && /* @__PURE__ */ jsxs37("div", { className: "fixed inset-0 z-50", children: [
      /* @__PURE__ */ jsx59("div", { className: "fixed inset-0 bg-black/80", onClick: () => setInternalOpen(false) }),
      /* @__PURE__ */ jsxs37("div", { className: `fixed ${sideClasses[side]} bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 p-6 shadow-lg transition-transform duration-300 ${translateClasses[side]} ${className}`, children: [
        title && /* @__PURE__ */ jsx59("h2", { className: "text-lg font-semibold text-zinc-900 dark:text-white", children: title }),
        description && /* @__PURE__ */ jsx59("p", { className: "mt-1.5 text-sm text-zinc-500 dark:text-zinc-400", children: description }),
        /* @__PURE__ */ jsx59("div", { className: "mt-4", children }),
        /* @__PURE__ */ jsx59(
          "button",
          {
            onClick: () => setInternalOpen(false),
            className: "absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 text-zinc-500 transition-opacity",
            children: "\u2715"
          }
        )
      ] })
    ] })
  ] });
};
Sheet.displayName = "Sheet";
Sheet.meta = {
  type: "sheet",
  name: "Sheet",
  version: "1.0.0",
  category: "Overlays",
  isSlot: true,
  isContainer: true,
  description: "Slide-out panel from any edge. Great for mobile menus, filters, settings.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "side", label: "Side", type: "select", options: ["left", "right", "top", "bottom"] },
    { name: "open", label: "Open", type: "boolean" }
  ]
};

// src/components/Primitives/Structure/Tabs.tsx
import { useState as useState22 } from "react";
import { jsx as jsx60, jsxs as jsxs38 } from "react/jsx-runtime";
var Tabs = ({
  items = [
    { label: "Account", content: "Make changes to your account settings here." },
    { label: "Password", content: "Change your password here." },
    { label: "Notifications", content: "Configure your notification preferences." }
  ],
  defaultIndex = 0,
  className = ""
}) => {
  const [activeIndex, setActiveIndex] = useState22(defaultIndex);
  return /* @__PURE__ */ jsxs38("div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ jsx60("div", { className: "flex border-b border-zinc-200 dark:border-zinc-800", children: items.map((item, i) => /* @__PURE__ */ jsx60(
      "button",
      {
        onClick: () => setActiveIndex(i),
        className: `px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${i === activeIndex ? "border-primary text-zinc-900 dark:text-white" : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700"}`,
        children: item.label
      },
      i
    )) }),
    /* @__PURE__ */ jsx60("div", { className: "mt-4 text-sm text-zinc-700 dark:text-zinc-300", children: items[activeIndex]?.content })
  ] });
};
Tabs.displayName = "Tabs";
Tabs.meta = {
  type: "tabs",
  name: "Tabs",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Tabbed content switcher. For settings, categories, content organization.",
  propControls: [
    { name: "defaultIndex", label: "Default Tab", type: "number" }
  ]
};

// src/registry.ts
var componentRegistry = {
  "ui_atc_button": { exportName: "AddToCartButton", meta: AddToCartButton.meta },
  "ui_card_wrapper": { exportName: "CardWrapper", meta: CardWrapper.meta },
  "ui_cart_badge": { exportName: "CartBadge", meta: CartBadge.meta },
  "ui_canvas_bento": { exportName: "CanvasBento", meta: CanvasBento.meta },
  "ui_canvas_button": { exportName: "CanvasButton", meta: CanvasButton.meta },
  "ui_canvas_checkbox": { exportName: "CanvasCheckbox", meta: CanvasCheckbox.meta },
  "ui_canvas_header": { exportName: "CanvasHeader", meta: CanvasHeader.meta },
  "ui_canvas_input": { exportName: "CanvasInput", meta: CanvasInput.meta },
  "ui_canvas_layout": { exportName: "CanvasLayout", meta: CanvasLayout.meta },
  "ui_canvas_switch": { exportName: "CanvasSwitch", meta: CanvasSwitch.meta },
  "ui_canvas_text": { exportName: "CanvasText", meta: CanvasText.meta },
  "ui_sticky_header": { exportName: "StickyHeader", meta: StickyHeader.meta },
  "ui_footer": { exportName: "Footer", meta: Footer.meta },
  "ui_hero": { exportName: "Hero", meta: Hero.meta },
  "ui_hero_subtitle": { exportName: "HeroSubtitle", meta: HeroSubtitle.meta },
  "ui_hero_title": { exportName: "HeroTitle", meta: HeroTitle.meta },
  "navbar": { exportName: "Navbar", meta: Navbar.meta },
  "ui_shadcn_button": { exportName: "Button", meta: Button.meta },
  "toggle": { exportName: "Toggle", meta: Toggle.meta },
  "togglegroup": { exportName: "ToggleGroup", meta: ToggleGroup.meta },
  "ui_shadcn_avatar": { exportName: "Avatar", meta: Avatar.meta },
  "ui_shadcn_badge": { exportName: "Badge", meta: Badge.meta },
  "ui_shadcn_card": { exportName: "Card", meta: Card.meta },
  "table": { exportName: "Table", meta: Table.meta },
  "ui_shadcn_checkbox": { exportName: "Checkbox", meta: Checkbox.meta },
  "combobox": { exportName: "Combobox", meta: Combobox.meta },
  "ui_shadcn_form": { exportName: "Form", meta: Form.meta },
  "ui_shadcn_input": { exportName: "Input", meta: Input.meta },
  "ui_shadcn_label": { exportName: "Label", meta: Label.meta },
  "radiogroup": { exportName: "RadioGroup", meta: RadioGroup.meta },
  "select": { exportName: "Select", meta: Select.meta },
  "slider": { exportName: "Slider", meta: Slider.meta },
  "switch": { exportName: "Switch", meta: Switch.meta },
  "ui_shadcn_textarea": { exportName: "Textarea", meta: Textarea.meta },
  "ui_shadcn_footer": { exportName: "FooterBar", meta: FooterBar.meta },
  "ui_shadcn_heading": { exportName: "Heading", meta: Heading.meta },
  "ui_shadcn_image": { exportName: "ImagePlaceholder", meta: ImagePlaceholder.meta },
  "ui_shadcn_layout": { exportName: "LayoutBox", meta: LayoutBox.meta },
  "ui_shadcn_link": { exportName: "Link", meta: Link.meta },
  "ui_shadcn_navbar": { exportName: "NavBar", meta: NavBar.meta },
  "ui_shadcn_paragraph": { exportName: "Paragraph", meta: Paragraph.meta },
  "ui_shadcn_section": { exportName: "Section", meta: Section.meta },
  "ui_shadcn_separator": { exportName: "Separator", meta: Separator.meta },
  "breadcrumb": { exportName: "Breadcrumb", meta: Breadcrumb.meta },
  "pagination": { exportName: "Pagination", meta: Pagination.meta },
  "alertdialog": { exportName: "AlertDialog", meta: AlertDialog.meta },
  "toast": { exportName: "Toast", meta: Toast.meta },
  "tooltip": { exportName: "Tooltip", meta: Tooltip.meta },
  "accordion": { exportName: "Accordion", meta: Accordion.meta },
  "collapsible": { exportName: "Collapsible", meta: Collapsible.meta },
  "command": { exportName: "Command", meta: Command.meta },
  "contextmenu": { exportName: "ContextMenu", meta: ContextMenu.meta },
  "dialog": { exportName: "Dialog", meta: Dialog.meta },
  "dropdownmenu": { exportName: "DropdownMenu", meta: DropdownMenu.meta },
  "hovercard": { exportName: "HoverCard", meta: HoverCard.meta },
  "menubar": { exportName: "Menubar", meta: Menubar.meta },
  "navigationmenu": { exportName: "NavigationMenu", meta: NavigationMenu.meta },
  "popover": { exportName: "Popover", meta: Popover.meta },
  "sheet": { exportName: "Sheet", meta: Sheet.meta },
  "tabs": { exportName: "Tabs", meta: Tabs.meta },
  "ui_text": { exportName: "Text", meta: Text.meta }
};
var getSafeCatalog = (pkgName, baseUrl = "/api/remote-asset") => {
  return Object.entries(componentRegistry).map(([regType, comp]) => {
    const meta = comp.meta || {};
    const isLocalApi = baseUrl.includes("/api/remote-asset");
    const finalType = meta.type || regType;
    const url = isLocalApi ? `${baseUrl}?pkg=${encodeURIComponent(pkgName)}&comp=${encodeURIComponent(finalType)}&v=${meta.version}` : `${baseUrl}/${encodeURIComponent(pkgName)}/${meta.version}/${finalType}.js`;
    return {
      type: finalType,
      ...meta,
      url,
      importPath: pkgName,
      exportName: comp.exportName,
      isPremium: meta.isPremium === true
    };
  });
};

// src/components/BentoBox.tsx
import { forwardRef as forwardRef20 } from "react";
import { Sparkles as Sparkles2, ArrowRight as ArrowRight2, Zap as Zap2, Shield as Shield2, Globe as Globe2 } from "lucide-react";
import { jsx as jsx61, jsxs as jsxs39 } from "react/jsx-runtime";
var CanvasBento2 = forwardRef20(({ className, style, children, ...props }, ref) => {
  return /* @__PURE__ */ jsx61(
    "div",
    {
      ref,
      ...props,
      style,
      className: cn("w-full box-border p-[40px_20px] md:p-[60px_20px] bg-[var(--token-background)] border border-[var(--token-muted)]/10 rounded-[32px] md:rounded-[48px] overflow-hidden transition-colors duration-500", className),
      children: /* @__PURE__ */ jsxs39("div", { className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 md:grid-rows-6 gap-6 min-h-[1200px] md:h-[700px]", children: [
        /* @__PURE__ */ jsxs39("div", { className: "col-span-1 md:col-span-4 lg:col-span-8 row-span-4 bg-[var(--token-background)] border border-[var(--token-muted)]/20 rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group", children: [
          /* @__PURE__ */ jsx61("div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,var(--token-primary)_8%,transparent_70%)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000" }),
          /* @__PURE__ */ jsxs39("div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ jsx61("div", { className: "w-fit p-[8px_16px] bg-[var(--token-primary)]/5 border border-[var(--token-primary)]/10 rounded-full mb-8", children: /* @__PURE__ */ jsxs39("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx61(Sparkles2, { className: "w-3.5 h-3.5 text-[var(--token-primary)] animate-pulse" }),
              /* @__PURE__ */ jsx61("span", { className: "text-[10px] font-black uppercase tracking-[0.15em] text-[var(--token-primary)]", children: "Stress Test Active" })
            ] }) }),
            /* @__PURE__ */ jsxs39("h2", { className: "text-4xl md:text-6xl font-bold tracking-tight mb-8", children: [
              "Pushing the ",
              /* @__PURE__ */ jsx61("br", {}),
              /* @__PURE__ */ jsx61(
                "span",
                {
                  className: "bg-clip-text",
                  style: {
                    backgroundImage: "linear-gradient(to right, #60a5fa, #6366f1, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    display: "inline-block"
                  },
                  children: "Compiler Limits."
                }
              )
            ] }),
            /* @__PURE__ */ jsx61("p", { className: "text-[var(--token-muted)] max-w-sm text-sm leading-relaxed mb-10", children: "This component uses arbitrary multi-values, responsive prefixes, and nested glassmorphism to validate the robustness of the SaaS Hybrid Styler." }),
            /* @__PURE__ */ jsxs39("div", { className: "mt-auto flex flex-col sm:flex-row items-center gap-4", children: [
              /* @__PURE__ */ jsxs39("button", { className: "w-full sm:w-auto p-[14px_28px] bg-[var(--token-text)] text-[var(--token-background)] rounded-2xl font-bold text-sm shadow-xl shadow-black/5 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3", children: [
                "View Benchmarks ",
                /* @__PURE__ */ jsx61(ArrowRight2, { className: "w-4 h-4" })
              ] }),
              /* @__PURE__ */ jsx61("button", { className: "w-full sm:w-auto p-[14px_28px] bg-[var(--token-background)] border border-[var(--token-muted)]/20 text-[var(--token-muted)] rounded-2xl font-bold text-sm hover:bg-[var(--token-muted)]/5 transition-all", children: "Documentation" })
            ] }),
            children && /* @__PURE__ */ jsx61("div", { className: "mt-8 pt-8 border-t border-[var(--token-muted)]/10", children })
          ] })
        ] }),
        /* @__PURE__ */ jsxs39("div", { className: "col-span-1 md:col-span-2 lg:col-span-4 row-span-3 bg-[var(--token-text)] rounded-[32px] md:rounded-[40px] p-8 text-[var(--token-background)] relative flex flex-col justify-between overflow-hidden shadow-2xl", children: [
          /* @__PURE__ */ jsx61("div", { className: "absolute top-0 left-0 w-full h-full bg-[linear-gradient(225deg,rgba(255,255,255,0.05),transparent)]" }),
          /* @__PURE__ */ jsxs39("div", { className: "relative z-10", children: [
            /* @__PURE__ */ jsx61(Zap2, { className: "w-8 h-8 text-[var(--token-accent)] mb-4" }),
            /* @__PURE__ */ jsxs39("div", { className: "text-4xl font-black mb-1", children: [
              "0.03",
              /* @__PURE__ */ jsx61("span", { className: "text-[var(--token-muted)] text-lg ml-1 font-medium", children: "ms" })
            ] }),
            /* @__PURE__ */ jsx61("div", { className: "text-[11px] font-bold uppercase tracking-widest text-[var(--token-muted)]", children: "Tailwind JIT Latency" })
          ] }),
          /* @__PURE__ */ jsx61("div", { className: "relative z-10 h-[100px] w-full bg-white/5 rounded-2xl border border-white/5 flex items-end p-4 gap-1.5 backdrop-blur-sm", children: [40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => /* @__PURE__ */ jsx61("div", { className: "flex-1 bg-[var(--token-primary)]/40 rounded-t-sm transition-all duration-1000", style: { height: `${h}%` } }, i)) })
        ] }),
        /* @__PURE__ */ jsxs39(
          "div",
          {
            className: "col-span-1 md:col-span-8 md:row-span-4 backdrop-blur-2xl p-10 flex flex-col justify-between group",
            style: {
              backgroundColor: "rgba(9, 9, 11, 0.4)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "32px",
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ jsx61("div", { className: "w-16 h-16 bg-[var(--token-muted)]/5 border border-[var(--token-muted)]/10 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-inner", children: /* @__PURE__ */ jsx61(Globe2, { className: "w-8 h-8 text-[var(--token-text)]" }) }),
              /* @__PURE__ */ jsx61("div", { className: "text-lg font-bold text-[var(--token-text)]", children: "Edge Ready" }),
              /* @__PURE__ */ jsx61("p", { className: "text-[11px] text-[var(--token-muted)] mt-1 max-w-[120px]", children: "Deployed to 4,200+ nodes globally." })
            ]
          }
        ),
        /* @__PURE__ */ jsxs39("div", { className: "col-span-1 md:col-span-4 lg:col-span-8 row-span-2 bg-[var(--token-primary)]/5 border border-[var(--token-primary)]/10 rounded-[32px] md:rounded-[40px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxs39("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsx61("div", { className: "w-16 h-16 bg-[var(--token-background)] rounded-3xl shadow-lg border border-[var(--token-primary)]/10 flex items-center justify-center", children: /* @__PURE__ */ jsx61(Shield2, { className: "w-8 h-8 text-[var(--token-primary)]" }) }),
            /* @__PURE__ */ jsxs39("div", { className: "text-center sm:text-left", children: [
              /* @__PURE__ */ jsx61("h3", { className: "text-xl font-bold text-[var(--token-text)] mb-1", children: "Encryption Protocol v4" }),
              /* @__PURE__ */ jsx61("p", { className: "text-sm text-[var(--token-muted)]", children: "All style assets are signed with SHA-256 for integrity." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs39("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsx61("div", { className: "px-4 py-2 bg-[var(--token-background)] rounded-full text-[10px] font-black text-[var(--token-primary)] border border-[var(--token-primary)]/20 uppercase tracking-widest shadow-sm", children: "Compliant" }),
            /* @__PURE__ */ jsx61("div", { className: "px-4 py-2 bg-[var(--token-background)] rounded-full text-[10px] font-black text-[var(--token-primary)] border border-[var(--token-primary)]/20 uppercase tracking-widest shadow-sm", children: "Audited" })
          ] })
        ] })
      ] })
    }
  );
});
export {
  Accordion,
  AddToCartButton,
  AlertDialog,
  Avatar,
  Badge,
  CanvasBento2 as BentoBoxLegacy,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  CanvasBento,
  CanvasButton,
  CanvasCheckbox,
  CanvasHeader,
  CanvasInput,
  CanvasLayout,
  CanvasSwitch,
  CanvasText,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardWrapper,
  CartBadge,
  CartProvider,
  Checkbox,
  Collapsible,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  Dialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuTrigger,
  Footer,
  FooterBar,
  Form,
  Heading,
  Hero_default as Hero,
  HeroSubtitle_default as HeroSubtitle,
  HeroTitle_default as HeroTitle,
  HoverCard,
  ImagePlaceholder,
  Input,
  Label,
  LayoutBox,
  Link,
  Menubar,
  NavBar,
  Navbar,
  NavigationMenu,
  Pagination,
  Paragraph,
  Popover,
  RadioGroup,
  Section,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  Slider,
  StickyHeader,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Text,
  Textarea,
  Toast,
  Toggle,
  ToggleGroup,
  Tooltip,
  badgeVariants,
  buttonVariants,
  getSafeCatalog,
  useCart
};
