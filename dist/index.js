"use client";
"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

// src/components/Text.tsx
var _designtokens = require('@FastIntent/design-tokens');
var _jsxruntime = require('react/jsx-runtime');
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
    color: color || _designtokens.colors.text.body,
    ...color && { color }
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
    "@FastIntent/design-tokens": "1.0.0"
  }
};

// src/components/AddToCartButton/AddToCartButton.tsx
var _framermotion = require('framer-motion');

// src/context/CartContext.tsx
var _react = require('react'); var _react2 = _interopRequireDefault(_react);

var CartContext = _react.createContext.call(void 0, void 0);
var CartProvider = ({ children }) => {
  const [items, setItems] = _react.useState.call(void 0, []);
  _react.useEffect.call(void 0, () => {
    const saved = localStorage.getItem("intent_cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
  }, []);
  _react.useEffect.call(void 0, () => {
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, CartContext.Provider, { value: { items, addItem, removeItem, clearCart, totalItems, totalPrice }, children });
};
var useCart = () => {
  if (typeof window !== "undefined" && window.__INTENT_CART_BRIDGE__) {
    return window.__INTENT_CART_BRIDGE__.useCart();
  }
  const context = _react.useContext.call(void 0, CartContext);
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
      id: _nullishCoalesce(productId, () => ( crypto.randomUUID())),
      name: text,
      price,
      quantity: 1
    });
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    _framermotion.motion.button,
    {
      id: "ui-atc-parent",
      onClick: handleClick,
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 },
      className: "flex w-fit items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-bold transition-all duration-300 mx-auto sm:mx-0",
      style: { backgroundColor: color },
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { children: text }),
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
    importPath: "@FastIntent/ui"
  },
  consumesContext: {
    hookName: "useCart",
    importPath: "@FastIntent/ui",
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



var Hero = ({
  children,
  backgroundColor = _designtokens.colors.background.dark,
  // 💎 Usando tokens
  as,
  ...props
}) => {
  const Component = as || "section";
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    Component,
    {
      id: "ui-hero-parent",
      className: "relative w-full min-h-[500px] flex flex-col items-center justify-center text-center overflow-hidden",
      style: {
        backgroundColor,
        padding: _designtokens.spacing.lg
        // 💎 Usando tokens
      },
      ...props,
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          _framermotion.motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 0.1 },
            className: "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none"
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "div",
          {
            className: "relative z-10 max-w-4xl w-full flex flex-col items-center",
            style: { gap: _designtokens.spacing.md },
            children: children || /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-zinc-500 italic", children: "Arrastra tus slots aqu\xED..." })
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
    "@FastIntent/design-tokens": "1.0.0"
  }
};
var Hero_default = Hero;

// src/components/Hero/HeroTitle.tsx


var HeroTitle = ({
  text = "Building the Future",
  color = "#ffffff"
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.h1,
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


var HeroSubtitle = ({
  text = "Unleash your creativity.",
  color = "#a1a1aa"
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    _framermotion.motion.p,
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
    padding: `${_designtokens.spacing.lg} ${_designtokens.spacing.md}`,
    borderColor: _designtokens.colors.background.subtle,
    gap: _designtokens.spacing.xl
  };
  const fallbackClasses = `
    ${!backgroundColor ? "bg-zinc-950" : ""}
    ${!textColor ? "text-white" : ""}
  `;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    Component,
    {
      id: "ui-footer-parent",
      className: `w-full flex flex-col items-center border-t overflow-hidden ${fallbackClasses}`,
      style,
      ...domProps,
      children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "w-full max-w-6xl flex flex-wrap justify-between gap-8", children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex flex-col", style: { gap: _designtokens.spacing.sm }, children: [
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "text-2xl font-black tracking-tighter flex items-center gap-2", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm", children: "F" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { children: logo || "FastIntent" })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "max-w-xs text-sm opacity-60 leading-relaxed font-medium", children: "Building the next generation of SaaS products with a visual-first approach." })
          ] }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex gap-16 flex-wrap", children: children || /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex gap-16", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h4", { className: "font-bold text-sm uppercase tracking-widest opacity-40", children: "Producto" }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "ul", { className: "flex flex-col gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "li", { className: "cursor-pointer hover:opacity-50 transition-opacity", children: "Caracter\xEDsticas" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "li", { className: "cursor-pointer hover:opacity-50 transition-opacity", children: "Precios" })
            ] })
          ] }) }) })
        ] }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
          "div",
          {
            className: "w-full max-w-6xl flex justify-between items-center text-[11px] font-bold uppercase tracking-widest border-t opacity-70",
            style: {
              paddingTop: _designtokens.spacing.md,
              borderColor: "inherit"
            },
            children: [
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "span", { children: [
                "\xA9 ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " ",
                companyName
              ] }),
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex space-x-6", children: [
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "cursor-pointer hover:opacity-100 transition-opacity", children: "Privacy Policy" }),
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "cursor-pointer hover:opacity-100 transition-opacity", children: "Terms of Service" })
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
    "@FastIntent/design-tokens": "1.0.0"
  }
};

// src/components/CartBadge/CartBadge.tsx

var CartBadge = ({
  color = "#dc2626"
}) => {
  const { totalItems } = useCart();
  const displayCount = totalItems;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      id: "ui-cart-badge",
      className: "relative flex items-center justify-center w-10 h-10 bg-white shadow-sm border border-zinc-100 rounded-full cursor-pointer hover:bg-zinc-50 transition-all duration-300",
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "svg",
          {
            className: "w-5 h-5 text-zinc-900",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 11V7a4 4 0 118 0v4M5 9h14l1 12H4L5 9z" })
          }
        ),
        displayCount > 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
    importPath: "@FastIntent/ui"
  },
  consumesContext: {
    hookName: "useCart",
    importPath: "@FastIntent/ui",
    fields: ["totalItems"]
  },
  propControls: [
    { name: "color", label: "Color Badge", type: "color", defaultValue: "#dc2626" }
  ]
};

// src/components/CardWrapper.tsx


// src/lib/utils.ts
var _clsx = require('clsx');
var _tailwindmerge = require('tailwind-merge');
function cn(...inputs) {
  return _tailwindmerge.twMerge.call(void 0, _clsx.clsx.call(void 0, inputs));
}

// src/components/CardWrapper.tsx

