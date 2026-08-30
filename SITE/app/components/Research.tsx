export default function Research() {
  const areas = [
    {
      title: "Vigilância Laboral",
      subtitle: "Bossware & Monitoramento",
      description:
        "Investiga tecnologias de vigilância no trabalho — bossware, monitoramento de produtividade e gestão algorítmica. Analisa como o teletrabalho ampliou práticas de controle digital sobre trabalhadores.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      title: "Plataformização",
      subtitle: "Economia Digital & Uberização",
      description:
        'Estuda a gig economy e a uberização do trabalho, com foco no fenômeno do "trabalhador de si mesmo". Examina como plataformas digitais reestruturam relações laborais e transferem riscos ao trabalhador.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <circle cx="12" cy="12" r="2" />
          <circle cx="4" cy="6" r="2" />
          <circle cx="20" cy="6" r="2" />
          <circle cx="4" cy="18" r="2" />
          <circle cx="20" cy="18" r="2" />
          <path d="M6 6h4M14 6h4M6 18h4M14 18h4M12 10v4" />
        </svg>
      ),
    },
    {
      title: "Tecnologia & Direito",
      subtitle: "Sul Global & Regulação",
      description:
        "Explora impactos legais de tecnologias emergentes no Sul Global, incluindo regulação do Metaverso e uso de IA na gestão de Recursos Humanos. Contribui com análises para o ITS Rio e publicações jurídicas especializadas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        </svg>
      ),
    },
    {
      title: "Privacidade & Dados",
      subtitle: "LGPD, IoT & Mercado de Dados",
      description:
        "Analisa privacidade de dados sob a ótica da LGPD, segurança em dispositivos IoT e dinâmicas do mercado de dados pessoais. Investiga tensões entre inovação tecnológica e proteção de direitos fundamentais.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="pesquisas" className="py-24 px-6 bg-[#0a0f1a]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-violet-400 mb-4">
            Sobre
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Pesquisa &amp; Áreas de Atuação
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
            Doutorando em Computação Aplicada pela{" "}
            <span className="text-violet-300 font-medium">Unisinos</span>, vinculado ao laboratório{" "}
            <span className="text-violet-300 font-medium">DigiLabour</span>. Minha pesquisa situa-se
            na intersecção entre tecnologia, trabalho e direitos no Sul Global — investigando como
            plataformas digitais, algoritmos e dados redefinem relações laborais e impõem novos
            desafios regulatórios.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {areas.map((area) => (
            <div
              key={area.title}
              className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-7 transition-all duration-300 hover:border-violet-600/60 hover:bg-slate-900/80 hover:shadow-[0_0_24px_0_rgba(124,58,237,0.12)]"
            >
              <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-violet-950/60 p-3 text-violet-400 ring-1 ring-violet-800/40 transition-colors duration-300 group-hover:text-violet-300">
                {area.icon}
              </div>
              <h3 className="mb-1 text-lg font-semibold text-white">{area.title}</h3>
              <p className="mb-3 text-xs font-medium tracking-wide text-violet-400/80 uppercase">
                {area.subtitle}
              </p>
              <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
