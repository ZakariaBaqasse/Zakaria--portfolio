"use client";
import ProjectCard from "./ProjectCard";

import useProjects from "@/lib/hooks/useProjects";
import { Button } from "@/components/ui/button";
import ProjectsLoadingSkeleton from "./ProjectsLoadingSkeleton";

const MAX_PROJECTS = 6;
export default function Projects() {
  const {
    projects,
    error,
    isLoadingInitialData,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    setSize,
    size,
    mutate,
  } = useProjects(MAX_PROJECTS);

  return (
    <>
      {error && (
        <div className="text-center text-red-500 mb-8">
          <p>Something went wrong. Please try again.</p>
          <Button onClick={() => mutate()} className="mt-4">
            Retry
          </Button>
        </div>
      )}

      {!error && isLoadingInitialData && (
        <div className="container mx-auto px-4 py-12">
          <ProjectsLoadingSkeleton />
        </div>
      )}

      {!error && !isLoadingInitialData && (
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-12 xl:gap-x-16 lg:gap-x-8 md:gap-x-4 gap-y-24 gap-x-0">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                isFeatured={index % 3 === 0}
              />
            ))}
          </div>
        </div>
      )}

      {!isReachingEnd && !isLoadingMore && !isLoadingInitialData && !error && (
        <div className="flex justify-center my-12">
          <Button onClick={() => setSize(size + 1)}>Explore More</Button>
        </div>
      )}

      {isLoadingMore && (
        <div className="container mx-auto px-4 py-12">
          <ProjectsLoadingSkeleton />
        </div>
      )}
    </>
  );
}