var CardWrapper = _react.forwardRef.call(void 0, 
  ({ className, children, backgroundColor, textColor, shadow, radius, style, as, cartCount, ...allProps }, ref) => {
    const domProps = sanitizeProps(allProps, CardWrapper.meta);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
        importPath: "@FastIntent/ui",
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

var _lucidereact = require('lucide-react');

// src/utils/cn.ts


function cn2(...inputs) {
  return _tailwindmerge.twMerge.call(void 0, _clsx.clsx.call(void 0, inputs));
}

// src/components/Elements/CanvasBento.tsx

var CanvasBento = _react.forwardRef.call(void 0, ({ className, style, children, ...props }, ref) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      ref,
      ...props,
      style,
      className: cn2("w-full box-border p-[40px_20px] md:p-[60px_20px] bg-[var(--token-background)] border border-[var(--token-border)] rounded-[32px] md:rounded-[48px] overflow-hidden transition-colors duration-500", className),
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 md:grid-rows-6 gap-6 min-h-[1200px] md:h-[700px]", children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "col-span-1 md:col-span-4 lg:col-span-8 row-span-4 bg-[var(--token-background)] border border-[var(--token-border)] rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,var(--token-accent),transparent_70%)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000" }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-fit p-[8px_16px] bg-[var(--token-accent)]/5 border border-[var(--token-accent)]/10 rounded-full mb-8", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.Sparkles, { className: "w-3.5 h-3.5 text-[var(--token-accent)] animate-pulse" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-[10px] font-black uppercase tracking-[0.15em] text-[var(--token-accent)]", children: "Stress Test Active" })
            ] }) }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "h2", { className: "text-3xl md:text-5xl font-black text-[var(--token-text)] leading-[1.1] tracking-[-0.03em] mb-6", children: [
              "Pushing the ",
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "br", {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-[var(--token-accent)] via-pink-500 to-purple-600", children: "Compiler Limits." })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-[var(--token-muted)] max-w-sm text-sm leading-relaxed mb-10", children: "This component uses arbitrary multi-values, responsive prefixes, and nested glassmorphism to validate the robustness of the SaaS Hybrid Styler." }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-auto flex flex-col sm:flex-row items-center gap-4", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "button", { className: "w-full sm:w-auto p-[14px_28px] bg-[var(--token-text)] text-[var(--token-background)] rounded-2xl font-bold text-sm shadow-xl shadow-black/5 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3", children: [
              "View Benchmarks ",
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.ArrowRight, { className: "w-4 h-4" })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "col-span-1 md:col-span-2 lg:col-span-4 row-span-3 bg-[var(--token-text)] rounded-[32px] md:rounded-[40px] p-8 text-[var(--token-background)] relative flex flex-col justify-between overflow-hidden shadow-2xl", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative z-10", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.Zap, { className: "w-8 h-8 text-[var(--token-accent)] mb-4" }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "text-4xl font-black mb-1", children: [
            "0.03",
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-[var(--token-background)]/40 text-lg ml-1 font-medium", children: "ms" })
          ] }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "text-[11px] font-bold uppercase tracking-widest text-[var(--token-background)]/40", children: "Tailwind JIT Latency" })
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


