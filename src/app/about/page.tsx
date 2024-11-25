import EducationSection from "@/lib/components/pages/about/EducationSection";
import ExperienceSection from "@/lib/components/pages/about/ExperienceSection";
import HeroSection from "@/lib/components/pages/about/HeroSection";
import SkillsSection from "@/lib/components/pages/about/SkillsSection";
import CareerLoadingSkeleton from "@/lib/components/shared/CareerLoadingSkeleton";
import TransitionEffect from "@/lib/components/shared/TransitionEffect";
import { Suspense } from "react";

export const metadata = {
  title: "About | Zakaria BAQASSE",
  description: "About Zakaria BAQASSE",
};

export default function AboutPage() {
  return (
    <>
      <TransitionEffect />
      <div className="min-h-screen bg-light">
        <main className="container mx-auto px-4 py-12 md:px-8 lg:px-4">
          {/* Hero Section */}
          <HeroSection />
          {/* Skills Section */}
          <SkillsSection />
          {/* Experience Section */}
          <Suspense fallback={<CareerLoadingSkeleton />}>
            <ExperienceSection />
          </Suspense>
          {/* Education Section */}
          <EducationSection />
        </main>
      </div>
    </>
  );
}
