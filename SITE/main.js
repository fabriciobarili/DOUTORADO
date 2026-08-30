/* ========================================================
   DATA — Edit these arrays to add/remove content
   ======================================================== */

const PROJECTS = [
  {
    title: "Metaverso e Trabalho",
    subtitle: "ITS Rio / diVerso",
    text: "Relatório sobre regulação do metaverso com foco nas condições de trabalho e desafios jurídicos para o Sul Global, produzido em coautoria com Marcos Oliveira para o laboratório diVerso do ITS Rio.",
    tags: ["ITS Rio", "diVerso", "Regulação", "Sul Global"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
  },
  {
    title: "IA e Recursos Humanos",
    subtitle: "Revista Ejud TRT4",
    text: "Artigo científico analisando os impactos da inteligência artificial na gestão de pessoas, publicado na Revista da Escola Judicial do TRT da 4ª Região.",
    tags: ["IA", "RH", "Direito do Trabalho", "TRT4"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  {
    title: "Jornada do Trabalhador de Si Mesmo",
    subtitle: "Workers Game Jam",
    text: "Jogo sério que gamifica a precarização do trabalho e a lógica do empreendedorismo de si mesmo na economia de plataformas, desenvolvido na Workers Game Jam.",
    tags: ["Serious Game", "Precarização", "Plataformas", "Game Jam"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01M7 12h.01M17 12h.01"/></svg>`,
  },
  {
    title: "Seção Especial IJoC — Bossware",
    subtitle: "International Journal of Communication",
    text: "Editor convidado e autor de seção especial no International Journal of Communication (IJoC) dedicada à vigilância laboral e bossware no contexto do teletrabalho.",
    tags: ["IJoC", "Vigilância", "Bossware", "Editor Convidado"],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  },
];

/* ----------------------------------------------------------------
   MENTIONS — adicione um objeto para incluir nova entrada.
   role: Autor | Entrevistado | Citado | Palestrante | Editor
   ---------------------------------------------------------------- */
const MENTIONS = [
  {
    title: "Cliques, tempo em reunião e monitoramento de tela ao vivo: os programas que vigiam funcionários em home office",
    outlet: "G1 / Globo",
    year: "2025",
    role: "Entrevistado",
    description: "Reportagem do G1 sobre softwares de monitoramento de funcionários em home office. Fabrício Barili é entrevistado como especialista em vigilância laboral digital e bossware.",
    tags: ["bossware", "vigilância laboral", "home office", "monitoramento"],
    url: "https://g1.globo.com/trabalho-e-carreira/noticia/2025/09/19/cliques-tempo-em-reuniao-e-monitoramento-de-tela-ao-vivo-os-programas-que-vigiam-funcionarios-em-home-office.ghtml",
  },
  {
    title: "Gamificação no transporte por app: motivação ou ilusão para motoristas?",
    outlet: "Economia SP",
    year: "2025",
    role: "Entrevistado",
    description: "Análise sobre o uso de gamificação por plataformas de transporte. Fabrício Barili é consultado sobre a dinâmica de controle disfarçado de motivação no trabalho por app.",
    tags: ["gamificação", "uberização", "plataformas", "trabalho por app"],
    url: "https://economiasp.com/2025/02/28/gamificacao-no-transporte-por-app-motivacao-ou-ilusao-para-motoristas/",
  },
  {
    title: "Caso Itaú: regras do home office no Brasil são menos claras que na Europa",
    outlet: "UOL Economia",
    year: "2025",
    role: "Entrevistado",
    description: "Coluna de Carlos Juliano Barros sobre as controvérsias da política de home office do Itaú e a comparação com a legislação europeia. Fabrício Barili comenta o cenário regulatório do teletrabalho.",
    tags: ["home office", "regulação", "direito do trabalho", "teletrabalho"],
    url: "https://economia.uol.com.br/colunas/carlos-juliano-barros/2025/09/16/caso-itau-regras-do-home-office-no-brasil-sao-menos-claras-que-na-europa.htm",
  },
  {
    title: "Plataformas de vigilância do trabalho se tornaram o panóptico supostamente necessário",
    outlet: "O Plano B",
    year: "2025",
    role: "Entrevistado",
    description: "Análise sobre como plataformas de monitoramento replicam a lógica do panóptico no ambiente digital. Fabrício Barili contribui com perspectiva crítica sobre vigilância algorítmica.",
    tags: ["panóptico", "vigilância laboral", "privacidade", "trabalho digital"],
    url: "https://oplanob.com/plataformas-de-vigilancia-do-trabalho-se-tornaram-o-panoptico-supostamente-necessario/",
  },
  {
    title: "Startups usam inteligência artificial para testar e contratar desenvolvedores",
    outlet: "Folha de S.Paulo",
    year: "2024",
    role: "Entrevistado",
    description: "Reportagem sobre o crescente uso de IA por startups para triagem e contratação de desenvolvedores. Fabrício Barili é entrevistado sobre riscos e impactos dos algoritmos em processos seletivos.",
    tags: ["IA", "recrutamento", "trabalho", "algoritmos"],
    url: "https://www1.folha.uol.com.br/mpme/2024/03/startups-usam-inteligencia-artificial-para-testar-e-contratar-desenvolvedores.shtml",
  },
  {
    title: "Trabalheira #18: como a inteligência artificial reforça preconceitos no RH",
    outlet: "Reporter Brasil / UOL",
    year: "2023",
    role: "Entrevistado",
    description: "Coluna sobre os riscos do uso de IA na gestão de recursos humanos — incluindo a reprodução de vieses discriminatórios em sistemas de triagem. Fabrício Barili é consultado como especialista.",
    tags: ["IA", "RH", "viés algorítmico", "trabalho"],
    url: "https://reporterbrasil.org.br/2023/04/trabalheira-18-como-a-inteligencia-artificial-reforca-preconceitos-no-rh/",
  },
  {
    title: "Metaverso e Trabalho — Relatório ITS Rio",
    outlet: "ITS Rio / diVerso",
    year: "2023",
    role: "Autor",
    description: "Relatório de coautoria com Marcos Oliveira para o laboratório diVerso do ITS Rio. Analisa as implicações do metaverso no mundo do trabalho com ênfase no Sul Global: regulação, privacidade, proteção de dados e identidades digitais.",
    tags: ["metaverso", "trabalho", "sul global", "regulação", "privacidade"],
    url: "https://itsrio.org/pt/publicacoes/metaverso-e-trabalho/",
  },
  {
    title: "Bossware chapter — The SAGE Handbook of Digital Labour",
    outlet: "SAGE Publications",
    year: "2023",
    role: "Autor",
    description: "Capítulo no The SAGE Handbook of Digital Labour sobre bossware e tecnologias de vigilância no contexto do trabalho remoto e plataformizado.",
    tags: ["bossware", "vigilância laboral", "trabalho digital", "publicação acadêmica"],
    url: "https://sk.sagepub.com/hnbk/edvol/the-sage-handbook-of-digital-labour/front-matter/i180#_",
  },
  {
    title: "Artigo na Revista Galaxia (Scielo / PUC SP)",
    outlet: "Revista Galaxia — Scielo",
    year: "2023",
    role: "Autor",
    description: "Artigo científico publicado na Revista Galaxia da PUC-SP, indexada na Scielo, abordando plataformas digitais, trabalho e comunicação com foco no Sul Global.",
    tags: ["publicação acadêmica", "plataformas", "trabalho", "comunicação"],
    url: "https://www.scielo.br/j/gal/a/TfWsYqXH5zbDCMhLDDjS7yC/abstract/?lang=pt",
  },
  {
    title: "Publicação na Revista Galaxia — PUC SP",
    outlet: "Revista Galaxia",
    year: "2023",
    role: "Autor",
    description: "Artigo científico na Revista Galaxia da PUC-SP, abordando aspectos da digitalização do trabalho e suas implicações sociais e jurídicas no contexto latino-americano.",
    tags: ["publicação acadêmica", "trabalho digital", "comunicação", "PUC SP"],
    url: "https://revistas.pucsp.br/index.php/galaxia/article/view/58117",
  },
  {
    title: "IJoC — Seção Especial sobre Vigilância Laboral e Bossware",
    outlet: "International Journal of Communication",
    year: "2023",
    role: "Editor",
    description: "Edição e autoria de seção especial no IJoC dedicada à vigilância laboral e bossware. Uma das publicações de maior impacto na área de comunicação e trabalho digital.",
    tags: ["IJoC", "bossware", "vigilância laboral", "editor convidado"],
    url: "https://ijoc.org/index.php/ijoc/article/view/21365",
  },
  {
    title: "IA na gestão de RH — Revista Ejud TRT4",
    outlet: "Revista Ejud — TRT 4ª Região",
    year: "2023",
    role: "Autor",
    description: "Artigo científico na Revista da Escola Judicial do TRT4 analisando o uso de IA em processos de gestão de pessoas sob a perspectiva do Direito do Trabalho.",
    tags: ["IA", "RH", "direito do trabalho", "publicação jurídica"],
    url: "https://periodicos.trt4.jus.br/revistaejud4/article/view/943",
  },
  {
    title: "Publicação CONPEDI — Direito e Tecnologia",
    outlet: "CONPEDI",
    year: "2023",
    role: "Autor",
    description: "Artigo nos anais do CONPEDI discutindo intersecções entre direito, tecnologia e relações de trabalho na era das plataformas digitais.",
    tags: ["direito", "tecnologia", "plataformas", "CONPEDI"],
    url: "https://site.conpedi.org.br/publicacoes/s5y6p2k5/au81231e/KfD3CtGhVoGUr32v.pdf",
  },
  {
    title: "Podcast ITS Rio: Metaverso e Trabalho",
    outlet: "ITS Rio / Spotify",
    year: "2023",
    role: "Palestrante",
    description: "Episódio do podcast do ITS Rio em que Fabrício Barili e Marcos Oliveira discutem o relatório 'Metaverso e Trabalho', abordando implicações do metaverso no Sul Global.",
    tags: ["metaverso", "podcast", "sul global", "ITS Rio"],
    url: "https://open.spotify.com/episode/2cRoEn5PKWzNboKY0MaNj5",
  },
  {
    title: "Cabine de Home Office Stefanini — vigilância no teletrabalho",
    outlet: "Manual do Usuário",
    year: "2022",
    role: "Entrevistado",
    description: "Reportagem sobre a cabine de home office monitorada da Stefanini. Fabrício Barili comenta os limites éticos e jurídicos do monitoramento de trabalhadores remotos.",
    tags: ["bossware", "teletrabalho", "monitoramento", "privacidade"],
    url: "https://manualdousuario.net/stefanini-cabine-home-office/",
  },
  {
    title: "Um jogo para pensar na uberização do trabalho",
    outlet: "Mescla",
    year: "2020",
    role: "Citado",
    description: "Cobertura do jogo 'Jornada do Trabalhador de Si Mesmo', desenvolvido na Workers Game Jam, que usa mecânicas de jogo para explorar criticamente a precarização da economia de plataformas.",
    tags: ["serious game", "uberização", "plataformas", "trabalhador de si mesmo"],
    url: "https://mescla.cc/2020/08/06/um-jogo-para-pensar-na-uberizacao-do-trabalho/",
  },
  {
    title: "Encontro das Cooperativas de Plataforma de Mobilidade Urbana",
    outlet: "Casa Cooperativa",
    year: "2023",
    role: "Palestrante",
    description: "Participação como palestrante no Encontro em Nova Petrópolis/RS, debatendo alternativas cooperativistas frente à uberização do transporte urbano.",
    tags: ["cooperativas de plataforma", "mobilidade urbana", "uberização", "evento"],
    url: "https://www.casacooperativa.com.br/noticias/encontro-das-cooperativas-de-plataforma-de-mobilidade-urbana-sera-realizado-em-nova-petropolis",
  },
  {
    title: "Projeto Draft — Coberturas e Artigos",
    outlet: "Projeto Draft",
    year: "2023",
    role: "Citado",
    description: "Página de tag do Projeto Draft reunindo coberturas e menções a Fabrício Barili em publicações sobre empreendedorismo, inovação e o futuro do trabalho na economia digital.",
    tags: ["trabalho digital", "inovação", "plataformas", "mídia"],
    url: "https://www.projetodraft.com/tag/fabricio-barili/",
  },
];


/* ========================================================
   RENDER FUNCTIONS
   ======================================================== */

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(p => `
    <article class="card reveal">
      <div class="card__icon">${p.icon}</div>
      <h3 class="card__title">${p.title}</h3>
      <p class="card__subtitle">${p.subtitle}</p>
      <p class="card__text">${p.text}</p>
      <div class="card__tags">
        ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderMentions(filter) {
  const list = document.getElementById("mentions-list");
  if (!list) return;
  const visible = filter && filter !== "all"
    ? MENTIONS.filter(m => m.role === filter)
    : MENTIONS;
  list.innerHTML = visible.map(m => `
    <li class="mention-item" data-role="${m.role}">
      <a href="${m.url}" target="_blank" rel="noopener noreferrer">
        <div class="mention-item__top">
          <h3 class="mention-item__title">${m.title}</h3>
          <span class="role-badge">${m.role}</span>
        </div>
        <p class="mention-item__meta">${m.outlet}${m.year ? " · " + m.year : ""}</p>
        <p class="mention-item__desc">${m.description}</p>
        <div class="mention-item__tags">
          ${m.tags.map(t => `<span class="tag tag--hash">${t}</span>`).join("")}
        </div>
      </a>
    </li>
  `).join("");
}


/* ========================================================
   FILTER TABS
   ======================================================== */

function initFilters() {
  const tabs = document.querySelectorAll(".filter-tab");
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      renderMentions(tab.dataset.filter);
    });
  });
}


/* ========================================================
   MOBILE NAV
   ======================================================== */

function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const menu   = document.getElementById("nav-menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* ========================================================
   ACTIVE NAV LINK (by filename)
   ======================================================== */

function initActiveNav() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === page);
  });
}


/* ========================================================
   NAVBAR SCROLL SHADOW
   ======================================================== */

function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 8 ? "0 2px 20px rgba(0,0,0,.4)" : "";
  }, { passive: true });
}


/* ========================================================
   SCROLL REVEAL
   ======================================================== */

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}


/* ========================================================
   BOOT
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initActiveNav();
  initNavbarScroll();

  if (document.getElementById("projects-grid")) renderProjects();
  if (document.getElementById("mentions-list"))  { renderMentions("all"); initFilters(); }

  requestAnimationFrame(() => {
    document.querySelectorAll(".card, .mention-item, .section__header").forEach(el => {
      if (!el.classList.contains("reveal")) el.classList.add("reveal");
    });
    initReveal();
  });
});