var CanvasButton = _react.forwardRef.call(void 0, 
  ({ className, style, content, children, ...props }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
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


var CanvasCheckbox = ({
  content,
  styles,
  props,
  "props.checked": _px,
  // Capturamos la prop "leakeada" del editor
  className,
  ...rest
}) => {
  const isChecked = _nullishCoalesce(_optionalChain([props, 'optionalAccess', _ => _.checked]), () => ( true));
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: cn2("flex items-center gap-2 px-1 py-1", className), style: styles, ...rest, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn2(
      "w-5 h-5 rounded-md border flex items-center justify-center transition-all",
      isChecked ? "bg-blue-500 border-blue-500 text-white" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
    ), children: isChecked && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.Check, { size: 12, strokeWidth: 3 }) }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none", children: content || "Checkbox label" })
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


// src/components/Elements/CanvasLayout.tsx


var CanvasLayout = _react.forwardRef.call(void 0, 
  ({ className, children, style, ...props }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


var CanvasText = _react.forwardRef.call(void 0, 
  ({ className, style, content, children, ...props }, ref) => {
    const mergedStyle = {
      display: "block",
      ...style
    };
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
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

var CanvasHeader = _react.forwardRef.call(void 0, 
  ({ className, style, content, children, props, ...rest }, ref) => {
    const logoText = _optionalChain([props, 'optionalAccess', _2 => _2.logoText]) || "ACME Corp";
    const links = _optionalChain([props, 'optionalAccess', _3 => _3.links]) || ["Features", "Pricing"];
    const buttonText = _optionalChain([props, 'optionalAccess', _4 => _4.buttonText]) || "Sign in";
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      CanvasLayout,
      {
        ref,
        className: cn2("custom-header !flex flex-row justify-between items-center px-4 py-4 bg-[var(--token-background)] border-b border-[var(--token-border)] md:px-8 md:py-4 transition-all", className),
        style,
        ...rest,
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, CanvasText, { style: { fontWeight: 800, color: "var(--token-text)", width: "auto" }, className: "text-[16px] md:text-[24px]", children: logoText }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, CanvasLayout, { style: { display: "flex", alignItems: "center", padding: 0, minHeight: 0, border: "none" }, className: "flex-row gap-4 md:gap-8", children: [
            links.map((link) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, CanvasText, { style: { color: "var(--token-muted)", fontWeight: 500 }, className: "text-[12px] md:text-[14px]", children: link }, link)),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, CanvasButton, { style: { backgroundColor: "var(--token-text)", color: "var(--token-background)", borderRadius: 8, fontWeight: 600, border: "none" }, className: "text-[12px] md:text-[18px] px-3 py-2 md:px-4 md:py-2", children: buttonText })
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn2("w-full h-auto", className), style: styles, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "input",
    {
      type: "text",
      placeholder: _optionalChain([props, 'optionalAccess', _5 => _5.placeholder]) || "Type something...",
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

var CanvasSwitch = ({
  content,
  styles,
  props,
  "props.active": _px,
  className,
  ...rest
}) => {
  const isOn = _nullishCoalesce(_optionalChain([props, 'optionalAccess', _6 => _6.active]), () => ( true));
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: cn2("flex items-center gap-3 py-1 px-1", className), style: styles, ...rest, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn2(
      "relative w-9 h-5 rounded-full transition-all duration-300",
      isOn ? "bg-blue-500 shadow-inner" : "bg-zinc-200 dark:bg-zinc-800"
    ), children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: cn2(
      "absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300 transform",
      isOn ? "translate-x-4 shadow-md scale-110" : ""
    ) }) }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none", children: content || "Toggle switch" })
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

// src/components/Navbar.tsx


var Navbar = _react.forwardRef.call(void 0, 
  ({ logoText = "ACME Corp", links = ["Features", "Pricing"], ctaText = "Sign in", className, style, children, ...props }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
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
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "font-extrabold text-zinc-900 text-base md:text-2xl tracking-tighter shrink-0", children: logoText }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-4 md:gap-8 grow justify-end", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "hidden md:flex gap-8 px-8 items-center", children: _optionalChain([links, 'optionalAccess', _7 => _7.map, 'call', _8 => _8((link, idx) => {
              const label = typeof link === "string" ? link : link.label;
              const href = typeof link === "string" ? "#" : link.href;
              return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
                "a",
                {
                  href,
                  className: "text-zinc-500 font-bold text-xs cursor-pointer hover:text-zinc-900 transition-colors uppercase tracking-widest no-underline",
                  children: label
                },
                idx
              );
            })]) }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { className: "bg-zinc-900 text-white text-xs md:text-sm px-4 py-2.5 rounded-[12px] font-bold hover:bg-zinc-700 transition-all active:scale-95 shadow-sm", children: ctaText }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex items-center gap-2 empty:hidden border-l border-zinc-100 pl-4 ml-2", children })
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


var Button = _react2.default.forwardRef(
  ({ className, variant = "default", size = "default", content, children, ...props }, ref) => {
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    };
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    };
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        className: `inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`,
        ref,
        ...props,
        children: content || children
      }
    );
  }
);
Button.displayName = "Button";
Button.meta = {
  type: "ui_shadcn_button",
  name: "Button (Atomic)",
  version: "1.0.0",
  category: "Actions",
  description: "Standard Shadcn Button with variant support.",
  propControls: [
    { name: "content", label: "Text content", type: "string" },
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


var Toggle = ({
  content = "Toggle",
  pressed: controlledPressed,
  variant = "default",
  size = "default",
  className = ""
}) => {
  const [internalPressed, setInternalPressed] = _react.useState.call(void 0, false);
  const isPressed = _nullishCoalesce(controlledPressed, () => ( internalPressed));
  const sizeClasses = {
    sm: "h-8 px-2 text-xs",
    default: "h-10 px-3 text-sm",
    lg: "h-11 px-4 text-sm"
  };
  const baseClasses = `inline-flex items-center justify-center rounded-md font-medium transition-colors ${sizeClasses[size]}`;
  const variantClasses = isPressed ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white" : variant === "outline" ? "border border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800" : "bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800";
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


var ToggleGroup = ({
  items = ["Bold", "Italic", "Underline"],
  type = "multiple",
  variant = "outline",
  size = "default",
  defaultValue = [],
  className = ""
}) => {
  const [selected, setSelected] = _react.useState.call(void 0, new Set(defaultValue));
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 ${className}`, children: items.map((item, i) => {
    const isActive = selected.has(item);
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ...rest, className: `relative inline-flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-medium overflow-hidden shrink-0 ${sizes[size]} ${className}`, children: src ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "img", { src, alt, className: "w-full h-full object-cover" }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { children: initials }) });
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

var Badge = ({
  content,
  variant = "default",
  className = "",
  ...rest
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300",
    destructive: "bg-destructive text-destructive-foreground"
  };
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { ...rest, className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`, children: content });
};
Badge.displayName = "Badge";
Badge.meta = {
  type: "ui_shadcn_badge",
  name: "Badge (Atomic)",
  version: "1.0.0",
  category: "Data Display",
  description: "A small label badge for tags, status, or categories.",
  propControls: [
    { name: "content", label: "Text", type: "string" },
    {
      name: "variant",
      label: "Variant",
      type: "select",
      options: ["default", "secondary", "outline", "destructive"]
    }
  ]
};

// src/components/Primitives/DataDisplay/Card.tsx

var Card = ({
  title,
  description,
  image,
  badge,
  footer,
  children,
  className = "",
  ...rest
}) => {
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { ...rest, className: `rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm overflow-hidden ${className}`, children: [
    image && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-full h-48 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-sm", children: image }),
      badge && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "absolute top-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded", children: badge })
    ] }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "p-4 flex flex-col gap-2", children: [
      title && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: "font-semibold text-zinc-900 dark:text-white", children: title }),
      description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-sm text-zinc-500 dark:text-zinc-400", children: description }),
      children
    ] }),
    footer && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500", children: footer })
  ] });
};
Card.displayName = "Card";
Card.meta = {
  type: "ui_shadcn_card",
  name: "Card (Atomic)",
  version: "1.0.0",
  category: "Layout",
  isSlot: true,
  isContainer: true,
  description: "A card container with optional image, title, description, badge, and footer.",
  propControls: [
    { name: "title", label: "Title", type: "string" },
    { name: "description", label: "Description", type: "string" },
    { name: "image", label: "Image placeholder", type: "string" },
    { name: "badge", label: "Badge text", type: "string" },
    { name: "footer", label: "Footer text", type: "string" }
  ]
};

// src/components/Primitives/DataDisplay/Table.tsx

var Table = ({
  columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" }
  ],
  data = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { name: "Bob Wilson", email: "bob@example.com", role: "Viewer" }
  ],
  striped = true,
  className = "",
  ...rest
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ...rest, className: `w-full overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-800 ${className}`, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "thead", { children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "tr", { className: "border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900", children: columns.map((col) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "th", { className: "px-4 py-3 text-left font-medium text-zinc-500 dark:text-zinc-400", children: col.header }, col.accessor)) }) }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "tbody", { children: data.map((row, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "tr",
      {
        className: `border-b border-zinc-200 dark:border-zinc-800 last:border-0 ${striped && i % 2 === 1 ? "bg-zinc-50/50 dark:bg-zinc-900/50" : ""}`,
        children: columns.map((col) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "td", { className: "px-4 py-3 text-zinc-900 dark:text-zinc-100", children: row[col.accessor] || "" }, col.accessor))
      },
      i
    )) })
  ] }) });
};
Table.displayName = "Table";
Table.meta = {
  type: "table",
  name: "Table",
  version: "1.0.0",
  category: "DataDisplay",
  description: "Data table with columns, rows, and optional striping.",
  propControls: [
    { name: "striped", label: "Striped", type: "boolean" }
  ]
};

// src/components/Primitives/Inputs/Checkbox.tsx

