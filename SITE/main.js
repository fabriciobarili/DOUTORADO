/* ========================================================
   LANGUAGE DETECTION
   ======================================================== */
const LANG = (() => {
  const p = window.location.pathname.replace(/\\/g, '/');
  if (p.includes('/en/')) return 'en';
  if (p.includes('/es/')) return 'es';
  return 'pt';
})();

const CURRENT_PAGE = window.location.pathname.replace(/\\/g, '/').split('/').filter(Boolean).pop() || 'index.html';

function langUrl(targetLang) {
  if (targetLang === LANG) return CURRENT_PAGE;
  if (LANG === 'pt') return targetLang + '/' + CURRENT_PAGE;
  if (targetLang === 'pt') return '../' + CURRENT_PAGE;
  return '../' + targetLang + '/' + CURRENT_PAGE;
}

/* ========================================================
   TRANSLATIONS
   ======================================================== */
const TRANSLATIONS = {
  pt: {
    htmlLang: 'pt-BR',
    nav: { pesquisas: 'Pesquisas', projetos: 'Projetos', publicacoes: 'Publicações', sobre: 'Sobre', contato: 'Contato' },
    hero: {
      badge: 'DigiLabour · Unisinos',
      role: 'Doutorando em Computação Aplicada',
      tagline: 'Pesquiso como plataformas digitais, algoritmos e vigilância tecnológica redefinem as relações de trabalho — com ênfase no Sul Global.',
      btnPrimary: 'Ver pesquisas', btnGhost: 'Publicações',
    },
    teasers: [
      { title: 'Pesquisas', text: 'Vigilância laboral, plataformização, privacidade e tecnologia & direito no Sul Global.', page: 'pesquisas.html' },
      { title: 'Projetos', text: 'Relatórios, artigos e iniciativas — do Metaverso e Trabalho ao IJoC Bossware.', page: 'projetos.html' },
      { title: 'Publicações', text: 'Artigos científicos, relatórios e menções na mídia — G1, Folha, Scielo, IJoC e mais.', page: 'publicacoes.html' },
      { title: 'Sobre', text: 'Trajetória acadêmica, vínculos institucionais e filosofia de pesquisa.', page: 'sobre.html' },
    ],
    pesquisas: {
      label: 'Sobre', titleMain: 'Pesquisa & ', titleGrad: 'Áreas de Atuação',
      subtitle: 'Doutorando em Computação Aplicada pela Unisinos, vinculado ao laboratório DigiLabour. Minha pesquisa situa-se na intersecção entre tecnologia, trabalho e direitos no Sul Global — investigando como plataformas digitais, algoritmos e dados redefinem relações laborais e impõem novos desafios regulatórios.',
      areas: [
        { title: 'Vigilância Laboral', sub: 'Bossware & Monitoramento', text: 'Investiga tecnologias de vigilância no trabalho — bossware, monitoramento de produtividade e gestão algorítmica. Analisa como o teletrabalho ampliou práticas de controle digital sobre trabalhadores.' },
        { title: 'Plataformização', sub: 'Economia Digital & Uberização', text: 'Estuda a gig economy e a uberização do trabalho, com foco no fenômeno do "trabalhador de si mesmo". Examina como plataformas digitais reestruturam relações laborais e transferem riscos ao trabalhador.' },
        { title: 'Tecnologia & Direito', sub: 'Sul Global & Regulação', text: 'Explora impactos legais de tecnologias emergentes no Sul Global, incluindo regulação do Metaverso e uso de IA na gestão de RH. Contribui com análises para o ITS Rio e publicações jurídicas especializadas.' },
        { title: 'Privacidade & Dados', sub: 'LGPD, IoT & Mercado de Dados', text: 'Analisa privacidade de dados sob a ótica da LGPD, segurança em dispositivos IoT e dinâmicas do mercado de dados pessoais. Investiga tensões entre inovação tecnológica e proteção de direitos fundamentais.' },
      ],
    },
    projetos: { titleMain: 'Projetos & ', titleGrad: 'Destaques', subtitle: 'Pesquisas, relatórios e iniciativas no cruzamento entre tecnologia, trabalho e direito.' },
    publicacoes: {
      label: 'Presença', titleMain: 'Menções & ', titleGrad: 'Publicações',
      subtitle: 'Artigos científicos, relatórios, coberturas na mídia e participações em eventos.',
      filterAll: 'Todos', filterLabels: { Autor: 'Autor', Entrevistado: 'Entrevistado', Citado: 'Citado', Palestrante: 'Palestrante', Editor: 'Editor' },
    },
    sobre: {
      badge: 'Pesquisador · Programador · Comunicador',
      titleMain: 'Sobre ', titleGrad: 'Fabrício Barili',
      lead: 'Pesquisador, programador e especialista em comunicação digital brasileiro, cuja trajetória se destaca pela intersecção entre a tecnologia e as ciências sociais.',
      bio: 'Atuando na fronteira entre o desenvolvimento de software e a análise crítica da mídia, <strong>Fabrício Barili</strong> investiga os impactos da tecnologia na sociedade moderna. Sua filosofia profissional consolidou-se no lema de <strong>"programar para comunicar"</strong> — unindo código ao olhar social para compreender como plataformas digitais, algoritmos e vigilância tecnológica redefinem relações de trabalho, privacidade e poder.',
      timelineHeading: 'Formação Acadêmica',
      timeline: [
        { year: '2024 – 2028', title: 'Doutorado em Computação Aplicada', sub: 'PPGCA · Unisinos', desc: 'Aprofunda modelos tecnológicos orientados à sociedade, com pesquisa na linha de Inteligência Artificial. Integra o Programa de Pós-Graduação em Computação Aplicada (PPGCA) da Universidade do Vale do Rio dos Sinos.' },
        { year: '2020 – 2022', title: 'Mestrado em Ciências da Comunicação', sub: 'Unisinos', desc: 'Focou suas pesquisas em ética algorítmica, dinâmica de plataformas e os impactos da plataformização no mundo do trabalho e nas relações sociais.' },
        { year: '2020', title: 'Graduação em Comunicação Digital', sub: 'Unisinos', desc: 'Bacharel em Comunicação Digital, após passagens por Ciência da Computação e Análise de Sistemas. A trajetória entre as áreas técnicas e as humanidades forjou sua abordagem única: <em>"programar para comunicar"</em>.' },
      ],
      affiliHeading: 'Vínculos e Coletivos',
      affiliations: [
        { name: 'DigiLabour', desc: 'Membro afiliado do laboratório focado no trabalho em plataformas, gig economy e direitos dos trabalhadores digitais.' },
        { name: 'Surveillance Studies Network', desc: 'Integrante da rede dedicada ao estudo dos mecanismos contemporâneos de vigilância digital e privacidade.' },
        { name: 'PPGCA — Unisinos', desc: 'Doutorando no Programa de Pós-Graduação em Computação Aplicada, linha de pesquisa de Inteligência Artificial.' },
        { name: 'Jogos Textuais — itch.io', desc: 'Desenvolve de forma independente jogos textuais e conceituais voltados à crítica social em plataformas como o itch.io.' },
      ],
      ctaPrimary: 'Entre em contato', ctaSecondary: 'Ver publicações',
    },
    contato: {
      badge: 'Aberto a colaborações',
      titleMain: 'Vamos ', titleGrad: 'Conversar',
      subtitle: 'Aberto para colaborações acadêmicas, entrevistas jornalísticas, convites para eventos e trocas de pesquisa.',
      links: [
        { label: 'LinkedIn', sub: 'fabriciobarili', href: 'https://www.linkedin.com/in/fabriciobarili' },
        { label: 'Lattes', sub: 'Currículo CNPq', href: 'http://lattes.cnpq.br/3905520030270558' },
        { label: 'E-mail', sub: 'Gmail', href: 'mailto:fabriciobarili@gmail.com' },
      ],
    },
    footer: { role: 'Doutorando em Computação Aplicada · Unisinos · DigiLabour', copy: '© 2026 Fabrício Barili' },
  },

  en: {
    htmlLang: 'en',
    nav: { pesquisas: 'Research', projetos: 'Projects', publicacoes: 'Publications', sobre: 'About', contato: 'Contact' },
    hero: {
      badge: 'DigiLabour · Unisinos',
      role: 'PhD Candidate in Applied Computing',
      tagline: 'I research how digital platforms, algorithms and technological surveillance redefine labor relations — with emphasis on the Global South.',
      btnPrimary: 'View research', btnGhost: 'Publications',
    },
    teasers: [
      { title: 'Research', text: 'Labor surveillance, platformization, privacy and technology & law in the Global South.', page: 'pesquisas.html' },
      { title: 'Projects', text: 'Reports, articles and initiatives — from Metaverse & Work to IJoC Bossware.', page: 'projetos.html' },
      { title: 'Publications', text: 'Academic articles, reports and media mentions — G1, Folha, Scielo, IJoC and more.', page: 'publicacoes.html' },
      { title: 'About', text: 'Academic background, institutional affiliations and research philosophy.', page: 'sobre.html' },
    ],
    pesquisas: {
      label: 'About', titleMain: 'Research & ', titleGrad: 'Areas of Activity',
      subtitle: 'PhD Candidate in Applied Computing at Unisinos, affiliated with the DigiLabour laboratory. My research sits at the intersection of technology, work, and rights in the Global South — investigating how digital platforms, algorithms, and data redefine labor relations and impose new regulatory challenges.',
      areas: [
        { title: 'Labor Surveillance', sub: 'Bossware & Monitoring', text: 'Investigates workplace surveillance technologies — bossware, productivity monitoring and algorithmic management. Analyzes how remote work has expanded digital control practices over workers.' },
        { title: 'Platformization', sub: 'Digital Economy & Uberization', text: 'Studies the gig economy and the uberization of work, focusing on the "self-entrepreneur" phenomenon. Examines how digital platforms restructure labor relations and transfer risks to workers.' },
        { title: 'Technology & Law', sub: 'Global South & Regulation', text: 'Explores legal impacts of emerging technologies in the Global South, including Metaverse regulation and AI use in HR management. Contributes analyses for ITS Rio and specialized legal publications.' },
        { title: 'Privacy & Data', sub: 'LGPD, IoT & Data Markets', text: 'Analyzes data privacy under LGPD, IoT device security and personal data market dynamics. Investigates tensions between technological innovation and the protection of fundamental rights.' },
      ],
    },
    projetos: { titleMain: 'Projects & ', titleGrad: 'Highlights', subtitle: 'Research, reports and initiatives at the intersection of technology, work and law.' },
    publicacoes: {
      label: 'Presence', titleMain: 'Mentions & ', titleGrad: 'Publications',
      subtitle: 'Academic articles, reports, media coverage and event participation.',
      filterAll: 'All', filterLabels: { Autor: 'Author', Entrevistado: 'Interviewed', Citado: 'Cited', Palestrante: 'Speaker', Editor: 'Editor' },
    },
    sobre: {
      badge: 'Researcher · Programmer · Communicator',
      titleMain: 'About ', titleGrad: 'Fabrício Barili',
      lead: 'Brazilian researcher, programmer and digital communication specialist whose career is defined by the intersection between technology and the social sciences.',
      bio: 'Working at the frontier between software development and critical media analysis, <strong>Fabrício Barili</strong> investigates the impacts of technology on modern society. His professional philosophy is captured in the motto <strong>"program to communicate"</strong> — uniting code with a social lens to understand how digital platforms, algorithms and technological surveillance redefine labor relations, privacy, and power.',
      timelineHeading: 'Academic Background',
      timeline: [
        { year: '2024 – 2028', title: 'PhD in Applied Computing', sub: 'PPGCA · Unisinos', desc: 'Deepens society-oriented technological models, with research in the Artificial Intelligence track. Member of the Graduate Program in Applied Computing (PPGCA) at Universidade do Vale do Rio dos Sinos.' },
        { year: '2020 – 2022', title: "Master's in Communication Sciences", sub: 'Unisinos', desc: 'Focused on algorithmic ethics, platform dynamics and the impacts of platformization on the world of work and social relations.' },
        { year: '2020', title: "Bachelor's in Digital Communication", sub: 'Unisinos', desc: 'Graduated in Digital Communication after studying Computer Science and Systems Analysis. The journey between technical and humanities fields forged his unique approach: <em>"program to communicate"</em>.' },
      ],
      affiliHeading: 'Affiliations & Networks',
      affiliations: [
        { name: 'DigiLabour', desc: 'Affiliated member of the research laboratory focused on platform labor, gig economy and digital workers\' rights.' },
        { name: 'Surveillance Studies Network', desc: 'Member of the network dedicated to studying contemporary digital surveillance mechanisms and privacy.' },
        { name: 'PPGCA — Unisinos', desc: 'PhD student in the Graduate Program in Applied Computing, Artificial Intelligence research track.' },
        { name: 'Text Games — itch.io', desc: 'Independently develops text-based and conceptual games focused on social critique on platforms like itch.io.' },
      ],
      ctaPrimary: 'Get in touch', ctaSecondary: 'View publications',
    },
    contato: {
      badge: 'Open to collaboration',
      titleMain: "Let's ", titleGrad: 'Talk',
      subtitle: 'Open to academic collaborations, journalistic interviews, event invitations and research exchanges.',
      links: [
        { label: 'LinkedIn', sub: 'fabriciobarili', href: 'https://www.linkedin.com/in/fabriciobarili' },
        { label: 'Lattes', sub: 'CNPq CV', href: 'http://lattes.cnpq.br/3905520030270558' },
        { label: 'Email', sub: 'Gmail', href: 'mailto:fabriciobarili@gmail.com' },
      ],
    },
    footer: { role: 'PhD Candidate in Applied Computing · Unisinos · DigiLabour', copy: '© 2026 Fabrício Barili' },
  },

  es: {
    htmlLang: 'es',
    nav: { pesquisas: 'Investigaciones', projetos: 'Proyectos', publicacoes: 'Publicaciones', sobre: 'Sobre', contato: 'Contacto' },
    hero: {
      badge: 'DigiLabour · Unisinos',
      role: 'Doctorando en Computación Aplicada',
      tagline: 'Investigo cómo las plataformas digitales, los algoritmos y la vigilancia tecnológica redefinen las relaciones laborales — con énfasis en el Sur Global.',
      btnPrimary: 'Ver investigaciones', btnGhost: 'Publicaciones',
    },
    teasers: [
      { title: 'Investigaciones', text: 'Vigilancia laboral, plataformización, privacidad y tecnología & derecho en el Sur Global.', page: 'pesquisas.html' },
      { title: 'Proyectos', text: 'Informes, artículos e iniciativas — del Metaverso y Trabajo al IJoC Bossware.', page: 'projetos.html' },
      { title: 'Publicaciones', text: 'Artículos académicos, informes y menciones en medios — G1, Folha, Scielo, IJoC y más.', page: 'publicacoes.html' },
      { title: 'Sobre', text: 'Trayectoria académica, vínculos institucionales y filosofía de investigación.', page: 'sobre.html' },
    ],
    pesquisas: {
      label: 'Acerca de', titleMain: 'Investigación & ', titleGrad: 'Áreas de Actuación',
      subtitle: 'Doctorando en Computación Aplicada en la Unisinos, vinculado al laboratorio DigiLabour. Mi investigación se sitúa en la intersección entre tecnología, trabajo y derechos en el Sur Global — investigando cómo las plataformas digitales, algoritmos y datos redefinen las relaciones laborales e imponen nuevos desafíos regulatorios.',
      areas: [
        { title: 'Vigilancia Laboral', sub: 'Bossware & Monitoreo', text: 'Investiga tecnologías de vigilancia en el trabajo — bossware, monitoreo de productividad y gestión algorítmica. Analiza cómo el teletrabajo amplió las prácticas de control digital sobre los trabajadores.' },
        { title: 'Plataformización', sub: 'Economía Digital & Uberización', text: 'Estudia la gig economy y la uberización del trabajo, con foco en el fenómeno del "trabajador de sí mismo". Examina cómo las plataformas digitales reestructuran las relaciones laborales y transfieren riesgos al trabajador.' },
        { title: 'Tecnología & Derecho', sub: 'Sur Global & Regulación', text: 'Explora los impactos legales de las tecnologías emergentes en el Sur Global, incluida la regulación del Metaverso y el uso de IA en la gestión de RRHH. Contribuye con análisis para el ITS Rio y publicaciones jurídicas especializadas.' },
        { title: 'Privacidad & Datos', sub: 'LGPD, IoT & Mercado de Datos', text: 'Analiza la privacidad de datos bajo la LGPD, la seguridad en dispositivos IoT y las dinámicas del mercado de datos personales. Investiga las tensiones entre innovación tecnológica y protección de derechos fundamentales.' },
      ],
    },
    projetos: { titleMain: 'Proyectos & ', titleGrad: 'Destacados', subtitle: 'Investigaciones, informes e iniciativas en la intersección entre tecnología, trabajo y derecho.' },
    publicacoes: {
      label: 'Presencia', titleMain: 'Menciones & ', titleGrad: 'Publicaciones',
      subtitle: 'Artículos académicos, informes, coberturas en medios y participaciones en eventos.',
      filterAll: 'Todos', filterLabels: { Autor: 'Autor', Entrevistado: 'Entrevistado', Citado: 'Citado', Palestrante: 'Ponente', Editor: 'Editor' },
    },
    sobre: {
      badge: 'Investigador · Programador · Comunicador',
      titleMain: 'Sobre ', titleGrad: 'Fabrício Barili',
      lead: 'Investigador, programador y especialista en comunicación digital brasileño, cuya trayectoria se destaca por la intersección entre la tecnología y las ciencias sociales.',
      bio: 'Actuando en la frontera entre el desarrollo de software y el análisis crítico de los medios, <strong>Fabrício Barili</strong> investiga los impactos de la tecnología en la sociedad moderna. Su filosofía profesional se consolidó en el lema de <strong>"programar para comunicar"</strong> — uniendo código a la mirada social para comprender cómo las plataformas digitales, algoritmos y la vigilancia tecnológica redefinen las relaciones laborales, la privacidad y el poder.',
      timelineHeading: 'Formación Académica',
      timeline: [
        { year: '2024 – 2028', title: 'Doctorado en Computación Aplicada', sub: 'PPGCA · Unisinos', desc: 'Profundiza en modelos tecnológicos orientados a la sociedad, con investigación en la línea de Inteligencia Artificial. Integra el Programa de Posgrado en Computación Aplicada (PPGCA) de la Universidade do Vale do Rio dos Sinos.' },
        { year: '2020 – 2022', title: 'Maestría en Ciencias de la Comunicación', sub: 'Unisinos', desc: 'Centró su investigación en ética algorítmica, dinámica de plataformas e impactos de la plataformización en el mundo del trabajo y las relaciones sociales.' },
        { year: '2020', title: 'Licenciatura en Comunicación Digital', sub: 'Unisinos', desc: 'Licenciado en Comunicación Digital, tras pasar por Ciencias de la Computación y Análisis de Sistemas. La trayectoria entre áreas técnicas y humanidades forjó su enfoque único: <em>"programar para comunicar"</em>.' },
      ],
      affiliHeading: 'Vínculos y Colectivos',
      affiliations: [
        { name: 'DigiLabour', desc: 'Miembro afiliado del laboratorio de investigación enfocado en el trabajo en plataformas, gig economy y derechos de los trabajadores digitales.' },
        { name: 'Surveillance Studies Network', desc: 'Integrante de la red dedicada al estudio de los mecanismos contemporáneos de vigilancia digital y privacidad.' },
        { name: 'PPGCA — Unisinos', desc: 'Doctorando en el Programa de Posgrado en Computación Aplicada, línea de investigación de Inteligencia Artificial.' },
        { name: 'Juegos Textuales — itch.io', desc: 'Desarrolla de forma independiente juegos textuales y conceptuales orientados a la crítica social en plataformas como itch.io.' },
      ],
      ctaPrimary: 'Ponerse en contacto', ctaSecondary: 'Ver publicaciones',
    },
    contato: {
      badge: 'Abierto a colaboraciones',
      titleMain: '¡', titleGrad: 'Hablemos',
      subtitle: 'Abierto a colaboraciones académicas, entrevistas periodísticas, invitaciones a eventos e intercambios de investigación.',
      links: [
        { label: 'LinkedIn', sub: 'fabriciobarili', href: 'https://www.linkedin.com/in/fabriciobarili' },
        { label: 'Lattes', sub: 'CV CNPq', href: 'http://lattes.cnpq.br/3905520030270558' },
        { label: 'Email', sub: 'Gmail', href: 'mailto:fabriciobarili@gmail.com' },
      ],
    },
    footer: { role: 'Doctorando en Computación Aplicada · Unisinos · DigiLabour', copy: '© 2026 Fabrício Barili' },
  },
};

