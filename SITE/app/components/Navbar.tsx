"use client";

const NAV_LINKS = [
  { label: "Pesquisas", href: "#pesquisas" },
  { label: "Projetos", href: "#projetos" },
  { label: "Publicações", href: "#publicacoes" },
  { label: "Contato", href: "#contato" },
] as const;

export default function Navbar() {
  function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav aria-label="Navegação principal" className="sticky top-0 z-50 w-full bg-[#0a0f1a]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="text-base font-bold tracking-tight bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent hover:opacity-75 transition-opacity duration-200"
        >
          Fabricio Barili
        </a>

        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleSmoothScroll(e, href)}
                className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex md:hidden items-center gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleSmoothScroll(e, href)}
              className="text-xs font-medium text-slate-400 hover:text-slate-100 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
