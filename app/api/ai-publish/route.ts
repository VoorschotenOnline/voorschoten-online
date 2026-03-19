import { NextResponse } from "next/server";
import { generateNewsArticle } from "@/lib/ai";

export const dynamic = "force-dynamic";

// simpele slug generator
function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

export async function GET() {
  try {
    // 1. AI artikel genereren
    const article = await generateNewsArticle({
      category: "gemeente",
      sources: [
        {
          title: "Gemeente kondigt verkeersmaatregelen aan",
          summary:
            "Nieuwe plannen voor centrum Voorschoten om verkeer te verminderen.",
          body:
            "De gemeente Voorschoten wil maatregelen nemen om de verkeersdrukte terug te dringen.",
          sourceName: "Demo bron"
        }
      ]
    });

    const slug = createSlug(article.title);

    // 2. Database pas hier laden (BELANGRIJK voor Vercel)
    const { db } = await import("@/lib/db");

    // 3. Opslaan
    const [result]: any = await db.query(
      `INSERT INTO published_articles
      (slug, category, title, article_lead, body, status, is_live, published_at, created_at)
      VALUES (?, ?, ?, ?, ?, 'published', 1, NOW(), NOW())`,
      [
        slug,
        article.category,
        article.title,
        article.article_lead,
        article.body
      ]
    );

    return NextResponse.json({
      ok: true,
      message: "Artikel gepubliceerd",
      article_id: result.insertId,
      slug
    });
  } catch (error) {
    console.error("AI publish error:", error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Onbekende fout"
      },
      { status: 500 }
    );
  }
}