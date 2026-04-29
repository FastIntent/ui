"use client";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "../../utils/cn";

export type StickyHeaderVariant = "h1" | "h2" | "h3" | "h4" | "h5";
export type StickyHeaderWidth = "full" | "box";

export interface StickyHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  content?: string;
  /** Texto del logo (fallback si `logoSrc` no está presente). */
  logoText?: string;
  /** URL de la imagen del logo. Si está presente, prima sobre `logoText`. */
  logoSrc?: string;
  /**
   * Variante de layout de las dos zonas-slot que el componente renderiza.
   *  - h1: logo izq · slotA centro · slotB derecha (clásico)
   *  - h2: slotA izq · logo centro · slotB derecha (split simétrico)
   *  - h3: logo arriba · slotA + slotB en fila debajo (stacked)
   *  - h4: logo izq · slotA + slotB juntos a la derecha (minimal)
   *  - h5: logo izq · slotA y slotB apilados a la derecha (vertical right)
   *
   * Si los slots quedan vacíos el render colapsa naturalmente — los layouts
   * no fuerzan altura mínima. Combinar con `height>0` para fijar altura.
   *
   * NOTA — el nombre canónico era `style` pero choca con
   * `React.HTMLAttributes.style` (CSSProperties que el editor pasa para
   * inline styles). Renombrado a `variant` por desambiguación.
   */
  variant?: StickyHeaderVariant;
  /**
   * `full` → header expandido a 100% (default).
   * `box`  → contenedor interno con `max-width` centrado horizontalmente,
   *           SOLO en md+ (en mobile siempre full por ergonomía táctil).
   */
  width?: StickyHeaderWidth;
  /** Px del max-width cuando `width="box"`. Default 1240. Ignorado si `width="full"`. */
  maxWidth?: number;
  /**
   * Px de altura mínima en desktop. `0` (default) = auto/padding manda. Mobile
   * mantiene altura natural — cualquier valor >0 sólo aplica con media query
   * `min-width: 768px`.
   */
  height?: number;
  /** Si `true`, no clona la copia `fixed` en scroll (preview SSR). */
  disableStickyOnScroll?: boolean;
  /** @deprecated v1 — usar slot A children. Aceptado para no romper el destructure. */
  links?: string[] | string;
  /** @deprecated v1 — usar slot B children. */
  buttonText?: string;
  /** @deprecated v1 — usar slot B children. */
  buttonHref?: string;
}

const HEADER_DEFAULT_MAX_WIDTH = 1240;
const VARIANT_OPTIONS: StickyHeaderVariant[] = ["h1", "h2", "h3", "h4", "h5"];
const WIDTH_OPTIONS: StickyHeaderWidth[] = ["full", "box"];

/**
 * 🛰️ STICKY HEADER v2 (multi-slot)
 *
 * Container con dos drop zones (slot-A y slot-B) que el editor del FastIntent
 * inserta como children del header. El componente NO conoce el contenido —
 * sólo posiciona los dos primeros children según la prop `style` y reusa
 * los mismos en el drawer mobile sin duplicar props.
 *
 * Contrato:
 *   - `React.Children.toArray(children)[0]` → slot A
 *   - `React.Children.toArray(children)[1]` → slot B
 *   - Cualquier child >2 se ignora (defensa: el editor inserta exactamente 2).
 *
 * El logo es prop (texto + imagen opcional) — no es slot. Reduce libertad
 * a cambio de robustez: el usuario no puede romper el header eliminando un
 * primitive logo, sólo cambia el texto/URL en la sidebar.
 *
 * Layouts disponibles vía `style`:
 *   h1 — logo izq · slotA centro · slotB derecha    (default)
 *   h2 — slotA izq · logo centro · slotB derecha    (split simétrico)
 *   h3 — logo arriba · slotA + slotB en fila debajo (stacked, 2 filas)
 *   h4 — logo izq · slotA + slotB juntos derecha    (minimal)
 *   h5 — logo izq · slotA y slotB derecha apilados  (vertical right)
 *
 * Layout container:
 *   - `width="full"` → contenedor interno `max-w-full` (todo el viewport).
 *   - `width="box"`  → `md:max-w-{maxWidth}px` centrado. En mobile siempre full.
 *   - `height>0`     → `md:min-h-{height}px`. Mobile altura natural.
 *
 * Sticky-on-scroll y drawer mobile siguen iguales que v1.
 *
 * Migración 1.x → 2.0.0:
 *   - Drop de `links` (string|string[]), `buttonText`, `buttonHref`. Esos
 *     se vuelven slots editables en el canvas. La migración de v1 a v2 los
 *     descarta — el editor se encarga de re-poblar los slots vía
 *     `defaultChildren` al swap-en-place o al reinsertar.
 */
