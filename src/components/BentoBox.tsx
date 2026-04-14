"use client";

import React, { forwardRef } from 'react';
import { Sparkles, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import { cn } from "../lib/utils";

/**
 * 🍱 CANVAS BENTO - STRESS TEST
 * 
 * Demonstrates high-complexity style compilation:
 * - Nested Gradients
 * - Arbitrary Values [p-10_20]
 * - Multi-layer shadows
 * - Responsive logic (tablet:/mobile:)
 * - Interdependent HSL colors
 */
export const CanvasBento = forwardRef<HTMLDivElement, any>(({ className, style, children, ...props }, ref) => {
  return (
    <div 
      ref={ref}
      {...props}
      style={style}
      className={cn("w-full box-border p-[40px_20px] md:p-[60px_20px] bg-[var(--token-background)] border border-[var(--token-muted)]/10 rounded-[32px] md:rounded-[48px] overflow-hidden transition-colors duration-500", className)}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 md:grid-rows-6 gap-6 min-h-[1200px] md:h-[700px]">
        
        {/* 🎬 MAIN FEATURE: The 'Impossible' Gradient Card */}
        <div className="col-span-1 md:col-span-4 lg:col-span-8 row-span-4 bg-[var(--token-background)] border border-[var(--token-muted)]/20 rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden group">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-[radial-gradient(circle,var(--token-primary)_8%,transparent_70%)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000" />
           
           <div className="relative z-10 h-full flex flex-col">
              <div className="w-fit p-[8px_16px] bg-[var(--token-primary)]/5 border border-[var(--token-primary)]/10 rounded-full mb-8">
                 <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--token-primary)] animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--token-primary)]">Stress Test Active</span>
                 </div>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
          Pushing the <br/> 
          <span 
            className="bg-clip-text"
            style={{ 
              backgroundImage: "linear-gradient(to right, #60a5fa, #6366f1, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block"
            }}
          >
            Compiler Limits.
          </span>
        </h2>

              <p className="text-[var(--token-muted)] max-w-sm text-sm leading-relaxed mb-10">
                 This component uses arbitrary multi-values, responsive prefixes, and nested glassmorphism to validate the robustness of the SaaS Hybrid Styler.
              </p>

              <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
                 <button className="w-full sm:w-auto p-[14px_28px] bg-[var(--token-text)] text-[var(--token-background)] rounded-2xl font-bold text-sm shadow-xl shadow-black/5 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3">
                    View Benchmarks <ArrowRight className="w-4 h-4" />
                 </button>
                 <button className="w-full sm:w-auto p-[14px_28px] bg-[var(--token-background)] border border-[var(--token-muted)]/20 text-[var(--token-muted)] rounded-2xl font-bold text-sm hover:bg-[var(--token-muted)]/5 transition-all">
                    Documentation
                 </button>
              </div>

              {/* 📥 DROP SLOT: For real editor elements */}
              {children && (
                <div className="mt-8 pt-8 border-t border-[var(--token-muted)]/10">
                   {children}
                </div>
              )}
           </div>
        </div>

        {/* 🚀 REAL-TIME STATS: Neumorphic Glass */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 row-span-3 bg-[var(--token-text)] rounded-[32px] md:rounded-[40px] p-8 text-[var(--token-background)] relative flex flex-col justify-between overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(225deg,rgba(255,255,255,0.05),transparent)]" />
           
           <div className="relative z-10">
              <Zap className="w-8 h-8 text-[var(--token-accent)] mb-4" />
              <div className="text-4xl font-black mb-1">0.03<span className="text-[var(--token-muted)] text-lg ml-1 font-medium">ms</span></div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--token-muted)]">Tailwind JIT Latency</div>
           </div>

           <div className="relative z-10 h-[100px] w-full bg-white/5 rounded-2xl border border-white/5 flex items-end p-4 gap-1.5 backdrop-blur-sm">
              {[40, 70, 45, 90, 65, 80, 50, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-[var(--token-primary)]/40 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }} />
              ))}
           </div>
        </div>

        {/* 🌐 GLOBAL REACH: Small Tile */}
        <div 
                  className="col-span-1 md:col-span-8 md:row-span-4 backdrop-blur-2xl p-10 flex flex-col justify-between group"
                  style={{ 
                    backgroundColor: "rgba(9, 9, 11, 0.4)",
                    backdropFilter: "blur(40px)",
                    WebkitBackdropFilter: "blur(40px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "32px",
                    overflow: "hidden"
                  }}
               >
           <div className="w-16 h-16 bg-[var(--token-muted)]/5 border border-[var(--token-muted)]/10 rounded-full flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-500 shadow-inner">
              <Globe className="w-8 h-8 text-[var(--token-text)]" />
           </div>
           <div className="text-lg font-bold text-[var(--token-text)]">Edge Ready</div>
           <p className="text-[11px] text-[var(--token-muted)] mt-1 max-w-[120px]">Deployed to 4,200+ nodes globally.</p>
        </div>

        {/* 🛡️ SECURITY: Wide Bottom Tile */}
        <div className="col-span-1 md:col-span-4 lg:col-span-8 row-span-2 bg-[var(--token-primary)]/5 border border-[var(--token-primary)]/10 rounded-[32px] md:rounded-[40px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[var(--token-background)] rounded-3xl shadow-lg border border-[var(--token-primary)]/10 flex items-center justify-center">
                 <Shield className="w-8 h-8 text-[var(--token-primary)]" />
              </div>
              <div className="text-center sm:text-left">
                 <h3 className="text-xl font-bold text-[var(--token-text)] mb-1">Encryption Protocol v4</h3>
                 <p className="text-sm text-[var(--token-muted)]">All style assets are signed with SHA-256 for integrity.</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              <div className="px-4 py-2 bg-[var(--token-background)] rounded-full text-[10px] font-black text-[var(--token-primary)] border border-[var(--token-primary)]/20 uppercase tracking-widest shadow-sm">Compliant</div>
              <div className="px-4 py-2 bg-[var(--token-background)] rounded-full text-[10px] font-black text-[var(--token-primary)] border border-[var(--token-primary)]/20 uppercase tracking-widest shadow-sm">Audited</div>
           </div>
        </div>

      </div>
    </div>
  );
});