var Checkbox = ({
  label,
  checked,
  onCheckedChange,
  className = ""
}) => {
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `flex items-center space-x-2 ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "input",
      {
        type: "checkbox",
        checked,
        onChange: (e) => _optionalChain([onCheckedChange, 'optionalCall', _9 => _9(e.target.checked)]),
        className: "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
      }
    ),
    label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "label", { className: "text-sm font-medium leading-none", children: label })
  ] });
};
Checkbox.meta = {
  type: "ui_shadcn_checkbox",
  name: "Checkbox (Atomic)",
  version: "1.0.0",
  category: "Forms",
  description: "Standard Shadcn Checkbox for form atomic building.",
  propControls: [
    { name: "label", label: "Label text", type: "string" },
    { name: "checked", label: "Is checked?", type: "boolean" }
  ]
};

// src/components/Primitives/Inputs/Combobox.tsx


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
  const [open, setOpen] = _react.useState.call(void 0, false);
  const [query, setQuery] = _react.useState.call(void 0, "");
  const [selected, setSelected] = _react.useState.call(void 0, defaultValue || "");
  const filtered = _react.useMemo.call(void 0, 
    () => options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );
  const selectedLabel = _optionalChain([options, 'access', _10 => _10.find, 'call', _11 => _11((o) => o.value === selected), 'optionalAccess', _12 => _12.label]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "label", { className: "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5", children: label }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
      open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 z-40", onClick: () => {
          setOpen(false);
          setQuery("");
        } }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute top-full left-0 z-50 mt-1 w-full max-h-60 overflow-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-1 shadow-md", children: filtered.length === 0 ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-3 py-2 text-sm text-zinc-500", children: "No results found" }) : filtered.map((opt) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


var Form = _react2.default.forwardRef(
  ({ title, description, children, className, ...props }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
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
          (title || description) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "space-y-1.5 mb-4", children: [
            title && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: "text-2xl font-semibold leading-none tracking-tight", children: title }),
            description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-sm text-muted-foreground", children: description })
          ] }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "space-y-4", children })
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


var Input = _react2.default.forwardRef(
  ({ label, description, className, type, children, ...props }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "w-full space-y-1.5", children: [
      label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "input",
        {
          type,
          className: `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`,
          ref,
          ...props
        }
      ),
      description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-xs text-muted-foreground", children: description })
    ] });
  }
);
Input.displayName = "Input";
Input.meta = {
  type: "ui_shadcn_input",
  name: "Input (Atomic)",
  version: "1.0.0",
  category: "Forms",
  description: "Standard Shadcn Input for atomic form building.",
  propControls: [
    { name: "placeholder", label: "Placeholder", type: "string" },
    { name: "label", label: "Label", type: "string" },
    { name: "description", label: "Description", type: "string" },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["text", "password", "email", "number", "tel", "url"]
    }
  ]
};

// src/components/Primitives/Inputs/RadioGroup.tsx


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
  const [selected, setSelected] = _react.useState.call(void 0, defaultValue || _optionalChain([options, 'access', _13 => _13[0], 'optionalAccess', _14 => _14.value]));
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "fieldset", { className: `${className}`, children: [
    label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "legend", { className: "text-sm font-medium text-zinc-900 dark:text-white mb-3", children: label }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `flex ${orientation === "vertical" ? "flex-col gap-2" : "flex-row gap-4"}`, children: options.map((opt) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "label", { className: "flex items-center gap-2 cursor-pointer", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "div",
        {
          onClick: () => setSelected(opt.value),
          className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selected === opt.value ? "border-primary" : "border-zinc-300 dark:border-zinc-700"}`,
          children: selected === opt.value && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-2 h-2 rounded-full bg-primary" })
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-sm text-zinc-700 dark:text-zinc-300", children: opt.label })
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


var Select = ({
  label,
  placeholder = "Select an option",
  options = [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" },
    { label: "Option 3", value: "opt3" }
  ],
  defaultValue,
  className = ""
}) => {
  const [open, setOpen] = _react.useState.call(void 0, false);
  const [selected, setSelected] = _react.useState.call(void 0, defaultValue || "");
  const selectedLabel = _optionalChain([options, 'access', _15 => _15.find, 'call', _16 => _16((o) => o.value === selected), 'optionalAccess', _17 => _17.label]);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `w-full ${className}`, children: [
    label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "label", { className: "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5", children: label }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative", children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "button",
        {
          type: "button",
          onClick: () => setOpen(!open),
          className: "flex w-full items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm transition-colors hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary/20",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: selectedLabel ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400", children: selectedLabel || placeholder }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { className: "h-4 w-4 text-zinc-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
          ]
        }
      ),
      open && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 z-40", onClick: () => setOpen(false) }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute top-full left-0 z-50 mt-1 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-1 shadow-md", children: options.map((opt) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "button",
          {
            onClick: () => {
              setSelected(opt.value);
              setOpen(false);
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
Select.displayName = "Select";
Select.meta = {
  type: "select",
  name: "Select",
  version: "1.0.0",
  category: "Inputs",
  description: "Dropdown select with custom styling.",
  propControls: [
    { name: "label", label: "Label", type: "text" },
    { name: "placeholder", label: "Placeholder", type: "text" }
  ]
};

// src/components/Primitives/Inputs/Slider.tsx


var Slider = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  showValue = true,
  className = ""
}) => {
  const [value, setValue] = _react.useState.call(void 0, defaultValue);
  const pct = (value - min) / (max - min) * 100;
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `w-full ${className}`, children: [
    (label || showValue) && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center justify-between mb-2", children: [
      label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300", children: label }),
      showValue && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-sm text-zinc-500 dark:text-zinc-400", children: value })
    ] }),
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "div",
        {
          className: "absolute h-full rounded-full bg-primary transition-all",
          style: { width: `${pct}%` }
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


var Switch = ({
  label,
  checked: controlledChecked,
  onCheckedChange,
  disabled = false,
  className = ""
}) => {
  const [internalChecked, setInternalChecked] = _react.useState.call(void 0, false);
  const isChecked = _nullishCoalesce(controlledChecked, () => ( internalChecked));
  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    _optionalChain([onCheckedChange, 'optionalCall', _18 => _18(next)]);
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "label", { className: `flex items-center gap-3 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": isChecked,
        disabled,
        onClick: toggle,
        className: `relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${isChecked ? "bg-primary" : "bg-zinc-200 dark:bg-zinc-800"}`,
        children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
          "span",
          {
            className: `pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ${isChecked ? "translate-x-5" : "translate-x-0"}`
          }
        )
      }
    ),
    label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-sm font-medium text-zinc-700 dark:text-zinc-300", children: label })
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


var Textarea = _react2.default.forwardRef(
  ({ label, description, className, ...props }, ref) => {
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "w-full space-y-1.5", children: [
      label && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "label", { className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: label }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
      description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-xs text-muted-foreground", children: description })
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

var FooterBar = ({
  brand,
  copyright,
  children,
  className = "",
  ...rest
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "footer", { ...rest, className: `w-full bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 ${className}`, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "max-w-6xl mx-auto px-6 py-12", children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex flex-col md:flex-row gap-8", children: [
      brand && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex flex-col gap-2 md:w-1/3", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "font-bold text-lg text-zinc-900 dark:text-white", children: brand }) }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex-1 flex flex-wrap gap-8", children })
    ] }),
    copyright && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500", children: copyright })
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, Tag, { ...rest, className: `text-zinc-900 dark:text-white ${sizes[level]} ${alignClass[align]} ${className}`, children: content });
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
    return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ...rest, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "img",
      {
        src,
        alt,
        className: `w-full object-cover ${ratios[aspectRatio]} ${roundedClasses[rounded]} ${className}`
      }
    ) });
  }
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ...rest, className: `w-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 ${ratios[aspectRatio]} ${roundedClasses[rounded]} ${className}`, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ry: "2" }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "circle", { cx: "8.5", cy: "8.5", r: "1.5" }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { d: "M21 15l-5-5L5 21" })
    ] }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-xs", children: alt })
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ...rest, className: cn2(baseClass, "min-h-[40px]", className), style, children });
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "a", { ...rest, href, className: `${variants[variant]} ${className}`, children: content });
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

var NavBar = ({
  brand = "",
  children,
  sticky = true,
  className = "",
  ...rest
}) => {
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "nav", { ...rest, className: `w-full flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 ${sticky ? "sticky top-0 z-50" : ""} ${className}`, children: [
    brand && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "font-bold text-lg text-zinc-900 dark:text-white shrink-0", children: brand }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex items-center gap-4 flex-1 justify-end", children })
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { ...rest, className: `leading-relaxed ${sizes[size]} ${colorClass} ${alignClass[align]} ${className}`, children: content });
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "section", { ...rest, className: `w-full ${bgClasses[background]} ${paddingClasses[paddingY]} ${className}`, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]}`, children }) });
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

