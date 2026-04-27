import { Button } from "@/components/ui/button";
import AnimatedTitle from "@/lib/components/shared/AnimatedTitle";
import CTAButton from "@/lib/components/shared/CTAButton";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
export default async function Home() {
  return (
    <>
      <main className="flex flex-1 items-center text-dark dark:text-light">
        <div
          className="z-0 w-full bg-light dark:bg-dark xl:px-24 xl:py-16 lg:px-16 lg:py-12
      md:px-12 md:py-10 px-8 py-10"
        >
          <div className="flex w-full items-center justify-between gap-12 flex-col lg:flex-row">
            {/* Text — first in DOM so it's on top in the mobile column */}
            <div className="space-y-6 lg:order-2 lg:flex-1">
              <div className="flex flex-col gap-6">
                <AnimatedTitle
                  className="lg:text-left text-center"
                  text="Engineering Resilient Agentic AI systems & Scalable Backends"
                />
                <p className="md:text-lg text-sm lg:text-left text-center text-dark">
                  I architect and deploy production-ready AI systems that solve
                  real business challenges. By combining autonomous multi-agent
                  workflows with metric-driven RAG pipelines, I bridge the gap
                  between advanced LLM capabilities and robust backend
                  infrastructure using Python, FastAPI, and LangGraph
                </p>
                <div className="flex flex-wrap gap-4 w-full justify-center lg:justify-start">
                  <Button
                    name="download-resume button"
                    variant="outline"
                    className="gap-2 px-4 py-2 w-60 h-12 text-base"
                  >
                    <a href="/files/resume.pdf" target="_blank">
                      Resume
                    </a>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    name="contact via email button"
                    className="px-4 py-2 w-60 h-12 text-base bg-dark text-light"
                  >
                    <a href="mailto:zakaria.baqasse@gmail.com">Contact</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Image — second in DOM (below text on mobile, left on desktop) */}
            <div className="relative w-full md:w-3/4 lg:flex-1 lg:order-1 flex items-center justify-center">
              {/* decorative glow blob behind the image */}
              <div className="absolute inset-0 rounded-3xl bg-primaryDark/10 blur-3xl scale-90" />
              {/* image card */}
              <div className="relative w-full rounded-2xl overflow-hidden ring-1 ring-primaryDark/30 shadow-[0_0_60px_rgba(88,230,217,0.18)]">
                <Image
                  src="/images/home-illustration.png"
                  alt="AI multi-agent architecture diagram"
                  width={500}
                  height={500}
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 50vw, 75vw"
                  priority
                />
                {/* subtle teal gradient overlay at the bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primaryDark/10 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        <CTAButton />
      </main>
    </>
  );
}
