"use client";

import React, { forwardRef } from "react";
import { cn } from "../lib/utils";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  logoText?: string;
  links?: (string | NavLink)[];
  ctaText?: string;
}

/**
 * 🛰️ NAVBAR COMPONENT (WITH SMART LINKS)
 * 📐 Parity: Dynamic layout with children and real navigation support
 */
export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ logoText = "ACME Corp", links = ["Features", "Pricing"], ctaText = "Sign in", className, style, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        style={style}
        className={cn(
          "flex flex-row justify-between items-center px-4 py-4 bg-white border-b border-zinc-200 md:px-8 md:py-4 w-full",
          className
        )}
        {...props}
      >
        <span className="font-extrabold text-zinc-900 text-base md:text-2xl tracking-tighter shrink-0">{logoText}</span>

        <div className="flex items-center gap-4 md:gap-8 grow justify-end">
          <div className="hidden md:flex gap-8 px-8 items-center">
            {links?.map((link, idx) => {
              const label = typeof link === 'string' ? link : link.label;
              const href = typeof link === 'string' ? '#' : link.href;
              
              return (
                <a 
                  key={idx} 
                  href={href} 
                  className="text-zinc-500 font-bold text-xs cursor-pointer hover:text-zinc-900 transition-colors uppercase tracking-widest no-underline"
                >
                  {label}
                </a>
              );
            })}
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-zinc-900 text-white text-xs md:text-sm px-4 py-2.5 rounded-[12px] font-bold hover:bg-zinc-700 transition-all active:scale-95 shadow-sm">
              {ctaText}
            </button>
            
            {/* 📥 SLOT: Para Badges, Avatares, etc. */}
            <div className="flex items-center gap-2 empty:hidden border-l border-zinc-100 pl-4 ml-2">
               {children}
            </div>
          </div>
        </div>
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

// @ts-ignore - Static metadata for FastIntent Editor/Compiler
Navbar.meta = {
  type: "navbar",
  name: "Enterprise Global Navbar",
  version: "1.2.0",
  isSlot: true,
  category: "Navigation",
  description: "Barra de navegación con soporte para links inteligentes, contextos globales y slots.",
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
      type: "array", // Cambiado a array para el nuevo estándar de lista
      defaultValue: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" }
      ]
    }
  ]
};