var Separator = ({
  orientation = "horizontal",
  className = "",
  ...rest
}) => {
  return orientation === "horizontal" ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ...rest, className: `w-full h-px bg-zinc-200 dark:bg-zinc-800 ${className}`, role: "separator" }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { ...rest, className: `h-full w-px bg-zinc-200 dark:bg-zinc-800 ${className}`, role: "separator" });
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

var Breadcrumb = ({
  items = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Current Page" }
  ],
  separator = "/",
  className = ""
}) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "nav", { "aria-label": "Breadcrumb", className: `${className}`, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "ol", { className: "flex items-center gap-1.5 text-sm", children: items.map((item, i) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "li", { className: "flex items-center gap-1.5", children: [
    i > 0 && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-zinc-400 dark:text-zinc-600", children: separator }),
    item.href && i < items.length - 1 ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "a", { href: item.href, className: "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors", children: item.label }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-zinc-900 dark:text-white font-medium", children: item.label })
  ] }, i)) }) });
};
Breadcrumb.displayName = "Breadcrumb";
Breadcrumb.meta = {
  type: "breadcrumb",
  name: "Breadcrumb",
  version: "1.0.0",
  category: "Navigation",
  description: "Breadcrumb navigation trail.",
  propControls: [
    { name: "separator", label: "Separator", type: "text" }
  ]
};

// src/components/Primitives/Navigation/Pagination.tsx


var Pagination = ({
  totalPages = 10,
  defaultPage = 1,
  className = ""
}) => {
  const [current, setCurrent] = _react.useState.call(void 0, defaultPage);
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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "nav", { className: `flex items-center gap-1 ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        disabled: current <= 1,
        onClick: () => setCurrent((p) => Math.max(1, p - 1)),
        className: `${btnBase} border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 text-zinc-700 dark:text-zinc-300`,
        children: "\u2039"
      }
    ),
    getPages().map(
      (page, i) => page === "..." ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "px-1 text-zinc-400", children: "..." }, `dots-${i}`) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "button",
        {
          onClick: () => setCurrent(page),
          className: `${btnBase} ${current === page ? "bg-primary text-primary-foreground" : "border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`,
          children: page
        },
        page
      )
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
  const [internalOpen, setInternalOpen] = _react.useState.call(void 0, false);
  const isOpen = _nullishCoalesce(controlledOpen, () => ( internalOpen));
  const confirmClasses = variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700" : "bg-primary text-primary-foreground hover:bg-primary/90";
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: () => setInternalOpen(true),
        className: `inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors ${variant === "destructive" ? "bg-red-600 text-white hover:bg-red-700" : "bg-primary text-primary-foreground hover:bg-primary/90"}`,
        children: trigger
      }
    ),
    isOpen && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 bg-black/80" }),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `relative z-50 w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg ${className}`, children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h2", { className: "text-lg font-semibold text-zinc-900 dark:text-white", children: title }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "mt-2 text-sm text-zinc-500 dark:text-zinc-400", children: description }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "mt-6 flex justify-end gap-2", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "button",
            {
              onClick: () => setInternalOpen(false),
              className: "inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white",
              children: cancelText
            }
          ),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


var Toast = ({
  title = "Notification",
  description,
  variant = "default",
  duration = 5e3,
  open: controlledOpen = true,
  className = ""
}) => {
  const [visible, setVisible] = _react.useState.call(void 0, controlledOpen);
  _react.useEffect.call(void 0, () => {
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `fixed bottom-4 right-4 z-50 w-[360px] rounded-lg border p-4 shadow-lg ${variantClasses[variant]} ${className}`, children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-start justify-between gap-2", children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-sm font-semibold text-zinc-900 dark:text-white", children: title }),
      description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "mt-1 text-sm text-zinc-500 dark:text-zinc-400", children: description })
    ] }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { onClick: () => setVisible(false), className: "text-zinc-400 hover:text-zinc-600 transition-colors", children: "\u2715" })
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


var Tooltip = ({
  content = "Tooltip text",
  side = "top",
  children,
  className = ""
}) => {
  const [visible, setVisible] = _react.useState.call(void 0, false);
  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      className: "relative inline-block",
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      children: [
        children || /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { className: "inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white", children: "Hover me" }),
        visible && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `absolute z-50 ${sideClasses[side]} px-3 py-1.5 rounded-md bg-zinc-900 dark:bg-zinc-50 text-xs text-white dark:text-zinc-900 shadow-md whitespace-nowrap ${className}`, children: content })
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


