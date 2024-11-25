import Projects from "@/lib/components/pages/projects";
import ProjectsLoadingSkeleton from "@/lib/components/pages/projects/ProjectsLoadingSkeleton";
import AnimatedTitle from "@/lib/components/shared/AnimatedTitle";
import TransitionEffect from "@/lib/components/shared/TransitionEffect";
import { Suspense } from "react";

export const metadata = {
  title: "Projects | Zakaria BAQASSE",
  description: "Zakaria BAQASSE's Projects",
  keywords:
    "Zakaria BAQASSE, Projects, Portfolio, Artificial Intelligence, AI agents",
};

export default function ProjectsPage() {
  return (
    <>
      <TransitionEffect />
      <main className="min-h-screen bg-light">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 text-center">
          <AnimatedTitle text="Building the Future, One Project at a Time!" />
        </div>

        {/* Projects Grid */}
        <Suspense fallback={<ProjectsLoadingSkeleton />}>
          <Projects />
        </Suspense>
      </main>
    </>
  );
}
