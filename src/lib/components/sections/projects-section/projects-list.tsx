"use client";

import { ListType, PROJECTS_PER_PAGE } from "@/lib/utils/const";
import { IProject, Project } from "../../../db/models/project.model";
import { ProjectCard } from "./project-card";
import ShowMoreButton from "../../shared/show-more.button";
import { useCallback, useState } from "react";
import { getProjects } from "@/lib/actions/get-projects.action";
import ProjectCardSkeleton from "../../shared/card-skeleton";

const ProjectsList = ({
  initialProjects,
  totalProjectsCount,
}: {
  initialProjects: IProject[];
  totalProjectsCount: number;
}) => {
  const [allProjects, setAllProjects] = useState<IProject[]>(initialProjects);
  const [skip, setSkip] = useState<number>(PROJECTS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const loadMoreProjects = useCallback(async () => {
    setLoading(true);
    const fetchedProjects = await getProjects(skip);
    setLoading(false);
    setAllProjects([...allProjects, ...fetchedProjects]);
    setSkip(skip + PROJECTS_PER_PAGE);
  }, [skip, allProjects]);
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 md:mx-7 relative z-10">
          {allProjects?.map((project) => {
            return <ProjectCard key={project._id} project={project} />;
          })}
        </div>
        {loading && <ProjectCardSkeleton />}
      </div>
      {totalProjectsCount > 3 && skip < totalProjectsCount && (
        <ShowMoreButton onClick={loadMoreProjects} />
      )}
    </>
  );
};

export default ProjectsList;