var Accordion = ({
  items = [
    { title: "Is this accessible?", content: "Yes. It follows the WAI-ARIA design pattern." },
    { title: "Is it styled?", content: "Yes. It comes with default styles that match the other components." },
    { title: "Is it animated?", content: "Yes. It uses CSS transitions for smooth open/close animations." }
  ],
  type = "single",
  className = ""
}) => {
  const [openItems, setOpenItems] = _react.useState.call(void 0, /* @__PURE__ */ new Set());
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
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `w-full divide-y divide-zinc-200 dark:divide-zinc-800 border-b border-zinc-200 dark:border-zinc-800 ${className}`, children: items.map((item, i) => {
    const isOpen = openItems.has(i);
    return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { children: [
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "button",
        {
          onClick: () => toggle(i),
          className: "flex w-full items-center justify-between py-4 text-left text-sm font-medium text-zinc-900 dark:text-white hover:underline transition-all",
          children: [
            item.title,
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
              "svg",
              {
                className: `h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "div",
        {
          className: `overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pb-4" : "max-h-0"}`,
          children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-sm text-zinc-500 dark:text-zinc-400", children: item.content })
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


var Collapsible = ({
  title = "Toggle content",
  open: controlledOpen,
  children,
  className = ""
}) => {
  const [internalOpen, setInternalOpen] = _react.useState.call(void 0, false);
  const isOpen = _nullishCoalesce(controlledOpen, () => ( internalOpen));
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `w-full rounded-md border border-zinc-200 dark:border-zinc-800 ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      "button",
      {
        onClick: () => setInternalOpen(!isOpen),
        className: "flex w-full items-center justify-between p-4 text-left text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors rounded-t-md",
        children: [
          title,
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
            "svg",
            {
              className: `h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `overflow-hidden transition-all duration-200 ${isOpen ? "max-h-[500px]" : "max-h-0"}`, children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "p-4 pt-0 text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800", children: children || "Collapsible content goes here." }) })
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

// src/components/Primitives/Structure/ContextMenu.tsx


var ContextMenu = ({
  items = [{ label: "Cut", shortcut: "\u2318X" }, { label: "Copy", shortcut: "\u2318C" }, { label: "Paste", shortcut: "\u2318V" }],
  children,
  className = ""
}) => {
  const [pos, setPos] = _react.useState.call(void 0, null);
  const handleContext = (e) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "div",
      {
        onContextMenu: handleContext,
        className: `min-h-[100px] rounded-md border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm text-zinc-500 ${className}`,
        children: children || "Right-click here"
      }
    ),
    pos && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 z-50", onClick: () => setPos(null) }),
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
        "div",
        {
          className: "fixed z-50 min-w-[8rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md",
          style: { left: pos.x, top: pos.y },
          children: items.map(
            (item, i) => item.separator ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "my-1 h-px bg-zinc-200 dark:bg-zinc-800" }, i) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
              "button",
              {
                onClick: () => setPos(null),
                className: "relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
                children: [
                  /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex-1 text-left", children: item.label }),
                  item.shortcut && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "ml-auto text-xs text-zinc-500", children: item.shortcut })
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


var Dialog = ({
  trigger = "Open",
  title = "Dialog Title",
  description,
  open: controlledOpen,
  children,
  className = ""
}) => {
  const [internalOpen, setInternalOpen] = _react.useState.call(void 0, false);
  const isOpen = _nullishCoalesce(controlledOpen, () => ( internalOpen));
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: () => setInternalOpen(true),
        className: "inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90 transition-colors",
        children: trigger
      }
    ),
    isOpen && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 bg-black/80", onClick: () => setInternalOpen(false) }),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `relative z-50 w-full max-w-lg rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-lg ${className}`, children: [
        title && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h2", { className: "text-lg font-semibold text-zinc-900 dark:text-white", children: title }),
        description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "mt-1.5 text-sm text-zinc-500 dark:text-zinc-400", children: description }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-4", children }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
  category: "Overlay",
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


var DropdownMenu = ({
  trigger = "Menu",
  items = [{ label: "Item 1" }, { label: "Item 2" }, { label: "Item 3" }],
  align = "start",
  className = ""
}) => {
  const [open, setOpen] = _react.useState.call(void 0, false);
  const ref = _react.useRef.call(void 0, null);
  _react.useEffect.call(void 0, () => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative inline-block", ref, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: () => setOpen(!open),
        className: "inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white",
        children: trigger
      }
    ),
    open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `absolute top-full mt-1 ${alignClasses[align]} z-50 min-w-[8rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md ${className}`, children: items.map(
      (item, i) => item.separator ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "my-1 h-px bg-zinc-200 dark:bg-zinc-800" }, i) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "button",
        {
          disabled: item.disabled,
          onClick: () => setOpen(false),
          className: "relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex-1 text-left", children: item.label }),
            item.shortcut && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "ml-auto text-xs text-zinc-500", children: item.shortcut })
          ]
        },
        i
      )
    ) })
  ] });
};
DropdownMenu.displayName = "DropdownMenu";
DropdownMenu.meta = {
  type: "dropdownmenu",
  name: "DropdownMenu",
  version: "1.0.0",
  category: "Navigation",
  isSlot: false,
  isContainer: false,
  description: "Dropdown menu with items, shortcuts, separators. For actions and navigation.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "align", label: "Alignment", type: "select", options: ["start", "center", "end"] }
  ]
};

// src/components/Primitives/Structure/HoverCard.tsx


