import Footer from "@/lib/components/layout/footer";
import { NavBar } from "@/lib/components/layout/nav-bar";
import Contact from "@/lib/components/sections/contactme-section/contactme-section";
import Education from "@/lib/components/sections/educations-section/educations-section";
import Experiences from "@/lib/components/sections/experiences-section/experiences-section";
import Hero from "@/lib/components/sections/hero-section/hero-section";
import MeetMe from "@/lib/components/sections/meetme-section/meet-me-section";
import Projects from "@/lib/components/sections/projects-section/projects-section";
import ProjectCardSkeleton from "@/lib/components/shared/card-skeleton";
import { connectToDB } from "@/lib/db/connectDB";
import { Suspense } from "react";

export default async function Home() {
  await connectToDB();
  return (
    <>
      <NavBar />
      <Hero />
      <MeetMe />
      <Education />
      <Suspense fallback={<ProjectCardSkeleton />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<ProjectCardSkeleton />}>
        <Experiences />
      </Suspense>
      <Contact />
      <Footer />
    </>
  );
}
