"use client";

import useSWRInfinite from "swr/infinite";
import { getData } from "./hooksUtils";
import { Article } from "../utils/types";
import { ArticlesResponse } from "@/app/api/articles/route";

export default function useArticles(limit: number) {
  const { data, error, size, setSize, mutate, isValidating, isLoading } =
    useSWRInfinite(
      (pageIndex, previousPageData) => {
        if (pageIndex === 0) {
          return "/api/articles";
        }

        if (!previousPageData.hasMore) {
          return null;
        }

        return `/api/articles?page=${pageIndex + 1}&limit=${limit}`;
      },
      getData<ArticlesResponse>,
      {
        revalidateAll: false,
        revalidateFirstPage: false,
        revalidateOnMount: true,
      },
    );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.articles?.length === 0;
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);

  const articles: Article[] = data
    ? data.flatMap((item) =>
        item.articles.map((article) => ({
          ...article,
          tags: article.tags ?? [],
        })),
      )
    : [];

  return {
    mutate,
    articles,
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