const T = TRANSLATIONS[LANG];

/* ========================================================
   SVG ICONS
   ======================================================== */
const ICONS = {
  eye:    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  globe:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
  users:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  game:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M7 12h.01M17 12h.01"/></svg>`,
  book:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  network:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><path d="M6 6h4M14 6h4M6 18h4M14 18h4M12 10v4"/></svg>`,
  lock:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  world:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Z"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"/></svg>`,
  screen: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  grid:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  person: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  books:  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  mail:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
};

/* ========================================================
   DATA — PROJECTS
   ======================================================== */
const PROJECTS_DATA = {
  pt: [
    { title: 'Metaverso e Trabalho', subtitle: 'ITS Rio / diVerso', text: 'Relatório sobre regulação do metaverso com foco nas condições de trabalho e desafios jurídicos para o Sul Global, produzido em coautoria com Marcos Oliveira para o laboratório diVerso do ITS Rio.', tags: ['ITS Rio', 'diVerso', 'Regulação', 'Sul Global'], icon: ICONS.globe },
    { title: 'IA e Recursos Humanos', subtitle: 'Revista Ejud TRT4', text: 'Artigo científico analisando os impactos da inteligência artificial na gestão de pessoas, publicado na Revista da Escola Judicial do TRT da 4ª Região.', tags: ['IA', 'RH', 'Direito do Trabalho', 'TRT4'], icon: ICONS.users },
    { title: 'Jornada do Trabalhador de Si Mesmo', subtitle: 'Workers Game Jam', text: 'Jogo sério que gamifica a precarização do trabalho e a lógica do empreendedorismo de si mesmo na economia de plataformas, desenvolvido na Workers Game Jam.', tags: ['Serious Game', 'Precarização', 'Plataformas', 'Game Jam'], icon: ICONS.game },
    { title: 'Seção Especial IJoC — Bossware', subtitle: 'International Journal of Communication', text: 'Editor convidado e autor de seção especial no International Journal of Communication (IJoC) dedicada à vigilância laboral e bossware no contexto do teletrabalho.', tags: ['IJoC', 'Vigilância', 'Bossware', 'Editor Convidado'], icon: ICONS.book },
  ],
  en: [
    { title: 'Metaverse and Work', subtitle: 'ITS Rio / diVerso', text: 'Report on Metaverse regulation focusing on working conditions and legal challenges for the Global South, co-authored with Marcos Oliveira for ITS Rio\'s diVerso lab.', tags: ['ITS Rio', 'diVerso', 'Regulation', 'Global South'], icon: ICONS.globe },
    { title: 'AI and Human Resources', subtitle: 'Ejud Journal TRT4', text: 'Academic article analyzing the impacts of artificial intelligence on people management, published in the Judicial School Journal of the TRT 4th Region.', tags: ['AI', 'HR', 'Labor Law', 'TRT4'], icon: ICONS.users },
    { title: 'Journey of the Self-Entrepreneur', subtitle: 'Workers Game Jam', text: 'Serious game that gamifies labor precarity and the self-entrepreneurship logic in the platform economy, developed at the Workers Game Jam.', tags: ['Serious Game', 'Precarity', 'Platforms', 'Game Jam'], icon: ICONS.game },
    { title: 'IJoC Special Section — Bossware', subtitle: 'International Journal of Communication', text: 'Guest editor and author of a special section in the IJoC dedicated to labor surveillance and bossware in the context of remote work.', tags: ['IJoC', 'Surveillance', 'Bossware', 'Guest Editor'], icon: ICONS.book },
  ],
  es: [
    { title: 'Metaverso y Trabajo', subtitle: 'ITS Rio / diVerso', text: 'Informe sobre regulación del metaverso con foco en las condiciones de trabajo y los desafíos jurídicos para el Sur Global, coautoría con Marcos Oliveira para el laboratorio diVerso del ITS Rio.', tags: ['ITS Rio', 'diVerso', 'Regulación', 'Sur Global'], icon: ICONS.globe },
    { title: 'IA y Recursos Humanos', subtitle: 'Revista Ejud TRT4', text: 'Artículo científico que analiza los impactos de la inteligencia artificial en la gestión de personas, publicado en la Revista de la Escuela Judicial del TRT de la 4ª Región.', tags: ['IA', 'RRHH', 'Derecho Laboral', 'TRT4'], icon: ICONS.users },
    { title: 'Jornada del Trabajador de Sí Mismo', subtitle: 'Workers Game Jam', text: 'Juego serio que gamifica la precarización laboral y la lógica del emprendimiento de sí mismo en la economía de plataformas, desarrollado en la Workers Game Jam.', tags: ['Serious Game', 'Precarización', 'Plataformas', 'Game Jam'], icon: ICONS.game },
    { title: 'Sección Especial IJoC — Bossware', subtitle: 'International Journal of Communication', text: 'Editor invitado y autor de sección especial en el IJoC dedicada a la vigilancia laboral y bossware en el contexto del teletrabajo.', tags: ['IJoC', 'Vigilancia', 'Bossware', 'Editor Invitado'], icon: ICONS.book },
  ],
};
const PROJECTS = PROJECTS_DATA[LANG];

