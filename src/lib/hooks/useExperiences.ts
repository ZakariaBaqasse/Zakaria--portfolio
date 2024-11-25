import { ExperiencesResponse } from "@/app/api/experiences/route";
import useSWRInfinite from "swr/infinite";
import { getData } from "./hooksUtils";
import { Career } from "../utils/types";

export function useExperiences(limit: number) {
  const { data, error, size, setSize, mutate, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        console.debug("pageIndex", pageIndex);
        console.debug("previousPageData", previousPageData);
        if (pageIndex === 0) {
          return `/api/experiences`;
        }
        if (!previousPageData.hasMore) {
          return null;
        }
        return `/api/experiences?page=${pageIndex + 1}&limit=${limit}`;
      },
      getData<ExperiencesResponse>,
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
  const isEmpty = data?.[0]?.experiences.length === 0;

  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);

  const experiences: Career[] = data
    ? ([] as Career[]).concat(
        data.flatMap((item) => {
          return item.experiences;
        })
      )
    : [];
  return {
    mutate,
    experiences,
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