var HoverCard = ({
  trigger = "Hover me",
  children,
  className = ""
}) => {
  const [open, setOpen] = _react.useState.call(void 0, false);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
    "div",
    {
      className: "relative inline-block",
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
      children: [
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-sm font-medium text-primary underline underline-offset-4 cursor-pointer", children: trigger }),
        open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 w-80 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-md ${className}`, children })
      ]
    }
  );
};
HoverCard.displayName = "HoverCard";
HoverCard.meta = {
  type: "hovercard",
  name: "HoverCard",
  version: "1.0.0",
  category: "Overlay",
  isSlot: true,
  isContainer: true,
  description: "Card that appears on hover. Great for user profiles, previews.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" }
  ]
};

// src/components/Primitives/Structure/Menubar.tsx


var Menubar = ({
  menus = [
    { label: "File", items: [{ label: "New" }, { label: "Open" }, { separator: true, label: "" }, { label: "Save", shortcut: "\u2318S" }] },
    { label: "Edit", items: [{ label: "Undo", shortcut: "\u2318Z" }, { label: "Redo", shortcut: "\u2318\u21E7Z" }] },
    { label: "View", items: [{ label: "Zoom In" }, { label: "Zoom Out" }] }
  ],
  className = ""
}) => {
  const [openIndex, setOpenIndex] = _react.useState.call(void 0, null);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `flex items-center space-x-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-sm ${className}`, children: menus.map((menu, idx) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative", children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: () => setOpenIndex(openIndex === idx ? null : idx),
        onMouseEnter: () => openIndex !== null && setOpenIndex(idx),
        className: `rounded-sm px-3 py-1.5 text-sm font-medium transition-colors ${openIndex === idx ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`,
        children: menu.label
      }
    ),
    openIndex === idx && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute left-0 top-full mt-1 z-50 min-w-[12rem] rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md", children: menu.items.map(
      (item, i) => item.separator ? /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "my-1 h-px bg-zinc-200 dark:bg-zinc-800" }, i) : /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
        "button",
        {
          onClick: () => setOpenIndex(null),
          className: "relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
          children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "flex-1 text-left", children: item.label }),
            item.shortcut && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "ml-auto text-xs text-zinc-500", children: item.shortcut })
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
  const [openIndex, setOpenIndex] = _react.useState.call(void 0, null);
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "nav", { className: `flex items-center space-x-1 ${className}`, children: items.map((item, idx) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "relative", children: item.children ? /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      "button",
      {
        onClick: () => setOpenIndex(openIndex === idx ? null : idx),
        onMouseEnter: () => openIndex !== null && setOpenIndex(idx),
        className: `inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${openIndex === idx ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`,
        children: [
          item.label,
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "svg", { className: "h-3 w-3", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
        ]
      }
    ),
    openIndex === idx && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute left-0 top-full mt-1.5 z-50 w-[400px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-lg", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "grid gap-3", children: item.children.map((child, ci) => /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
      "a",
      {
        href: child.href || "#",
        className: "block rounded-md p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors",
        onClick: () => setOpenIndex(null),
        children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "text-sm font-medium text-zinc-900 dark:text-white", children: child.label }),
          child.description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-1 text-sm text-zinc-500 dark:text-zinc-400", children: child.description })
        ]
      },
      ci
    )) }) })
  ] }) : /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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


var Popover = ({
  trigger = "Open",
  children,
  align = "center",
  className = ""
}) => {
  const [open, setOpen] = _react.useState.call(void 0, false);
  const ref = _react.useRef.call(void 0, null);
  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0"
  };
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative inline-block", ref, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: () => setOpen(!open),
        className: "inline-flex items-center justify-center rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-10 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-900 dark:text-white",
        children: trigger
      }
    ),
    open && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: `absolute top-full mt-2 ${alignClasses[align]} z-50 w-72 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-md ${className}`, children })
  ] });
};
Popover.displayName = "Popover";
Popover.meta = {
  type: "popover",
  name: "Popover",
  version: "1.0.0",
  category: "Overlay",
  isSlot: true,
  isContainer: true,
  description: "Floating content panel attached to a trigger button.",
  propControls: [
    { name: "trigger", label: "Trigger Text", type: "text" },
    { name: "align", label: "Alignment", type: "select", options: ["start", "center", "end"] }
  ]
};

// src/components/Primitives/Structure/Sheet.tsx


var Sheet = ({
  trigger = "Open",
  title,
  description,
  side = "right",
  open: controlledOpen,
  children,
  className = ""
}) => {
  const [internalOpen, setInternalOpen] = _react.useState.call(void 0, false);
  const isOpen = _nullishCoalesce(controlledOpen, () => ( internalOpen));
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
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, _jsxruntime.Fragment, { children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: () => setInternalOpen(true),
        className: "inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground h-10 px-4 py-2 hover:bg-primary/90 transition-colors",
        children: trigger
      }
    ),
    isOpen && /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "fixed inset-0 z-50", children: [
      /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "fixed inset-0 bg-black/80", onClick: () => setInternalOpen(false) }),
      /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `fixed ${sideClasses[side]} bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 p-6 shadow-lg transition-transform duration-300 ${translateClasses[side]} ${className}`, children: [
        title && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h2", { className: "text-lg font-semibold text-zinc-900 dark:text-white", children: title }),
        description && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "mt-1.5 text-sm text-zinc-500 dark:text-zinc-400", children: description }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-4", children }),
        /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
  category: "Overlay",
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


var Tabs = ({
  items = [
    { label: "Account", content: "Make changes to your account settings here." },
    { label: "Password", content: "Change your password here." },
    { label: "Notifications", content: "Configure your notification preferences." }
  ],
  defaultIndex = 0,
  className = ""
}) => {
  const [activeIndex, setActiveIndex] = _react.useState.call(void 0, defaultIndex);
  return /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: `w-full ${className}`, children: [
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex border-b border-zinc-200 dark:border-zinc-800", children: items.map((item, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
      "button",
      {
        onClick: () => setActiveIndex(i),
        className: `px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${i === activeIndex ? "border-primary text-zinc-900 dark:text-white" : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700"}`,
        children: item.label
      },
      i
    )) }),
    /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-4 text-sm text-zinc-700 dark:text-zinc-300", children: _optionalChain([items, 'access', _19 => _19[activeIndex], 'optionalAccess', _20 => _20.content]) })
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



var CanvasBento2 = _react.forwardRef.call(void 0, ({ className, style, children, ...props }, ref) => {
  return /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
    "div",
    {
      ref,
      ...props,
      style,
      className: cn("w-full box-border p-[40px_20px] md:p-[60px_20px] bg-[var(--token-background)] border border-[var(--token-muted)]/10 rounded-[32px] md:rounded-[48px] overflow-hidden transition-colors duration-500", className),
      children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 md:grid-rows-6 gap-6 min-h-[1200px] md:h-[700px]", children: [
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "col-span-1 md:col-span-4 lg:col-span-8 row-span-4 bg-[var(--token-background)] border border-[var(--token-muted)]/20 rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,var(--token-primary)_8%,transparent_70%)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000" }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative z-10 h-full flex flex-col", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-fit p-[8px_16px] bg-[var(--token-primary)]/5 border border-[var(--token-primary)]/10 rounded-full mb-8", children: /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.Sparkles, { className: "w-3.5 h-3.5 text-[var(--token-primary)] animate-pulse" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-[10px] font-black uppercase tracking-[0.15em] text-[var(--token-primary)]", children: "Stress Test Active" })
            ] }) }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "h2", { className: "text-4xl md:text-6xl font-bold tracking-tight mb-8", children: [
              "Pushing the ",
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "br", {}),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, 
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
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-[var(--token-muted)] max-w-sm text-sm leading-relaxed mb-10", children: "This component uses arbitrary multi-values, responsive prefixes, and nested glassmorphism to validate the robustness of the SaaS Hybrid Styler." }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "mt-auto flex flex-col sm:flex-row items-center gap-4", children: [
              /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "button", { className: "w-full sm:w-auto p-[14px_28px] bg-[var(--token-text)] text-[var(--token-background)] rounded-2xl font-bold text-sm shadow-xl shadow-black/5 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3", children: [
                "View Benchmarks ",
                /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.ArrowRight, { className: "w-4 h-4" })
              ] }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "button", { className: "w-full sm:w-auto p-[14px_28px] bg-[var(--token-background)] border border-[var(--token-muted)]/20 text-[var(--token-muted)] rounded-2xl font-bold text-sm hover:bg-[var(--token-muted)]/5 transition-all", children: "Documentation" })
            ] }),
            children && /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "mt-8 pt-8 border-t border-[var(--token-muted)]/10", children })
          ] })
        ] }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "col-span-1 md:col-span-2 lg:col-span-4 row-span-3 bg-[var(--token-text)] rounded-[32px] md:rounded-[40px] p-8 text-[var(--token-background)] relative flex flex-col justify-between overflow-hidden shadow-2xl", children: [
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "absolute top-0 left-0 w-full h-full bg-[linear-gradient(225deg,rgba(255,255,255,0.05),transparent)]" }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "relative z-10", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.Zap, { className: "w-8 h-8 text-[var(--token-accent)] mb-4" }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "text-4xl font-black mb-1", children: [
              "0.03",
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "span", { className: "text-[var(--token-muted)] text-lg ml-1 font-medium", children: "ms" })
            ] }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "text-[11px] font-bold uppercase tracking-widest text-[var(--token-muted)]", children: "Tailwind JIT Latency" })
          ] }),
          /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "relative z-10 h-[100px] w-full bg-white/5 rounded-2xl border border-white/5 flex items-end p-4 gap-1.5 backdrop-blur-sm", children: [40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "flex-1 bg-[var(--token-primary)]/40 rounded-t-sm transition-all duration-1000", style: { height: `${h}%` } }, i)) })
        ] }),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, 
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
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-16 h-16 bg-[var(--token-muted)]/5 border border-[var(--token-muted)]/10 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-inner", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.Globe, { className: "w-8 h-8 text-[var(--token-text)]" }) }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "text-lg font-bold text-[var(--token-text)]", children: "Edge Ready" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-[11px] text-[var(--token-muted)] mt-1 max-w-[120px]", children: "Deployed to 4,200+ nodes globally." })
            ]
          }
        ),
        /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "col-span-1 md:col-span-4 lg:col-span-8 row-span-2 bg-[var(--token-primary)]/5 border border-[var(--token-primary)]/10 rounded-[32px] md:rounded-[40px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6", children: [
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "w-16 h-16 bg-[var(--token-background)] rounded-3xl shadow-lg border border-[var(--token-primary)]/10 flex items-center justify-center", children: /* @__PURE__ */ _jsxruntime.jsx.call(void 0, _lucidereact.Shield, { className: "w-8 h-8 text-[var(--token-primary)]" }) }),
            /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "text-center sm:text-left", children: [
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "h3", { className: "text-xl font-bold text-[var(--token-text)] mb-1", children: "Encryption Protocol v4" }),
              /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "p", { className: "text-sm text-[var(--token-muted)]", children: "All style assets are signed with SHA-256 for integrity." })
            ] })
          ] }),
          /* @__PURE__ */ _jsxruntime.jsxs.call(void 0, "div", { className: "flex gap-4", children: [
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-4 py-2 bg-[var(--token-background)] rounded-full text-[10px] font-black text-[var(--token-primary)] border border-[var(--token-primary)]/20 uppercase tracking-widest shadow-sm", children: "Compliant" }),
            /* @__PURE__ */ _jsxruntime.jsx.call(void 0, "div", { className: "px-4 py-2 bg-[var(--token-background)] rounded-full text-[10px] font-black text-[var(--token-primary)] border border-[var(--token-primary)]/20 uppercase tracking-widest shadow-sm", children: "Audited" })
          ] })
        ] })
      ] })
    }
  );
});































































