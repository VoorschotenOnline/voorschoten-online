import { NextResponse } from "next/server";
import { generateNewsArticle } from "@/lib/ai";

export const dynamic = "force-dynamic";

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 80);
}

export async function GET() {
  try {
    const article = await generateNewsArticle({
      category: "gemeente",
      sources: [
        {
          title: "Gemeente kondigt verkeersmaatregelen aan",
          summary: "Nieuwe plannen voor centrum Voorschoten",
          body: "De gemeente wil verkeersdrukte verminderen.",
          sourceName: "Demo bron"
        }
      ]
    });

    const slug = createSlug(article.title);

    // database pas BINNEN de route importeren
    const { db } = await import("@/lib/db");

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
      article_id: result.insertId,
      slug
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Fout"
      },
      { status: 500 }
    );
  }
}