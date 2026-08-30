"use client";

export interface Article {
  title: string;
  description: string;
  url: string;
  year?: string;
  journal?: string;
}

interface PublicationsProps {
  articles?: Article[];
}

export default function Publications({ articles }: PublicationsProps) {
  const hasArticles = articles && articles.length > 0;

  return (
    <section id="publicacoes" className="py-20 px-6 md:px-12 lg:px-24 bg-[#0a0f1a]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight text-white mb-10">
          Publicações
        </h2>

        {!hasArticles ? (
          <div className="rounded-xl border border-white/10 bg-white/5 px-8 py-10 text-center">
            <p className="text-sm uppercase tracking-widest text-violet-400 mb-2 font-medium">
              Em breve
            </p>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">
              Os artigos e publicações serão listados aqui em breve.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {articles.map((article, index) => (
              <li
                key={index}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 hover:border-violet-500/40 hover:bg-white/[0.07] transition-colors duration-200"
              >
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
                  <h3 className="text-base font-medium text-white group-hover:text-violet-300 transition-colors duration-150 leading-snug mb-2">
                    {article.title}
                  </h3>
                  {(article.journal || article.year) && (
                    <p className="text-xs text-violet-400/80 mb-3 font-medium tracking-wide">
                      {[article.journal, article.year].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="text-sm text-slate-400 leading-relaxed">{article.description}</p>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
