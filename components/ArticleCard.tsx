import type { PublishedArticle } from "@/lib/queries";

export function ArticleCard({ article }: { article: PublishedArticle }) {
  return (
    <a className="article-link" href={`/artikel/${article.slug}`}>
      <div className="meta">
        {article.category} • {article.published_at ? new Date(article.published_at).toLocaleString("nl-NL") : "Onbekende datum"}
      </div>
      <div className="title">{article.title}</div>
      {article.article_lead ? <div className="lead">{article.article_lead}</div> : null}
    </a>
  );
}