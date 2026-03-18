import { NextResponse } from "next/server";
import { generateNewsArticle } from "@/lib/ai";

export async function GET() {
  try {
    const article = await generateNewsArticle({
      category: "gemeente",
      sources: [
        {
          title: "Gemeente kondigt verkeersmaatregelen aan",
          summary:
            "De gemeente Voorschoten wil nieuwe maatregelen nemen in het centrum om de verkeersdrukte terug te dringen.",
          body:
            "Bewoners en ondernemers reageren verdeeld op de aangekondigde plannen. De gemeente spreekt van een eerste stap in een breder mobiliteitsplan.",
          sourceName: "Demo bron 1"
        },
        {
          title: "Ondernemers vragen duidelijkheid over bereikbaarheid",
          summary:
            "Lokale ondernemers maken zich zorgen over de gevolgen voor winkels en bezoekers.",
          body:
            "Met name de bereikbaarheid en bevoorrading worden genoemd als aandachtspunt in het centrum van Voorschoten.",
          sourceName: "Demo bron 2"
        }
      ]
    });

    return NextResponse.json({
      ok: true,
      article
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Onbekende fout"
      },
      { status: 500 }
    );
  }
}