import { Button } from "@/components/ui/button";
import AnimatedTitle from "@/lib/components/shared/AnimatedTitle";
import CTAButton from "@/lib/components/shared/CTAButton";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
export default async function Home() {
  return (
    <>
      <main className="flex min-h-screen items-center text-dark dark:text-light sm:items-start">
        <div
          className="z-0 inline-block h-full w-full bg-light dark:bg-dark xl:p-24 lg:p-16 
      md:p-12 sm:p-8 !pt-0 md:!pt-16 sm:!pt-16"
        >
          <div className="flex w-full items-center justify-between flex-col lg:flex-row">
            <div className="w-3/4 md:w-full">
              <Image
                src="/images/home-illustration.png"
                alt="3D Robotics"
                width={500}
                height={500}
                className="h-auto w-full"
                priority
              />
            </div>
            <div className="space-y-6">
              <div className="mb-12 flex flex-col gap-6 px-12">
                <AnimatedTitle
                  className="lg:text-left text-center"
                  text="Building Smarter Solutions with Code and AI Innovation."
                />
                <p className="md:text-lg text-sm lg:text-left text-center text-dark">
                  As a skilled software and AI engineer, I specialize in
                  transforming ideas into intelligent, scalable solutions.
                  Explore my latest projects and articles, highlighting my
                  expertise in full-stack development and cutting-edge AI
                  technologies
                </p>
                <div className="flex flex-wrap gap-4 w-full justify-center lg:justify-start">
                  <Button
                    name="download-resume button"
                    className="gap-2 px-4 py-2 w-60 h-12 bg-dark text-base"
                  >
                    <a href="/files/resume.pdf" target="_blank">
                      Resume
                    </a>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    name="contact via email button"
                    variant="outline"
                    className="px-4 py-2 w-60 h-12 text-base"
                  >
                    <a href="mailto:zakaria.baqasse@gmail.com">Contact</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CTAButton />
      </main>
    </>
  );
}
