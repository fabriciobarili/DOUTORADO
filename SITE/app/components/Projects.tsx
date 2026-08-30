import React from "react";

const projects = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Metaverso e Trabalho",
    description: "Relatório publicado pelo ITS Rio / diVerso sobre regulação do metaverso com foco nas condições de trabalho e nos desafios jurídicos para o Sul Global.",
    tags: ["ITS Rio", "diVerso", "Regulação", "Sul Global"],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.058l.177.068a2.25 2.25 0 011.357 2.058v1.354m-9 0h9m-9 0a2.25 2.25 0 00-2.25 2.25v.75m11.25-3a2.25 2.25 0 012.25 2.25v.75M3 21h18" />
      </svg>
    ),
    title: "IA e Recursos Humanos",
    description: "Artigo científico analisando os impactos da inteligência artificial na gestão de pessoas, publicado na Revista da Ejud do TRT4.",
    tags: ["IA", "RH", "Direito do Trabalho", "TRT4"],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
    title: "Jornada do Trabalhador de Si Mesmo",
    description: "Jogo sério desenvolvido na Workers Game Jam que gamifica a precarização do trabalho e a lógica do empreendedorismo de si mesmo na economia de plataformas.",
    tags: ["Serious Game", "Precarização", "Plataformas", "Game Jam"],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Seção Especial IJoC",
    description: "Editor convidado e autor de seção especial no International Journal of Communication (IJoC) dedicada à vigilância laboral e bossware.",
    tags: ["IJoC", "Vigilância", "Bossware", "Editor Convidado"],
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="py-20 px-6 bg-[#0a0f1a]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Projetos &amp;{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Destaques
            </span>
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Pesquisas, publicações e iniciativas no cruzamento entre tecnologia, trabalho e direito.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-violet-500/40 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-violet-900/20"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 text-blue-300 group-hover:text-violet-300 transition-colors duration-300">
                  {project.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-lg leading-snug mb-1 group-hover:text-violet-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20 group-hover:border-violet-500/30 group-hover:text-violet-300 transition-colors duration-300">
                    {tag}
                  </span>
                ))}
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-600/5 to-violet-600/5" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
