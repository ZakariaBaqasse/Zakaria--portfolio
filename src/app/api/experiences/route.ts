import db from "@/lib/db";
import { experiencesTable } from "@/lib/db/schema";
import { APIError } from "@/lib/hooks/hooksUtils";
import { count, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export type ExperiencesResponse = {
  success: boolean;
  message?: string;
  experiences: (typeof experiencesTable.$inferSelect)[];
  hasMore: boolean;
};

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    console.log("Fetching experiences");
    const page = request.nextUrl.searchParams.get("page") || "1";
    const limit = request.nextUrl.searchParams.get("limit") || "3";
    const total = await db.select({ count: count() }).from(experiencesTable);
    const experiences = await db
      .select()
      .from(experiencesTable)
      .orderBy(desc(experiencesTable.createdAt))
      .limit(parseInt(limit))
      .offset((parseInt(page) - 1) * parseInt(limit));
    return NextResponse.json<ExperiencesResponse>({
      success: true,
      experiences,
      hasMore: parseInt(page) * parseInt(limit) < total[0].count,
    });
  } catch (error) {
    return NextResponse.json<APIError>({
      data: { success: false, message: "Failed to fetch experiences" },
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
