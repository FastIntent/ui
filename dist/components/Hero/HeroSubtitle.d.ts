/**
 * 🎨 MANUAL DEL DESARROLLADOR: COMPONENTES HIJOS (SLOTS)
 *
 * Un componente hijo/slot es una pieza atómica con las siguientes reglas:
 * 1. DEBE TENER 'isSlot: true' en su metadata (no aparece suelto en el catálogo).
 * 2. DEBE TENER 'parentConstraint' (para evitar que lo usen fuera de su contexto).
 */
export declare const HeroSubtitle: ({ text, color }: {
    text?: string;
    color?: string;
}) => import("react/jsx-runtime").JSX.Element;
export default HeroSubtitle;
