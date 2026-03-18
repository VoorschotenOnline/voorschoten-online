import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export type SourceInput = {
  title: string;
  summary?: string | null;
  body?: string | null;
  sourceName?: string | null;
};

export type GeneratedArticle = {
  title: string;
  article_lead: string;
  body: string;
  category: string;
};

export async function generateNewsArticle(params: {
  category: string;
  sources: SourceInput[];
}): Promise<GeneratedArticle> {
  const { category, sources } = params;

  const sourceText = sources
    .map(
      (s, i) => `
Bron ${i + 1}
Titel: ${s.title}
Samenvatting: ${s.summary ?? ""}
Tekst: ${s.body ?? ""}
Bronnaam: ${s.sourceName ?? ""}
`
    )
    .join("\n");

  const prompt = `
Je bent redacteur voor Voorschoten Online, een lokale nieuwssite.

Taak:
- schrijf één origineel nieuwsartikel op basis van meerdere bronteksten
- schrijf in neutraal, helder Nederlands
- noem geen bronnen in de lopende tekst
- gebruik geen zinnen zoals "volgens meerdere bronnen"
- schrijf alsof dit een echt lokaal nieuwsbericht is
- focus op wat relevant is voor inwoners van Voorschoten

Rubriek:
${category}

Broninformatie:
${sourceText}

Geef alleen geldige JSON terug in dit formaat:
{
  "title": "...",
  "article_lead": "...",
  "body": "...",
  "category": "${category}"
}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0.6,
    messages: [
      {
        role: "system",
        content: "Je schrijft lokale nieuwsartikelen in journalistieke stijl."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Geen antwoord van OpenAI ontvangen.");
  }

  try {
    return JSON.parse(content) as GeneratedArticle;
  } catch {
    throw new Error("AI gaf geen geldige JSON terug.");
  }
}