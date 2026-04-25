import db from "@/lib/db";
import { projectsTable } from "@/lib/db/schema";
import { APIError } from "@/lib/hooks/hooksUtils";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export type ProjectResponse = {
  success: boolean;
  project: typeof projectsTable.$inferSelect;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr, 10);
    if (isNaN(id)) {
      return NextResponse.json<APIError>({
        data: { success: false, message: "Invalid project ID" },
        status: 400,
        statusText: "Bad Request",
      });
    }

    const [project] = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, id));

    if (!project) {
      return NextResponse.json<APIError>({
        data: { success: false, message: "Project not found" },
        status: 404,
        statusText: "Not Found",
      });
    }

    return NextResponse.json<ProjectResponse>({
      success: true,
      project,
    });
  } catch {
    return NextResponse.json<APIError>({
      data: { success: false, message: "Failed to fetch project" },
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