/* ========================================================
   DATA — MENTIONS
   ======================================================== */
const MENTIONS_BASE = [
  {
    title: 'Cliques, tempo em reunião e monitoramento de tela ao vivo: os programas que vigiam funcionários em home office',
    outlet: 'G1 / Globo', year: '2025', role: 'Entrevistado',
    url: 'https://g1.globo.com/trabalho-e-carreira/noticia/2025/09/19/cliques-tempo-em-reuniao-e-monitoramento-de-tela-ao-vivo-os-programas-que-vigiam-funcionarios-em-home-office.ghtml',
    tags: ['bossware', 'vigilância laboral', 'home office', 'monitoramento'],
    desc: {
      pt: 'Reportagem do G1 sobre softwares de monitoramento de funcionários em home office. Fabrício Barili é entrevistado como especialista em vigilância laboral digital e bossware.',
      en: 'G1 news report on home office monitoring software including click tracking, screenshots and meeting time control. Fabrício Barili is interviewed as a labor surveillance and bossware expert.',
      es: 'Reportaje de G1 sobre softwares de monitoreo de empleados en home office. Fabrício Barili es entrevistado como experto en vigilancia laboral digital y bossware.',
    },
  },
  {
    title: 'Gamificação no transporte por app: motivação ou ilusão para motoristas?',
    outlet: 'Economia SP', year: '2025', role: 'Entrevistado',
    url: 'https://economiasp.com/2025/02/28/gamificacao-no-transporte-por-app-motivacao-ou-ilusao-para-motoristas/',
    tags: ['gamificação', 'uberização', 'plataformas', 'trabalho por app'],
    desc: {
      pt: 'Análise sobre o uso de gamificação por plataformas de transporte. Fabrício Barili é consultado sobre a dinâmica de controle disfarçado de motivação no trabalho por app.',
      en: 'Analysis on the use of gamification by transport platforms like Uber and 99. Fabrício Barili is consulted on the dynamics of control disguised as motivation in app-based work.',
      es: 'Análisis sobre el uso de gamificación por plataformas de transporte. Fabrício Barili es consultado sobre la dinámica de control disfrazado de motivación en el trabajo por app.',
    },
  },
  {
    title: 'Caso Itaú: regras do home office no Brasil são menos claras que na Europa',
    outlet: 'UOL Economia', year: '2025', role: 'Entrevistado',
    url: 'https://economia.uol.com.br/colunas/carlos-juliano-barros/2025/09/16/caso-itau-regras-do-home-office-no-brasil-sao-menos-claras-que-na-europa.htm',
    tags: ['home office', 'regulação', 'direito do trabalho', 'teletrabalho'],
    desc: {
      pt: 'Coluna sobre as controvérsias da política de home office do Itaú e a comparação com a legislação europeia. Fabrício Barili comenta o cenário regulatório do teletrabalho.',
      en: 'Column on the controversies around Itaú\'s home office policy compared with European regulation. Fabrício Barili comments on the Brazilian telecommuting regulatory landscape.',
      es: 'Columna sobre las controversias en torno a la política de home office del Itaú y comparación con la legislación europea. Fabrício Barili comenta el panorama regulatorio del teletrabajo en Brasil.',
    },
  },
  {
    title: 'Plataformas de vigilância do trabalho se tornaram o panóptico supostamente necessário',
    outlet: 'O Plano B', year: '2025', role: 'Entrevistado',
    url: 'https://oplanob.com/plataformas-de-vigilancia-do-trabalho-se-tornaram-o-panoptico-supostamente-necessario/',
    tags: ['panóptico', 'vigilância laboral', 'privacidade', 'trabalho digital'],
    desc: {
      pt: 'Análise sobre como plataformas de monitoramento replicam a lógica do panóptico no ambiente digital. Fabrício Barili contribui com perspectiva crítica sobre vigilância algorítmica.',
      en: 'Analysis of how work monitoring platforms replicate Bentham\'s Panopticon logic in the digital environment. Fabrício Barili contributes a critical perspective on algorithmic surveillance.',
      es: 'Análisis sobre cómo las plataformas de monitoreo laboral replican la lógica del panóptico en el entorno digital. Fabrício Barili aporta una perspectiva crítica sobre la vigilancia algorítmica.',
    },
  },
  {
    title: 'Startups usam inteligência artificial para testar e contratar desenvolvedores',
    outlet: 'Folha de S.Paulo', year: '2024', role: 'Entrevistado',
    url: 'https://www1.folha.uol.com.br/mpme/2024/03/startups-usam-inteligencia-artificial-para-testar-e-contratar-desenvolvedores.shtml',
    tags: ['IA', 'recrutamento', 'trabalho', 'algoritmos'],
    desc: {
      pt: 'Reportagem sobre o crescente uso de IA por startups para triagem e contratação de desenvolvedores. Fabrício Barili é entrevistado sobre riscos e impactos dos algoritmos em processos seletivos.',
      en: 'Reportage on the growing use of AI by startups for developer screening and hiring. Fabrício Barili is interviewed about the risks and impacts of algorithmic recruitment processes.',
      es: 'Reportaje sobre el creciente uso de IA por startups para la selección y contratación de desarrolladores. Fabrício Barili es entrevistado sobre los riesgos e impactos de los algoritmos en los procesos de selección.',
    },
  },
  {
    title: 'Trabalheira #18: como a inteligência artificial reforça preconceitos no RH',
    outlet: 'Reporter Brasil / UOL', year: '2023', role: 'Entrevistado',
    url: 'https://reporterbrasil.org.br/2023/04/trabalheira-18-como-a-inteligencia-artificial-reforca-preconceitos-no-rh/',
    tags: ['IA', 'RH', 'viés algorítmico', 'trabalho'],
    desc: {
      pt: 'Coluna sobre os riscos do uso de IA na gestão de recursos humanos, incluindo a reprodução de vieses discriminatórios em sistemas de triagem. Fabrício Barili é consultado como especialista.',
      en: 'Column on the risks of using AI in HR management — including the reproduction of discriminatory biases in candidate screening systems. Fabrício Barili is a specialist source.',
      es: 'Columna sobre los riesgos del uso de IA en la gestión de recursos humanos — incluida la reproducción de sesgos discriminatorios en sistemas de selección. Fabrício Barili es fuente especialista.',
    },
  },
  {
    title: 'Metaverso e Trabalho — Relatório ITS Rio',
    outlet: 'ITS Rio / diVerso', year: '2023', role: 'Autor',
    url: 'https://itsrio.org/pt/publicacoes/metaverso-e-trabalho/',
    tags: ['metaverso', 'trabalho', 'sul global', 'regulação', 'privacidade'],
    desc: {
      pt: 'Relatório de coautoria com Marcos Oliveira para o laboratório diVerso do ITS Rio, analisando as implicações do metaverso no mundo do trabalho com ênfase no Sul Global: regulação, privacidade, proteção de dados e identidades digitais.',
      en: 'Co-authored report with Marcos Oliveira for ITS Rio\'s diVerso lab. Analyzes metaverse implications for the world of work with emphasis on the Global South: labor regulation, privacy, data protection, and digital identities.',
      es: 'Informe de coautoría con Marcos Oliveira para el laboratorio diVerso del ITS Rio. Analiza las implicaciones del metaverso en el mundo del trabajo con énfasis en el Sur Global: regulación laboral, privacidad, protección de datos e identidades digitales.',
    },
  },
  {
    title: 'Bossware chapter — The SAGE Handbook of Digital Labour',
    outlet: 'SAGE Publications', year: '2023', role: 'Autor',
    url: 'https://sk.sagepub.com/hnbk/edvol/the-sage-handbook-of-digital-labour/front-matter/i180#_',
    tags: ['bossware', 'vigilância laboral', 'trabalho digital', 'publicação acadêmica'],
    desc: {
      pt: 'Capítulo no The SAGE Handbook of Digital Labour sobre bossware e tecnologias de vigilância no contexto do trabalho remoto e plataformizado.',
      en: 'Chapter in The SAGE Handbook of Digital Labour on bossware and surveillance technologies in the context of remote and platformized work.',
      es: 'Capítulo en The SAGE Handbook of Digital Labour sobre bossware y tecnologías de vigilancia en el contexto del trabajo remoto y plataformizado.',
    },
  },
  {
    title: 'Artigo na Revista Galaxia (Scielo / PUC SP)',
    outlet: 'Revista Galaxia — Scielo', year: '2023', role: 'Autor',
    url: 'https://www.scielo.br/j/gal/a/TfWsYqXH5zbDCMhLDDjS7yC/abstract/?lang=pt',
    tags: ['publicação acadêmica', 'plataformas', 'trabalho', 'comunicação'],
    desc: {
      pt: 'Artigo científico publicado na Revista Galaxia da PUC-SP (Scielo), abordando plataformas digitais, trabalho e comunicação com foco no Sul Global.',
      en: 'Academic article published in Galaxia Journal at PUC-SP, indexed in Scielo, addressing digital platforms, work and communication with focus on the Global South.',
      es: 'Artículo académico publicado en la Revista Galaxia de la PUC-SP, indexada en Scielo, sobre plataformas digitales, trabajo y comunicación con foco en el Sur Global.',
    },
  },
  {
    title: 'Publicação na Revista Galaxia — PUC SP',
    outlet: 'Revista Galaxia', year: '2023', role: 'Autor',
    url: 'https://revistas.pucsp.br/index.php/galaxia/article/view/58117',
    tags: ['publicação acadêmica', 'trabalho digital', 'comunicação', 'PUC SP'],
    desc: {
      pt: 'Artigo científico na Revista Galaxia da PUC-SP abordando aspectos da digitalização do trabalho e suas implicações sociais e jurídicas no contexto latino-americano.',
      en: 'Scientific article in Galaxia Journal at PUC-SP addressing aspects of the digitization of work and its social and legal implications in the Latin American context.',
      es: 'Artículo científico en la Revista Galaxia de la PUC-SP sobre aspectos de la digitalización del trabajo y sus implicaciones sociales y jurídicas en el contexto latinoamericano.',
    },
  },
  {
    title: 'IJoC — Seção Especial sobre Vigilância Laboral e Bossware',
    outlet: 'International Journal of Communication', year: '2023', role: 'Editor',
    url: 'https://ijoc.org/index.php/ijoc/article/view/21365',
    tags: ['IJoC', 'bossware', 'vigilância laboral', 'editor convidado'],
    desc: {
      pt: 'Edição e autoria de seção especial no IJoC dedicada à vigilância laboral e bossware. Uma das publicações de maior impacto na área de comunicação e trabalho digital.',
      en: 'Edition and authorship of a special section in the IJoC dedicated to labor surveillance and bossware. One of the highest-impact publications in digital labor communication research.',
      es: 'Edición y autoría de sección especial en el IJoC dedicada a la vigilancia laboral y bossware. Una de las publicaciones de mayor impacto en el área de comunicación y trabajo digital.',
    },
  },
  {
    title: 'IA na gestão de RH — Revista Ejud TRT4',
    outlet: 'Revista Ejud — TRT 4ª Região', year: '2023', role: 'Autor',
    url: 'https://periodicos.trt4.jus.br/revistaejud4/article/view/943',
    tags: ['IA', 'RH', 'direito do trabalho', 'publicação jurídica'],
    desc: {
      pt: 'Artigo na Revista Ejud do TRT4 analisando o uso de IA em processos de gestão de pessoas sob a perspectiva do Direito do Trabalho.',
      en: 'Article in the TRT4 Judicial School Journal analyzing the use of AI in people management processes from a Labor Law perspective.',
      es: 'Artículo en la Revista Ejud del TRT4 sobre el uso de IA en procesos de gestión de personas desde la perspectiva del Derecho Laboral.',
    },
  },
  {
    title: 'Publicação CONPEDI — Direito e Tecnologia',
    outlet: 'CONPEDI', year: '2023', role: 'Autor',
    url: 'https://site.conpedi.org.br/publicacoes/s5y6p2k5/au81231e/KfD3CtGhVoGUr32v.pdf',
    tags: ['direito', 'tecnologia', 'plataformas', 'CONPEDI'],
    desc: {
      pt: 'Artigo nos anais do CONPEDI discutindo intersecções entre direito, tecnologia e relações de trabalho na era das plataformas digitais.',
      en: 'Article in CONPEDI proceedings discussing intersections between law, technology and labor relations in the platform economy era.',
      es: 'Artículo en las actas del CONPEDI que discute intersecciones entre derecho, tecnología y relaciones laborales en la era de las plataformas digitales.',
    },
  },
  {
    title: 'Podcast ITS Rio: Metaverso e Trabalho',
    outlet: 'ITS Rio / Spotify', year: '2023', role: 'Palestrante',
    url: 'https://open.spotify.com/episode/2cRoEn5PKWzNboKY0MaNj5',
    tags: ['metaverso', 'podcast', 'sul global', 'ITS Rio'],
    desc: {
      pt: 'Episódio do podcast do ITS Rio em que Fabrício Barili e Marcos Oliveira discutem o relatório "Metaverso e Trabalho", abordando implicações do metaverso no Sul Global. Disponível no Spotify.',
      en: 'ITS Rio podcast episode where Fabrício Barili and Marcos Oliveira discuss the "Metaverse and Work" report, addressing its implications in the Global South. Available on Spotify.',
      es: 'Episodio del podcast del ITS Rio en el que Fabrício Barili y Marcos Oliveira discuten el informe "Metaverso y Trabajo", abordando sus implicaciones en el Sur Global. Disponible en Spotify.',
    },
  },
  {
    title: 'Cabine de Home Office Stefanini — vigilância no teletrabalho',
    outlet: 'Manual do Usuário', year: '2022', role: 'Entrevistado',
    url: 'https://manualdousuario.net/stefanini-cabine-home-office/',
    tags: ['bossware', 'teletrabalho', 'monitoramento', 'privacidade'],
    desc: {
      pt: 'Reportagem sobre a cabine de home office monitorada da Stefanini. Fabrício Barili comenta os limites éticos e jurídicos do monitoramento de trabalhadores remotos.',
      en: 'Reportage on Stefanini\'s monitored home office cabin. Fabrício Barili comments on the ethical and legal limits of remote worker monitoring.',
      es: 'Reportaje sobre la cabina de home office monitorada de Stefanini. Fabrício Barili comenta los límites éticos y jurídicos del monitoreo de trabajadores remotos.',
    },
  },
  {
    title: 'Um jogo para pensar na uberização do trabalho',
    outlet: 'Mescla', year: '2020', role: 'Citado',
    url: 'https://mescla.cc/2020/08/06/um-jogo-para-pensar-na-uberizacao-do-trabalho/',
    tags: ['serious game', 'uberização', 'plataformas', 'trabalhador de si mesmo'],
    desc: {
      pt: 'Cobertura do jogo "Jornada do Trabalhador de Si Mesmo" da Workers Game Jam, que usa mecânicas de jogo para explorar criticamente a precarização laboral na economia de plataformas.',
      en: 'Coverage of the "Journey of the Self-Entrepreneur" game from the Workers Game Jam, which uses game mechanics to critically explore labor precarity in the platform economy.',
      es: 'Cobertura del juego "Jornada del Trabajador de Sí Mismo" de la Workers Game Jam, que usa mecánicas de juego para explorar críticamente la precarización laboral en la economía de plataformas.',
    },
  },
  {
    title: 'Encontro das Cooperativas de Plataforma de Mobilidade Urbana',
    outlet: 'Casa Cooperativa', year: '2023', role: 'Palestrante',
    url: 'https://www.casacooperativa.com.br/noticias/encontro-das-cooperativas-de-plataforma-de-mobilidade-urbana-sera-realizado-em-nova-petropolis',
    tags: ['cooperativas de plataforma', 'mobilidade urbana', 'uberização', 'evento'],
    desc: {
      pt: 'Participação como palestrante no Encontro em Nova Petrópolis/RS, debatendo alternativas cooperativistas frente à uberização do transporte urbano.',
      en: 'Participation as a speaker at the Platform Cooperatives for Urban Mobility meeting in Nova Petrópolis/RS, debating cooperative alternatives to the uberization of urban transport.',
      es: 'Participación como ponente en el Encuentro de Cooperativas de Plataforma de Movilidad Urbana en Nova Petrópolis/RS, debatiendo alternativas cooperativistas frente a la uberización del transporte.',
    },
  },
  {
    title: 'Projeto Draft — Coberturas e Artigos',
    outlet: 'Projeto Draft', year: '2023', role: 'Citado',
    url: 'https://www.projetodraft.com/tag/fabricio-barili/',
    tags: ['trabalho digital', 'inovação', 'plataformas', 'mídia'],
    desc: {
      pt: 'Página de tag do Projeto Draft reunindo coberturas e menções a Fabrício Barili em publicações sobre empreendedorismo, inovação e o futuro do trabalho.',
      en: 'Projeto Draft tag page collecting coverage and mentions of Fabrício Barili in publications about entrepreneurship, innovation and the future of work in the digital economy.',
      es: 'Página de etiqueta del Proyecto Draft que reúne coberturas y menciones a Fabrício Barili en publicaciones sobre emprendimiento, innovación y el futuro del trabajo en la economía digital.',
    },
  },
];

