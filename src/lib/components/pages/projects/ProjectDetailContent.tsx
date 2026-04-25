"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Project } from "@/lib/utils/types";
import { Github, Globe, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TechChip from "./TechChip";
import { Badge } from "@/components/ui/badge";

function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // https://www.youtube.com/watch?v=VIDEO_ID
    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.searchParams.has("v")
    ) {
      return `https://www.youtube.com/embed/${parsed.searchParams.get("v")}`;
    }
    // https://youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${parsed.pathname}`;
    }
  } catch {
    // fall through and return as-is
  }
  return url;
}

export default function ProjectDetailContent({
  project,
}: {
  project: Project;
}) {
  const hasMedia = project.image || project.demoVideo;
  const mediaItems = [
    ...(project.image ? [{ type: "image" as const, src: project.image }] : []),
    ...(project.demoVideo
      ? [{ type: "video" as const, src: project.demoVideo }]
      : []),
  ];

  return (
    <main className="min-h-screen bg-light">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-dark hover:text-lightBlue transition-colors duration-200 font-medium mb-10 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Title + badge */}
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <h1 className="text-3xl md:text-5xl font-bold text-dark leading-tight">
            {project.title}
          </h1>
          {project.comingSoon && (
            <Badge
              className="text-lightBlue border-lightBlue text-sm"
              variant="outline"
            >
              Coming soon
            </Badge>
          )}
        </div>

        {/* Short description */}
        <p className="text-gray-500 text-lg mb-10">
          {project.shortDescription}
        </p>

        {/* Media carousel */}
        {hasMedia && (
          <div className="mb-12">
            <Carousel className="w-full">
              <CarouselContent>
                {mediaItems.map((item, index) => (
                  <CarouselItem key={index}>
                    {item.type === "image" ? (
                      <div className="relative w-full overflow-hidden rounded-xl shadow-md">
                        <Image
                          src={item.src}
                          alt={`${project.title} screenshot`}
                          width={1200}
                          height={675}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                        <iframe
                          src={toEmbedUrl(item.src)}
                          title={`${project.title} demo video`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              {mediaItems.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>
        )}

        {/* Content: description left, meta right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Long description */}
          <div className="lg:col-span-8">
            {project.longDescription && (
              <ReactMarkdown
                className="prose prose-sm md:prose-base max-w-none text-dark"
                remarkPlugins={[remarkGfm]}
              >
                {project.longDescription}
              </ReactMarkdown>
            )}
          </div>

          {/* Sidebar: techs + links */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Technologies */}
              {project.technologies.length > 0 && (
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                    Technologies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <TechChip key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Links
                </h2>
                <div className="flex flex-col gap-3">
                  <Link
                    target="_blank"
                    href={project.links.visit}
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg bg-dark text-light hover:bg-lightBlue transition-colors duration-200 w-full justify-center"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Project
                  </Link>
                  {project.links.github && (
                    <Link
                      target="_blank"
                      href={project.links.github}
                      className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-dark text-dark hover:bg-dark hover:text-light transition-colors duration-200 w-full justify-center"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