exports.Accordion = Accordion; exports.AddToCartButton = AddToCartButton; exports.AlertDialog = AlertDialog; exports.Avatar = Avatar; exports.Badge = Badge; exports.BentoBoxLegacy = CanvasBento2; exports.Breadcrumb = Breadcrumb; exports.Button = Button; exports.CanvasBento = CanvasBento; exports.CanvasButton = CanvasButton; exports.CanvasCheckbox = CanvasCheckbox; exports.CanvasHeader = CanvasHeader; exports.CanvasInput = CanvasInput; exports.CanvasLayout = CanvasLayout; exports.CanvasSwitch = CanvasSwitch; exports.CanvasText = CanvasText; exports.Card = Card; exports.CardWrapper = CardWrapper; exports.CartBadge = CartBadge; exports.CartProvider = CartProvider; exports.Checkbox = Checkbox; exports.Collapsible = Collapsible; exports.Combobox = Combobox; exports.ContextMenu = ContextMenu; exports.Dialog = Dialog; exports.DropdownMenu = DropdownMenu; exports.Footer = Footer; exports.FooterBar = FooterBar; exports.Form = Form; exports.Heading = Heading; exports.Hero = Hero_default; exports.HeroSubtitle = HeroSubtitle_default; exports.HeroTitle = HeroTitle_default; exports.HoverCard = HoverCard; exports.ImagePlaceholder = ImagePlaceholder; exports.Input = Input; exports.LayoutBox = LayoutBox; exports.Link = Link; exports.Menubar = Menubar; exports.NavBar = NavBar; exports.Navbar = Navbar; exports.NavigationMenu = NavigationMenu; exports.Pagination = Pagination; exports.Paragraph = Paragraph; exports.Popover = Popover; exports.RadioGroup = RadioGroup; exports.Section = Section; exports.Select = Select; exports.Separator = Separator; exports.Sheet = Sheet; exports.Slider = Slider; exports.Switch = Switch; exports.Table = Table; exports.Tabs = Tabs; exports.Text = Text; exports.Textarea = Textarea; exports.Toast = Toast; exports.Toggle = Toggle; exports.ToggleGroup = ToggleGroup; exports.Tooltip = Tooltip; exports.getSafeCatalog = getSafeCatalog; exports.useCart = useCart;
