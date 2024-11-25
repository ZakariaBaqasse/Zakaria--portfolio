import { Skeleton } from "@/components/ui/skeleton";

export function ProjectCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
    >
      <Skeleton className="w-full h-[200px]" />
      <div className="p-6">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export default function ProjectsLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-12 xl:gap-x-16 lg:gap-x-8 md:gap-x-4 gap-y-24 gap-x-0">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={
              index === 0 || index === 3
                ? "col-span-12 lg:flex-row"
                : "col-span-12 md:col-span-6"
            }
          >
            <ProjectCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
}