export const StickyHeader = forwardRef<HTMLElement, StickyHeaderProps>(
  (
    {
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
    },
    ref,
  ) => {
    const logoText = logoTextProp || "Shop";
    const logoSrc = typeof logoSrcProp === "string" ? logoSrcProp.trim() : "";
    const styleVariant: StickyHeaderVariant = VARIANT_OPTIONS.includes(
      variantProp as StickyHeaderVariant,
    )
      ? (variantProp as StickyHeaderVariant)
      : "h1";
    const widthMode: StickyHeaderWidth = WIDTH_OPTIONS.includes(
      widthProp as StickyHeaderWidth,
    )
      ? (widthProp as StickyHeaderWidth)
      : "full";
    const maxWidth =
      typeof maxWidthProp === "number" && maxWidthProp > 0
        ? maxWidthProp
        : HEADER_DEFAULT_MAX_WIDTH;
    const minHeight =
      typeof heightProp === "number" && heightProp > 0 ? heightProp : 0;
    const disableStickyOnScroll = disableStickyOnScrollProp === true;

    // Normalizar children → exactamente [slotA, slotB] (puede ser undefined).
    const childArr = React.Children.toArray(children);
    const slotA = childArr[0] ?? null;
    const slotB = childArr[1] ?? null;

    const headerRef = useRef<HTMLElement | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);

    // ── Scroll-driven sticky reveal ────────────────────────────────────────
    const [sticky, setSticky] = useState(false);
    const [visible, setVisible] = useState(false);
    const lastYRef = useRef(0);

    useEffect(() => {
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

    useEffect(() => {
      if (typeof document === "undefined") return;
      document.body.style.overflow = drawerOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [drawerOpen]);

    useEffect(() => {
      if (!drawerOpen) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeDrawer();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [drawerOpen, closeDrawer]);

    const [headerH, setHeaderH] = useState(64);
    useEffect(() => {
      if (!headerRef.current) return;
      const measure = () => setHeaderH(headerRef.current?.offsetHeight ?? 64);
      measure();
      const ro =
        typeof ResizeObserver !== "undefined"
          ? new ResizeObserver(measure)
          : null;
      if (ro && headerRef.current) ro.observe(headerRef.current);
      window.addEventListener("resize", measure);
      return () => {
        ro?.disconnect();
        window.removeEventListener("resize", measure);
      };
    }, []);

    // CSS variables para max-width / min-height — Tailwind las consume vía
    // arbitrary values y media queries.
    const containerStyle: React.CSSProperties = {
      ...(styleAttr || {}),
      ...(widthMode === "box"
        ? ({ "--header-max-w": `${maxWidth}px` } as React.CSSProperties)
        : {}),
      ...(minHeight > 0
        ? ({ "--header-min-h": `${minHeight}px` } as React.CSSProperties)
        : {}),
    };

    // El contenedor interno aplica max-width en md+ si width=box.
    const innerWidthCls =
      widthMode === "box"
        ? "md:max-w-[var(--header-max-w)]"
        : "max-w-full";

    // min-height se aplica vía clase arbitrary que lee la var. Sólo md+.
    const innerMinHCls =
      minHeight > 0 ? "md:min-h-[var(--header-min-h)]" : "";

    // ── Layout per-style (sólo afecta md+; mobile colapsa con hamburger) ──
    // Cada variante define el orden de logo/slotA/slotB y el flex layout.
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
      const Logo = (
        <div className="flex items-center gap-3 shrink-0">
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt={logoText}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="font-bold text-[18px] md:text-[20px] text-zinc-900">
              {logoText}
            </span>
          )}
        </div>
      );

      const SlotA = (
        <div data-slot="a" className="hidden md:flex items-center gap-6">
          {slotA}
        </div>
      );
      const SlotB = (
        <div data-slot="b" className="hidden md:flex items-center gap-4">
          {slotB}
        </div>
      );

      switch (styleVariant) {
        case "h2":
          // slotA · logo · slotB
          return (
            <>
              {SlotA}
              <div className="flex justify-center">{Logo}</div>
              {SlotB}
            </>
          );
        case "h3":
          // logo arriba (centrado), abajo slotA + slotB en fila
          return (
            <>
              <div className="flex justify-center">{Logo}</div>
              <div className="hidden md:flex items-center justify-between gap-6">
                {slotA && (
                  <div data-slot="a" className="flex items-center gap-6">
                    {slotA}
                  </div>
                )}
                {slotB && (
                  <div data-slot="b" className="flex items-center gap-4">
                    {slotB}
                  </div>
                )}
              </div>
            </>
          );
        case "h4":
          // logo · [slotA + slotB juntos a la derecha]
          return (
            <>
              {Logo}
              <div className="hidden md:flex items-center gap-6">
                {slotA && (
                  <div data-slot="a" className="flex items-center gap-6">
                    {slotA}
                  </div>
                )}
                {slotB && (
                  <div data-slot="b" className="flex items-center gap-4">
                    {slotB}
                  </div>
                )}
              </div>
            </>
          );
        case "h5":
          // logo · [slotA arriba, slotB abajo apilados a la derecha]
          return (
            <>
              {Logo}
              <div className="hidden md:flex flex-col items-end gap-1">
                {slotA && (
                  <div data-slot="a" className="flex items-center gap-6">
                    {slotA}
                  </div>
                )}
                {slotB && (
                  <div data-slot="b" className="flex items-center gap-4">
                    {slotB}
                  </div>
                )}
              </div>
            </>
          );
        case "h1":
        default:
          // logo · slotA centro · slotB derecha
          return (
            <>
              {Logo}
              {SlotA}
              {SlotB}
            </>
          );
      }
    };

    const headerInner = (
      <div
        className={cn(
          "relative z-50 mx-auto flex items-center justify-between px-5 md:px-10 py-4",
          innerWidthCls,
          innerMinHCls,
          innerLayoutCls,
        )}
      >
        {renderDesktopBody()}

        <HamburgerButton
          open={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
        />
      </div>
    );

    return (
      <>
        <header
          ref={(el) => {
            headerRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref)
              (ref as React.MutableRefObject<HTMLElement | null>).current = el;
          }}
          className={cn(
            "relative z-50 bg-white border-b border-zinc-200 w-full",
            className,
          )}
          style={containerStyle}
          {...rest}
        >
          {headerInner}

          {/* Drawer mobile — reusa los mismos slotA/slotB sin duplicar props. */}
          <MobileDrawer
            open={drawerOpen}
            onClose={closeDrawer}
            offsetTop={headerH}
            slotA={slotA}
            slotB={slotB}
          />
        </header>

        {sticky && (
          <header
            className={cn(
              "fixed top-0 left-0 right-0 z-50 bg-white border-b border-zinc-200 shadow-sm",
              "transition-transform duration-500",
              visible ? "translate-y-0" : "-translate-y-full",
            )}
          >
            {headerInner}
          </header>
        )}
      </>
    );
  },
);

