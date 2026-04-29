import React from 'react';
import { colors, spacing, typography } from '@fastintent/design-tokens';
import { sanitizeProps } from '../../lib/sanitizer';

type FooterBaseProps = {
  children?: React.ReactNode;
  backgroundColor?: string; 
  textColor?: string;
  companyName?: string;
  logo?: string;
};

type DimensionProps = {
  paddingTop?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;
  paddingRight?: string | number;
};

type PolymorphicProps<C extends React.ElementType> = {
  as?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof FooterBaseProps | keyof DimensionProps | 'as'>;

export type FooterProps<C extends React.ElementType> = 
  FooterBaseProps & DimensionProps & PolymorphicProps<C>;

export const Footer = <C extends React.ElementType = 'footer'>({ 
  children,
  backgroundColor, 
  textColor,
  companyName = "FastIntent Builder",
  logo,
  as,
  ...allProps // ✅ Tomamos todas las props
}: FooterProps<C>) => {

  const Component = as || 'footer';

  // 🛡️ SANITIZACIÓN AUTOMÁTICA EN RUNTIME
  // Filtra todo lo que no esté en .meta.propControls para que NO llegue al DOM
  const domProps = sanitizeProps(allProps, (Footer as any).meta);

  const style = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
    padding: `${spacing.lg} ${spacing.md}`,
    borderColor: colors.background.subtle,
    gap: spacing.xl
  };

  const fallbackClasses = `
    ${!backgroundColor ? 'bg-zinc-950' : ''}
    ${!textColor ? 'text-white' : ''}
  `;

  return (
    <Component 
      id="ui-footer-parent"
      className={`w-full flex flex-col items-center border-t overflow-hidden ${fallbackClasses}`}
      style={style}
      {...domProps} // ✅ Solo inyectamos props seguras
    >
      <div className="w-full max-w-6xl flex flex-wrap justify-between gap-8">
        <div className="flex flex-col" style={{ gap: spacing.sm }}>
          <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">F</span>
             <span>{logo || "FastIntent"}</span>
          </div>
          <p className="max-w-xs text-sm opacity-60 leading-relaxed font-medium">
             Building the next generation of SaaS products with a visual-first approach.
          </p>
        </div>
        
        <div className="flex gap-16 flex-wrap">
          {children || (
            <div className="flex gap-16">
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-sm uppercase tracking-widest opacity-40">Producto</h4>
                <ul className="flex flex-col gap-2 text-sm font-semibold">
                  <li className="cursor-pointer hover:opacity-50 transition-opacity">Características</li>
                  <li className="cursor-pointer hover:opacity-50 transition-opacity">Precios</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div 
        className="w-full max-w-6xl flex justify-between items-center text-[11px] font-bold uppercase tracking-widest border-t opacity-70"
        style={{ 
           paddingTop: spacing.md, 
           borderColor: 'inherit',
        }}
      >
        <span>© {new Date().getFullYear()} {companyName}</span>
        <div className="flex space-x-6">
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Privacy Policy</span>
          <span className="cursor-pointer hover:opacity-100 transition-opacity">Terms of Service</span>
        </div>
      </div>
    </Component>
  );
};

(Footer as any).meta = {
  type: "ui_footer",
  name: "Enterprise Static Footer",
  version: "1.3.0",
  category: "Layout",
  description: "Pie de página semánticamente adaptable impulsado por Design Tokens y SSOT.",
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
      defaultValue: "var(--background-dark)" // Tokens por defecto
    },
    { 
      name: "textColor", 
      label: "Color Texto", 
      type: "color", 
      defaultValue: "var(--text-light)" 
    },
    { 
      name: "as", 
      label: "Tag Semántico", 
      type: "enum", 
      options: ["footer", "section", "div"], 
      defaultValue: "footer" 
    }
  ],
  migrations: {
    "1.0.0": (props: any) => {
      const { ctaText, logoText, ...rest } = props;
      return {
        ...rest,
        companyName: logoText || "FastIntent Builder",
        logo: logoText || "FastIntent"
      };
    },
    "1.2.1": (props: any) => {
      const { ctaText, ...rest } = props;
      return rest;
    }
  },
  dependencies: { 
    "@fastintent/design-tokens": "1.0.0" 
  }
};

export default Footer;
