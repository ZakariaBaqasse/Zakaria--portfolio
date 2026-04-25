import db from "@/lib/db";
import { projectsTable } from "@/lib/db/schema";
import TransitionEffect from "@/lib/components/shared/TransitionEffect";
import ProjectDetailContent from "@/lib/components/pages/projects/ProjectDetailContent";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Project } from "@/lib/utils/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) return {};

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, id));

  if (!project) return {};

  return {
    title: `${project.title} | Zakaria BAQASSE`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);
  if (isNaN(id)) notFound();

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, id));

  if (!project) notFound();

  const typedProject: Project = {
    ...project,
    technologies: project.technologies ?? [],
  };

  return (
    <>
      <TransitionEffect />
      <ProjectDetailContent project={typedProject} />
    </>
  );
}