const MENTIONS = MENTIONS_BASE.map(m => ({
  title: m.title, outlet: m.outlet, year: m.year,
  role: m.role, roleLabel: T.publicacoes.filterLabels[m.role] || m.role,
  description: m.desc[LANG], tags: m.tags, url: m.url,
}));

/* ========================================================
   RENDER — NAVBAR + FOOTER
   ======================================================== */
function renderNavbar() {
  const el = document.getElementById('navbar-placeholder');
  if (!el) return;
  const n = T.nav;
  el.innerHTML = `
    <div class="container navbar__inner">
      <a href="${langUrl('pt').replace(/[^/]*$/, '') || ''}index.html" class="navbar__brand">Fabrício Barili</a>
      <nav class="navbar__nav" id="nav-menu" aria-label="Navegação principal">
        <a href="pesquisas.html" class="nav-link" data-page="pesquisas.html">${n.pesquisas}</a>
        <a href="projetos.html" class="nav-link" data-page="projetos.html">${n.projetos}</a>
        <a href="publicacoes.html" class="nav-link" data-page="publicacoes.html">${n.publicacoes}</a>
        <a href="sobre.html" class="nav-link" data-page="sobre.html">${n.sobre}</a>
        <a href="contato.html" class="nav-link" data-page="contato.html">${n.contato}</a>
        <div class="lang-switcher" aria-label="Selecionar idioma">
          <a href="${langUrl('pt')}" class="lang-btn${LANG==='pt'?' active':''}" lang="pt-BR">PT</a>
          <a href="${langUrl('en')}" class="lang-btn${LANG==='en'?' active':''}" lang="en">EN</a>
          <a href="${langUrl('es')}" class="lang-btn${LANG==='es'?' active':''}" lang="es">ES</a>
        </div>
      </nav>
      <button class="navbar__toggle" id="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav-menu">
        <span class="hamburger"></span><span class="hamburger"></span><span class="hamburger"></span>
      </button>
    </div>`;
}

