import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleSources } from "@/lib/queries";

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const sources = await getArticleSources();

  return (
    <article className="article-page">
      
      {/* HEADER */}
      <header className="article-header">
        <div className="meta">
          {article.category}
          {article.published_at
            ? ` • Gepubliceerd: ${new Date(article.published_at).toLocaleString("nl-NL")}`
            : ""}
          {article.updated_at
            ? ` • Bijgewerkt: ${new Date(article.updated_at).toLocaleString("nl-NL")}`
            : ""}
        </div>

        <h1 className="article-title">{article.title}</h1>

        {article.article_lead && (
          <p className="article-lead">{article.article_lead}</p>
        )}
      </header>

      {/* INHOUD */}
      <section className="article-body">
        <p>{article.body}</p>
      </section>

      {/* UPDATE LABEL */}
      {article.updated_at && (
        <div className="update-box">
          <strong>Update:</strong> Dit artikel is bijgewerkt met nieuwe informatie.
        </div>
      )}

      {/* BRONNEN */}
      <section className="sources-section">
        <h2 className="section-title">Bronnen</h2>

        <div className="source-list">
          {sources.length ? (
            sources.map((source, index) => (
              <a
                key={index}
                href={source.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-item"
              >
                <strong>{source.source_name}</strong>
                <div className="meta">{source.source_title}</div>
              </a>
            ))
          ) : (
            <p className="empty">Geen bronnen beschikbaar</p>
          )}
        </div>
      </section>
    </article>
  );
}