"use client";

import { Button } from "@/components/ui/button";
import { ARTICLES_PER_PAGE } from "@/lib/utils/const";
import useArticles from "@/lib/hooks/useArticles";
import ArticleCard from "./ArticleCard";
import ArticlesLoadingSkeleton from "./ArticlesLoadingSkeleton";

export default function BlogList() {
  const {
    articles,
    error,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    setSize,
    size,
    mutate,
  } = useArticles(ARTICLES_PER_PAGE);

  return (
    <>
      {error && (
        <div className="mb-8 text-center text-red-500">
          <p>Something went wrong. Please try again.</p>
          <Button onClick={() => mutate()} className="mt-4">
            Retry
          </Button>
        </div>
      )}

      {!error && isLoadingInitialData && <ArticlesLoadingSkeleton />}

      {!error && !isLoadingInitialData && (
        <div className="container mx-auto px-4 py-12">
          {articles.length === 0 ? (
            <p className="text-center text-lg text-gray-500">
              No articles yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </div>
      )}

      {!isReachingEnd && !isLoadingMore && !isLoadingInitialData && !error && (
        <div className="my-12 flex justify-center">
          <Button onClick={() => setSize(size + 1)}>Load More</Button>
        </div>
      )}

      {isLoadingMore && (
        <div className="container mx-auto px-4 py-12">
          <ArticlesLoadingSkeleton />
        </div>
      )}
    </>
  );
}
