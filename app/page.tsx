import { getLatestArticles, getUpcomingEvents } from "@/lib/queries";
import { ArticleCard } from "@/components/ArticleCard";
import { EventCard } from "@/components/EventCard";

export default async function HomePage() {
  const [articles, events] = await Promise.all([
    getLatestArticles(12),
    getUpcomingEvents(6)
  ]);

  const hero = articles[0] ?? null;
  const latest = articles.slice(1, 7);

  return (
    <div className="home-stack">
      <section className="hero-grid">
        <div className="hero-card">
          <div className="badge">Voorschoten Online</div>

          <h2 className="hero-title">
            {hero ? hero.title : "Welkom bij Voorschoten Online"}
          </h2>

          <p className="hero-lead">
            {hero?.article_lead ??
              "Lokaal nieuws, agenda en updates voor Voorschoten op één plek."}
          </p>

          <div className="hero-actions">
            {hero ? (
              <a className="button-primary" href={`/artikel/${hero.slug}`}>
                Lees hoofdartikel
              </a>
            ) : (
              <a className="button-primary" href="/agenda">
                Bekijk agenda
              </a>
            )}

            <a className="button-secondary" href="/persbericht">
              Persbericht insturen
            </a>
          </div>

          <div className="hero-meta-row">
            <span className="badge-light">Nieuws</span>
            <span className="badge-light">Agenda</span>
            <span className="badge-light">Voorschoten</span>
          </div>
        </div>

        <aside className="side-card">
          <h3 className="section-title">Agenda deze week</h3>
          <div className="article-list">
            {events.length ? (
              events.slice(0, 3).map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="empty">Nog geen gepubliceerde agenda-items.</p>
            )}
          </div>
        </aside>
      </section>

      <section className="section-block">
        <div className="section-head">
          <h3 className="section-title">Laatste nieuws</h3>
          <a className="text-link" href="/agenda">
            Naar agenda
          </a>
        </div>

        <div className="news-grid">
          {latest.length ? (
            latest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="empty">Nog geen extra artikelen beschikbaar.</p>
          )}
        </div>
      </section>

      <section className="info-grid">
        <div className="promo-card">
          <h3 className="section-title">Persbericht insturen</h3>
          <p className="muted">
            Organisaties, verenigingen en initiatiefnemers uit Voorschoten
            kunnen hier eenvoudig hun persbericht insturen.
          </p>
          <a className="button-primary" href="/persbericht">
            Open formulier
          </a>
        </div>

        <div className="promo-card">
          <h3 className="section-title">Rubrieken</h3>
          <div className="chip-row">
            <span className="badge-light">Gemeente</span>
            <span className="badge-light">Verkeer</span>
            <span className="badge-light">Veiligheid</span>
            <span className="badge-light">Cultuur</span>
            <span className="badge-light">Politiek</span>
            <span className="badge-light">Sport</span>
          </div>
        </div>
      </section>
    </div>
  );
}