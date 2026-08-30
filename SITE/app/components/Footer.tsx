const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/fabriciobarili" },
  { label: "Lattes", href: "http://lattes.cnpq.br/fabriciobarili" },
  { label: "Email", href: "mailto:fabricio.barili@edu.unisinos.br" },
] as const;

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0f1a] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-3 text-center">
        <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
          Fabricio Barili
        </span>
        <p className="text-sm text-slate-500">
          Doutorando em Computação Aplicada &middot; Unisinos &middot; DigiLabour
        </p>
        <nav aria-label="Links sociais" className="flex items-center gap-6 mt-1">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-xs font-medium uppercase tracking-wide text-slate-500 hover:text-blue-300 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-slate-700 mt-3">&copy; 2026 Fabricio Barili</p>
      </div>
    </footer>
  );
}
