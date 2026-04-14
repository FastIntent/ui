/**
 * 🎨 MANUAL DEL DESARROLLADOR: COMPONENTES HIJOS (SLOTS)
 *
 * Un componente hijo/slot es una pieza atómica con las siguientes reglas:
 * 1. DEBE TENER 'isSlot: true' en su metadata (no aparece suelto en el catálogo).
 * 2. DEBE TENER 'parentConstraint' (para evitar que lo usen fuera de su contexto).
 * 3. Funcionalidad Focalizada: Su responsabilidad es puramente renderizar una
 *    parte visual o lógica específica (ej: Título, Botón, Icono).
 */
export declare const HeroTitle: ({ text, color }: {
    text?: string;
    color?: string;
}) => import("react/jsx-runtime").JSX.Element;
export default HeroTitle;