StickyHeader.displayName = "StickyHeader";

// ── Sub-componentes ───────────────────────────────────────────────────────

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ open, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="md:hidden relative w-6 h-5 flex flex-col justify-between"
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
  >
    <span
      className={cn(
        "block h-[2px] w-6 bg-zinc-900 rounded-full transition-all duration-300 origin-center",
        open && "translate-y-[9px] rotate-45",
      )}
    />
    <span
      className={cn(
        "block h-[2px] w-6 bg-zinc-900 rounded-full transition-all duration-300",
        open && "opacity-0 scale-x-0",
      )}
    />
    <span
      className={cn(
        "block h-[2px] w-6 bg-zinc-900 rounded-full transition-all duration-300 origin-center",
        open && "-translate-y-[9px] -rotate-45",
      )}
    />
  </button>
);

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  offsetTop: number;
  slotA: React.ReactNode;
  slotB: React.ReactNode;
}

/**
 * Drawer mobile que reusa los mismos `slotA`/`slotB` del header (no
 * duplicación de props). Renderiza vertical: slotA arriba, separador,
 * slotB abajo. Click cualquier link → cierre vía `onClose`.
 *
 * Si los children del slot son anchors `<a>` el cierre depende del bubble
 * del click event hasta el contenedor. Si en el futuro queremos cerrar
 * sólo cuando se clickea un link específico, se puede filtrar por target.
 */
