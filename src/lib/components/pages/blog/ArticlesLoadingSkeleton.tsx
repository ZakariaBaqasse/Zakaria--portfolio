import { Skeleton } from "@/components/ui/skeleton";

function ArticleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl bg-light shadow-lg">
      <Skeleton className="h-[220px] w-full" />
      <div className="p-6">
        <Skeleton className="mb-3 h-4 w-24" />
        <Skeleton className="mb-2 h-6 w-4/5" />
        <Skeleton className="mb-4 h-4 w-full" />
        <div className="mb-4 flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export default function ArticlesLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