function renderFooter() {
  const el = document.getElementById('footer-placeholder');
  if (!el) return;
  el.innerHTML = `
    <div class="container footer__inner">
      <span class="footer__name gradient-text">Fabrício Barili</span>
      <p class="footer__role">${T.footer.role}</p>
      <p class="footer__copy">${T.footer.copy}</p>
    </div>`;
}

/* ========================================================
   RENDER — INDEX
   ======================================================== */
function renderHero() {
  const el = document.getElementById('hero-content');
  if (!el) return;
  const h = T.hero;
  el.innerHTML = `
    <span class="badge">${h.badge}</span>
    <h1 class="hero__name">Fabrício <span class="gradient-text">Barili</span></h1>
    <p class="hero__role">${h.role}</p>
    <p class="hero__tagline">${h.tagline}</p>
    <div class="hero__actions">
      <a href="pesquisas.html" class="btn btn--primary">${h.btnPrimary}</a>
      <a href="publicacoes.html" class="btn btn--ghost">${h.btnGhost}</a>
    </div>`;
}

function renderTeasers() {
  const el = document.getElementById('teasers-grid');
  if (!el) return;
  const teaserIcons = [ICONS.search, ICONS.grid, ICONS.books, ICONS.person];
  el.innerHTML = T.teasers.map((t, i) => `
    <a href="${t.page}" class="card card--link">
      <div class="card__icon">${teaserIcons[i]}</div>
      <h2 class="card__title">${t.title}</h2>
      <p class="card__text">${t.text}</p>
    </a>`).join('');
}