const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  offsetTop,
  slotA,
  slotB,
}) => {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        style={{ top: offsetTop }}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed right-0 z-50 w-[280px] max-w-[80vw] bg-white border-l border-zinc-200",
          "shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out",
          "flex flex-col md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
        style={{ top: offsetTop, height: `calc(100vh - ${offsetTop}px)` }}
        role="dialog"
        aria-modal="true"
        onClick={onClose}
      >
        {slotA && (
          <div
            data-slot="a"
            className="flex flex-col px-5 pt-6 pb-2 gap-1 [&_a]:text-[15px] [&_a]:font-medium [&_a]:text-zinc-900 [&_a]:py-3 [&_a]:border-b [&_a]:border-zinc-200"
          >
            {slotA}
          </div>
        )}

        {slotB && (
          <div
            data-slot="b"
            className="mt-auto px-5 pb-10 flex flex-col items-center gap-6 [&_a]:w-full [&_a]:text-center"
          >
            {slotB}
          </div>
        )}
      </div>
    </>
  );
};

(StickyHeader as unknown as { meta: unknown }).meta = {
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
    "2.0.0": null,
  },
  category: "Navigation",
  description:
    "Header con scroll-reveal sticky, dos slots editables (nav + cta), 5 estilos de layout y drawer mobile. Logo configurable como texto o imagen.",
  isContainer: true,
  propControls: [
    { name: "logoText", label: "Logo (texto)", type: "string", defaultValue: "Shop" },
    { name: "logoSrc", label: "Logo (URL imagen)", type: "string", defaultValue: "" },
    {
      name: "variant",
      label: "Estilo de layout",
      type: "select",
      options: ["h1", "h2", "h3", "h4", "h5"],
      defaultValue: "h1",
    },
    {
      name: "width",
      label: "Ancho",
      type: "select",
      options: ["full", "box"],
      defaultValue: "full",
    },
    {
      name: "maxWidth",
      label: "Ancho máximo (px, sólo si width=box)",
      type: "number",
      defaultValue: HEADER_DEFAULT_MAX_WIDTH,
    },
    {
      name: "height",
      label: "Altura mínima desktop (px, 0=auto)",
      type: "number",
      defaultValue: 0,
    },
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
          props: { href: "#" },
        },
        {
          type: "html_tag",
          tag: "a",
          name: "Shop link",
          content: "Shop",
          styles: { color: "#3f3f46", fontSize: 14, fontWeight: 500 },
          props: { href: "#" },
        },
        {
          type: "html_tag",
          tag: "a",
          name: "About link",
          content: "About",
          styles: { color: "#3f3f46", fontSize: 14, fontWeight: 500 },
          props: { href: "#" },
        },
        {
          type: "html_tag",
          tag: "a",
          name: "Contact link",
          content: "Contact",
          styles: { color: "#3f3f46", fontSize: 14, fontWeight: 500 },
          props: { href: "#" },
        },
      ],
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
            fontWeight: 600,
          },
          props: { href: "#" },
        },
      ],
    },
  ],
};
