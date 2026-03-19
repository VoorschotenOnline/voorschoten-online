export type PublishedArticle = {
  id: number;
  slug: string;
  category: string;
  title: string;
  article_lead: string | null;
  body: string;
  published_at: string | null;
  updated_at: string | null;
  image_strategy_used: string;
};

export type ArticleSource = {
  source_name: string;
  source_title: string;
  source_url: string;
};

export type EventItem = {
  id: number;
  slug: string;
  title: string;
  summary: string | null;
  category: string;
  location_name: string | null;
  start_datetime: string;
};

export async function getLatestArticles(limit = 10): Promise<PublishedArticle[]> {
  const articles: PublishedArticle[] = [
    {
      id: 1,
      slug: "gemeente-besluit-voorschoten",
      category: "gemeente",
      title: "Gemeente neemt nieuw besluit over verkeer in centrum",
      article_lead:
        "De gemeente Voorschoten heeft nieuwe maatregelen aangekondigd om de verkeersdrukte te verminderen.",
      body:
        "De gemeente heeft besloten om extra verkeersmaatregelen te nemen in het centrum van Voorschoten. Dit besluit volgt na meerdere klachten van bewoners over drukte en veiligheid.",
      published_at: new Date().toISOString(),
      updated_at: null,
      image_strategy_used: "fallback_stock"
    },
    {
      id: 2,
      slug: "sportdag-voorschoten",
      category: "sport",
      title: "Sportdag trekt honderden bezoekers",
      article_lead:
        "De jaarlijkse sportdag in Voorschoten was opnieuw een groot succes.",
      body:
        "Honderden inwoners kwamen af op de sportdag. Verschillende verenigingen presenteerden zich en er waren activiteiten voor jong en oud.",
      published_at: new Date().toISOString(),
      updated_at: null,
      image_strategy_used: "fallback_stock"
    }
  ];

  return articles.slice(0, limit);
}

export async function getArticleBySlug(slug: string): Promise<PublishedArticle | null> {
  const articles = await getLatestArticles();
  return articles.find((a) => a.slug === slug) || null;
}

export async function getArticleSources(_articleId?: number): Promise<ArticleSource[]> {
  return [
    {
      source_name: "Leidsch Dagblad",
      source_title: "Artikel over verkeer Voorschoten",
      source_url: "https://www.leidschdagblad.nl"
    },
    {
      source_name: "Sleutelstad",
      source_title: "Nieuwsbericht centrum Voorschoten",
      source_url: "https://www.sleutelstad.nl"
    }
  ];
}

export async function getUpcomingEvents(limit = 20): Promise<EventItem[]> {
  const events: EventItem[] = [
    {
      id: 1,
      slug: "markt-voorschoten",
      title: "Weekmarkt Voorschoten",
      summary: "Gezellige weekmarkt met lokale producten.",
      category: "markt_evenement",
      location_name: "Treubplein",
      start_datetime: new Date().toISOString()
    },
    {
      id: 2,
      slug: "concert-cultuurcentrum",
      title: "Live muziek in cultuurcentrum",
      summary: "Optreden van lokale band.",
      category: "cultuur",
      location_name: "Cultureel Centrum",
      start_datetime: new Date().toISOString()
    }
  ];

  return events.slice(0, limit);
}