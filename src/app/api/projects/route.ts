import db from "@/lib/db";
import { projectsTable } from "@/lib/db/schema";
import { APIError } from "@/lib/hooks/hooksUtils";
import { count, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export type ProjectsResponse = {
  success: boolean;
  message?: string;
  projects: (typeof projectsTable.$inferSelect)[];
  hasMore: boolean;
};

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    console.log("Fetching projects");
    const page = request.nextUrl.searchParams.get("page") || "1";
    const limit = request.nextUrl.searchParams.get("limit") || "6";
    const total = await db.select({ count: count() }).from(projectsTable);
    const projects = await db
      .select()
      .from(projectsTable)
      .orderBy(desc(projectsTable.createdAt))
      .limit(parseInt(limit))
      .offset((parseInt(page) - 1) * parseInt(limit));
    return NextResponse.json<ProjectsResponse>({
      success: true,
      projects,
      hasMore: parseInt(page) * parseInt(limit) < total[0].count,
    });
  } catch (error) {
    return NextResponse.json<APIError>({
      data: { success: false, message: "Failed to fetch projects" },
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
