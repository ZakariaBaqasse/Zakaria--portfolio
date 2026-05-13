import AnimatedTitle from "@/lib/components/shared/AnimatedTitle";
import TransitionEffect from "@/lib/components/shared/TransitionEffect";
import ArticlesLoadingSkeleton from "@/lib/components/pages/blog/ArticlesLoadingSkeleton";
import BlogList from "@/lib/components/pages/blog";
import { Suspense } from "react";

export const metadata = {
  title: "Blog | Zakaria BAQASSE",
  description: "Zakaria BAQASSE's articles and writings",
};

export default function BlogPage() {
  return (
    <>
      <TransitionEffect />
      <main className="min-h-screen bg-light">
        <div className="container mx-auto px-4 py-20 text-center">
          <AnimatedTitle text="Thoughts, Guides & Deep Dives." />
        </div>

        <Suspense fallback={<ArticlesLoadingSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </>
  );
}
