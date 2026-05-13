import db from "@/lib/db";
import { articlesTable } from "@/lib/db/schema";
import { APIError } from "@/lib/hooks/hooksUtils";
import { ARTICLES_PER_PAGE } from "@/lib/utils/const";
import { Article } from "@/lib/utils/types";
import { count, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export type ArticlesResponse = {
  success: boolean;
  message?: string;
  articles: Article[];
  hasMore: boolean;
};

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page") || "1";
    const limit =
      request.nextUrl.searchParams.get("limit") || `${ARTICLES_PER_PAGE}`;
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const pageLimit = Math.max(1, parseInt(limit, 10) || ARTICLES_PER_PAGE);

    const total = await db
      .select({ count: count() })
      .from(articlesTable)
      .where(eq(articlesTable.published, true));

    const articles = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.published, true))
      .orderBy(desc(articlesTable.published_at))
      .limit(pageLimit)
      .offset((pageNumber - 1) * pageLimit);

    return NextResponse.json<ArticlesResponse>({
      success: true,
      articles,
      hasMore: pageNumber * pageLimit < total[0].count,
    });
  } catch {
    return NextResponse.json<APIError>({
      data: { success: false, message: "Failed to fetch articles" },
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
