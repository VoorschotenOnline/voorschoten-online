"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  article_lead: string;
  body: string;
  category: string;
};

export default function AIDemoPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadArticle() {
    setLoading(true);

    const res = await fetch("/api/ai-generate");
    const data = await res.json();

    if (data.ok) {
      setArticle(data.article);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    <div className="article-page">
      <div className="meta">AI gegenereerd artikel • demo</div>

      {loading && <p>Laden...</p>}

      {article && (
        <>
          <h1 className="article-title">{article.title}</h1>

          <p className="article-lead">{article.article_lead}</p>

          <div className="article-body">
            <p>{article.body}</p>
          </div>

          <button
            onClick={loadArticle}
            style={{
              marginTop: 24,
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background: "#111827",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            🔄 Genereer nieuw artikel
          </button>
        </>
      )}
    </div>
  );
}