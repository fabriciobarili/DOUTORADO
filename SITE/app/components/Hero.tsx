"use client";

import { useCallback } from "react";

export default function Hero() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1a]">
      {/* Animated gradient blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-700/20 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px] animate-pulse [animation-delay:1.5s]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px] animate-pulse [animation-delay:3s]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center gap-8">
        {/* Affiliation badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          DigiLabour · Unisinos
        </span>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
            Fabricio Barili
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-slate-300 font-light tracking-wide">
          Pesquisador&nbsp;·&nbsp;Doutorando em Computação Aplicada
        </p>

        {/* Tagline */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
          Investigando as interseções entre{" "}
          <span className="text-blue-300 font-medium">trabalho digital</span>,{" "}
          <span className="text-violet-300 font-medium">vigilância algorítmica</span>{" "}
          e{" "}
          <span className="text-indigo-300 font-medium">economia de plataformas</span>{" "}
          no Sul Global — com foco em direitos, privacidade e poder nas relações
          de trabalho mediadas por tecnologia.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button
            onClick={() => scrollTo("pesquisas")}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-base shadow-lg shadow-blue-900/40 hover:from-blue-500 hover:to-violet-500 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            Ver Pesquisas
          </button>
          <button
            onClick={() => scrollTo("publicacoes")}
            className="px-8 py-3 rounded-lg border border-violet-500/40 bg-violet-500/10 text-violet-200 font-semibold text-base hover:bg-violet-500/20 hover:border-violet-400/60 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
          >
            Publicações
          </button>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-600">
          <span className="text-xs tracking-widest uppercase">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}