/* ========================================================
   RENDER — PESQUISAS
   ======================================================== */
function renderResearch() {
  const header = document.getElementById('page-header');
  const grid   = document.getElementById('research-grid');
  if (!header || !grid) return;
  const p = T.pesquisas;
  header.innerHTML = `
    ${p.label ? `<span class="section__label">${p.label}</span>` : ''}
    <h1 class="section__title">${p.titleMain}<span class="gradient-text">${p.titleGrad}</span></h1>
    <p class="section__subtitle">${p.subtitle}</p>`;
  const areaIcons = [ICONS.eye, ICONS.network, ICONS.world, ICONS.lock];
  grid.innerHTML = p.areas.map((a, i) => `
    <article class="card reveal">
      <div class="card__icon">${areaIcons[i]}</div>
      <h2 class="card__title">${a.title}</h2>
      <p class="card__subtitle">${a.sub}</p>
      <p class="card__text">${a.text}</p>
    </article>`).join('');
}

/* ========================================================
   RENDER — PROJETOS
   ======================================================== */
function renderProjects() {
  const header = document.getElementById('page-header');
  const grid   = document.getElementById('projects-grid');
  if (!grid) return;
  const p = T.projetos;
  if (header) header.innerHTML = `
    <h1 class="section__title">${p.titleMain}<span class="gradient-text">${p.titleGrad}</span></h1>
    <p class="section__subtitle">${p.subtitle}</p>`;
  grid.innerHTML = PROJECTS.map(pr => `
    <article class="card reveal">
      <div class="card__icon">${pr.icon}</div>
      <h3 class="card__title">${pr.title}</h3>
      <p class="card__subtitle">${pr.subtitle}</p>
      <p class="card__text">${pr.text}</p>
      <div class="card__tags">${pr.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </article>`).join('');
}

