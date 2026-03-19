import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const hasDbConfig =
      !!process.env.DB_HOST &&
      !!process.env.DB_NAME &&
      !!process.env.DB_USER &&
      !!process.env.DB_PASSWORD;

    if (!hasDbConfig) {
      return NextResponse.json({
        ok: true,
        database: "not-configured"
      });
    }

    const { db } = await import("@/lib/db");
    await db.query("SELECT 1");

    return NextResponse.json({
      ok: true,
      database: "connected"
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}