"use client";

import { Button } from "@/components/ui/button";
import CareerList from "@/lib/components/shared/CareerList";
import CareerLoadingSkeleton from "@/lib/components/shared/CareerLoadingSkeleton";
import { useExperiences } from "@/lib/hooks/useExperiences";

const MAX_EXPERIENCES_PER_PAGE = 3;

export default function ExperienceSection() {
  const {
    experiences,
    error,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
    size,
    setSize,
  } = useExperiences(MAX_EXPERIENCES_PER_PAGE);

  return (
    <section className="my-48 lg:my-64">
      <h2 className="text-5xl font-bold text-center mb-12">Experience</h2>

      {error && (
        <div className="text-center text-red-500 mb-8">
          <p>Something went wrong. Please try again.</p>
          <Button onClick={() => mutate()} className="mt-4">
            Retry
          </Button>
        </div>
      )}

      {!error && isLoadingInitialData && (
        <div className="w-[75%] mx-auto">
          <CareerLoadingSkeleton />
        </div>
      )}

      {!error && !isLoadingInitialData && (
        <CareerList careers={experiences} type="professional" />
      )}

      {!isReachingEnd && !isLoadingMore && !isLoadingInitialData && !error && (
        <div className="flex justify-center my-12">
          <Button onClick={() => setSize(size + 1)}>Discover More</Button>
        </div>
      )}

      {isLoadingMore && (
        <div className="w-[75%] mx-auto">
          <CareerLoadingSkeleton />
        </div>
      )}
    </section>
  );
}