/* ========================================================
   RENDER — PUBLICAÇÕES
   ======================================================== */
function renderFilterTabs() {
  const el = document.getElementById('filter-tabs');
  if (!el) return;
  const pub = T.publicacoes;
  const roles = ['Autor', 'Entrevistado', 'Citado', 'Palestrante', 'Editor'];
  el.innerHTML = `<button class="filter-tab active" data-filter="all" role="tab" aria-selected="true">${pub.filterAll}</button>` +
    roles.map(r => `<button class="filter-tab" data-filter="${r}" role="tab" aria-selected="false">${pub.filterLabels[r]}</button>`).join('');
}

function renderMentions(filter) {
  const list = document.getElementById('mentions-list');
  if (!list) return;
  const visible = (!filter || filter === 'all') ? MENTIONS : MENTIONS.filter(m => m.role === filter);
  list.innerHTML = visible.map(m => `
    <li class="mention-item" data-role="${m.role}">
      <a href="${m.url}" target="_blank" rel="noopener noreferrer">
        <div class="mention-item__top">
          <h3 class="mention-item__title">${m.title}</h3>
          <span class="role-badge">${m.roleLabel}</span>
        </div>
        <p class="mention-item__meta">${m.outlet}${m.year ? ' · ' + m.year : ''}</p>
        <p class="mention-item__desc">${m.description}</p>
        <div class="mention-item__tags">${m.tags.map(t => `<span class="tag tag--hash">${t}</span>`).join('')}</div>
      </a>
    </li>`).join('');
}

