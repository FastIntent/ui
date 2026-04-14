export type ComponentMeta = {
    version?: string;
    propControls?: {
        name: string;
    }[];
    migrations?: Record<string, (props: any) => any>;
};
/**
 * Filtra props que no están registradas en el meta ni son seguras para el DOM.
 * Esto evita que props "basura" de versiones antiguas lleguen al DOM de React.
 */
export declare function sanitizeProps(props: any, meta?: ComponentMeta): any;
