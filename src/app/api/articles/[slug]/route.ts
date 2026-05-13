import db from "@/lib/db";
import { articlesTable } from "@/lib/db/schema";
import { APIError } from "@/lib/hooks/hooksUtils";
import { Article } from "@/lib/utils/types";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export type ArticleResponse = {
  success: boolean;
  article: Article;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const [article] = await db
      .select()
      .from(articlesTable)
      .where(and(eq(articlesTable.slug, slug), eq(articlesTable.published, true)));

    if (!article) {
      return NextResponse.json<APIError>({
        data: { success: false, message: "Article not found" },
        status: 404,
        statusText: "Not Found",
      });
    }

    return NextResponse.json<ArticleResponse>({
      success: true,
      article,
    });
  } catch {
    return NextResponse.json<APIError>({
      data: { success: false, message: "Failed to fetch article" },
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