function renderPublicacoesHeader() {
  const el = document.getElementById('page-header');
  if (!el) return;
  const pub = T.publicacoes;
  el.innerHTML = `
    <span class="section__label">${pub.label}</span>
    <h1 class="section__title">${pub.titleMain}<span class="gradient-text">${pub.titleGrad}</span></h1>
    <p class="section__subtitle">${pub.subtitle}</p>`;
}

/* ========================================================
   RENDER — SOBRE
   ======================================================== */
function renderAbout() {
  const s = T.sobre;

  const heroContent = document.getElementById('sobre-hero-content');
  if (heroContent) heroContent.innerHTML = `
    <span class="badge">${s.badge}</span>
    <h1 class="sobre-hero__title">${s.titleMain}<span class="gradient-text">${s.titleGrad}</span></h1>
    <p class="sobre-hero__lead">${s.lead}</p>`;

  const bio = document.getElementById('bio-container');
  if (bio) bio.innerHTML = s.bio;

  const tHead = document.getElementById('timeline-heading');
  if (tHead) tHead.textContent = s.timelineHeading;

  const timeline = document.getElementById('timeline-container');
  if (timeline) timeline.innerHTML = s.timeline.map((t, i, arr) => `
    <div class="timeline-item">
      <div class="timeline-item__line">
        <div class="timeline-dot"></div>
        ${i < arr.length - 1 ? '<div class="timeline-connector"></div>' : ''}
      </div>
      <div class="timeline-content">
        <p class="timeline-year">${t.year}</p>
        <h3 class="timeline-title">${t.title}</h3>
        <p class="timeline-sub">${t.sub}</p>
        <p class="timeline-desc">${t.desc}</p>
      </div>
    </div>`).join('');

  const aHead = document.getElementById('affil-heading');
  if (aHead) aHead.textContent = s.affiliHeading;

  const affiliIcons = [ICONS.network, ICONS.eye, ICONS.screen, ICONS.game];
  const affil = document.getElementById('affil-container');
  if (affil) affil.innerHTML = s.affiliations.map((a, i) => `
    <div class="affil-card">
      <div class="affil-icon">${affiliIcons[i]}</div>
      <div><p class="affil-name">${a.name}</p><p class="affil-desc">${a.desc}</p></div>
    </div>`).join('');

  const cta = document.getElementById('sobre-cta');
  if (cta) cta.innerHTML = `
    <a href="contato.html" class="btn btn--primary">${s.ctaPrimary}</a>
    &nbsp;
    <a href="publicacoes.html" class="btn btn--ghost">${s.ctaSecondary}</a>`;
}

/* ========================================================
   RENDER — CONTATO
   ======================================================== */
function renderContact() {
  const el = document.getElementById('contato-hero');
  if (!el) return;
  const c = T.contato;
  const contactIcons = [ICONS.linkedin, ICONS.books, ICONS.mail];
  el.innerHTML = `
    <span class="badge">${c.badge}</span>
    <h1 class="contato-hero__title">${c.titleMain}<span class="gradient-text">${c.titleGrad}</span></h1>
    <p class="contato-hero__sub">${c.subtitle}</p>
    <div class="contact-links">
      ${c.links.map((l, i) => `
        <a href="${l.href}" ${l.href.startsWith('mailto') ? '' : 'target="_blank" rel="noopener noreferrer"'} class="contact-card">
          ${contactIcons[i]}
          <span>${l.label}</span>
          <small>${l.sub}</small>
        </a>`).join('')}
    </div>`;
}

/* ========================================================
   INIT FUNCTIONS
   ======================================================== */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

function initActiveNav() {
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === CURRENT_PAGE);
  });
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar-placeholder');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 8 ? '0 2px 20px rgba(0,0,0,.4)' : '';
  }, { passive: true });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

function initFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      renderMentions(tab.dataset.filter);
    });
  });
}

/* ========================================================
   BOOT
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();

  if (document.getElementById('hero-content'))    { renderHero(); renderTeasers(); }
  if (document.getElementById('research-grid'))   renderResearch();
  if (document.getElementById('projects-grid'))   renderProjects();
  if (document.getElementById('mentions-list'))   { renderPublicacoesHeader(); renderFilterTabs(); renderMentions('all'); initFilters(); }
  if (document.getElementById('bio-container'))   renderAbout();
  if (document.getElementById('contato-hero'))    renderContact();

  initMobileNav();
  initActiveNav();
  initNavbarScroll();

  requestAnimationFrame(() => {
    document.querySelectorAll('.card, .mention-item, .section__header').forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
    });
    initReveal();
  });
});
