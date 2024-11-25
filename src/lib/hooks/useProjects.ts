import { ProjectsResponse } from "@/app/api/projects/route";
import useSWRInfinite from "swr/infinite";
import { getData } from "./hooksUtils";
import { Project } from "../utils/types";

export default function useProjects(limit: number) {
  const { data, error, size, setSize, mutate, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        console.debug("pageIndex", pageIndex);
        console.debug("previousPageData", previousPageData);
        if (pageIndex === 0) {
          return `/api/projects`;
        }
        if (!previousPageData.hasMore) {
          return null;
        }
        return `/api/projects?page=${pageIndex + 1}&limit=${limit}`;
      },
      getData<ProjectsResponse>,
      {
        revalidateAll: false,
        revalidateFirstPage: false,
        revalidateOnMount: true,
      }
    );
  console.debug(data);
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.projects.length === 0;

  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);

  const projects: Project[] = data
    ? [
        ...data.flatMap((item) =>
          item.projects.map((project) => ({
            ...project,
            technologies: project.technologies ?? [],
          }))
        ),
      ]
    : [];
  return {
    mutate,
    projects,
    isLoadingMore,
    isLoadingInitialData,
    isLoading,
    isValidating,
    size,
    setSize,
    isReachingEnd,
    error,
  };
}
