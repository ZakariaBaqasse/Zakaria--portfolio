import StyledTitle from "../../shared/styled-title";
import ProjectsList from "./projects-list";
import { Project } from "@/lib/db/models/project.model";
import { getProjects } from "@/lib/actions/get-projects.action";

const Projects = async () => {
  const totalProjectsCount = await Project.countDocuments();
  const initialProjects = await getProjects(0);
  return (
    <section id="Projects" className="text-secondary section-sizing">
      <StyledTitle word1="My" word2="Projects" />
      <ProjectsList
        totalProjectsCount={totalProjectsCount}
        initialProjects={initialProjects}
      />
    </section>
  );
};

export default Projects;
