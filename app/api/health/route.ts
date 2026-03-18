import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    await db.query("SELECT 1");
    return NextResponse.json({ ok: true, database: "connected" });
  } catch (error) {
    return NextResponse.json(
      { ok: false, database: "disconnected", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}