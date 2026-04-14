export type ComponentMeta = {
  version?: string;
  propControls?: { name: string }[];
  migrations?: Record<string, (props: any) => any>;
};

const SAFE_DOM_PROPS = new Set([
  'id',
  'className',
  'style',
  'children',
  'onClick',
  'onMouseEnter',
  'onMouseLeave',
  'href',
  'target',
  'rel',
  'alt',
  'src',
  'type',
  'disabled'
]);

/**
 * Filtra props que no están registradas en el meta ni son seguras para el DOM.
 * Esto evita que props "basura" de versiones antiguas lleguen al DOM de React.
 */
export function sanitizeProps(props: any, meta?: ComponentMeta) {
  if (!meta) return props;

  const allowedProps = new Set(
    (meta.propControls || []).map(p => p.name)
  );

  const clean: Record<string, any> = {};

  for (const key in props) {
    // Si la prop está declarada en el meta o es una prop estándar del DOM, la dejamos pasar.
    if (allowedProps.has(key) || SAFE_DOM_PROPS.has(key)) {
      clean[key] = props[key];
    }
    // Todo lo demás se ignora silenciosamente.
  }

  return clean;
}
