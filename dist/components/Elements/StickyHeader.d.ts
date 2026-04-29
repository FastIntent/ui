import React from "react";
export type StickyHeaderVariant = "h1" | "h2" | "h3" | "h4" | "h5";
export type StickyHeaderWidth = "full" | "box";
export interface StickyHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
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
export declare const StickyHeader: React.ForwardRefExoticComponent<StickyHeaderProps & React.RefAttributes<HTMLElement>>;
