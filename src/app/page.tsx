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
            <div className="relative w-3/4 md:w-full flex items-center justify-center">
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
                  priority
                />
                {/* subtle teal gradient overlay at the bottom edge */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-primaryDark/10 to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="mb-12 flex flex-col gap-6 px-12">
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
          </div>
        </div>
        <CTAButton />
      </main>
    </>
  );
}
