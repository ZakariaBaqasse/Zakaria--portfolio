"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Project } from "@/lib/utils/types";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TechChip from "./TechChip";

export default function ProjectModal({ project }: { project: Project }) {
  const hasMedia = project.image || project.demoVideo;
  const mediaItems = [
    ...(project.image ? [{ type: "image" as const, src: project.image }] : []),
    ...(project.demoVideo
      ? [{ type: "video" as const, src: project.demoVideo }]
      : []),
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-dark text-light text-base w-36 h-12">
          Learn More
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px] max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="text-dark">{project.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-1 md:gap-4 md:py-4 py-2">
          {hasMedia && (
            <div className="px-10">
              <Carousel className="w-full">
                <CarouselContent>
                  {mediaItems.map((item, index) => (
                    <CarouselItem key={index}>
                      {item.type === "image" ? (
                        <Image
                          src={item.src}
                          alt={`${project.title} thumbnail`}
                          width={600}
                          height={338}
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      ) : (
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={item.src}
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
          <ReactMarkdown
            className="text-dark text-sm md:text-base prose prose-sm md:prose-base max-w-none"
            remarkPlugins={[remarkGfm]}
          >
            {project.longDescription}
          </ReactMarkdown>
          <div className="md:flex flex-wrap gap-2 hidden">
            {project.technologies.map((tech, index) => (
              <TechChip key={tech} tech={tech} />
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            target="_blank"
            href={project.links.visit}
            className="inline-flex items-center gap-2 text-sm font-medium md:px-4 px-2 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800"
          >
            <Globe className="w-4 h-4" />
            Visit Project
          </Link>
          {project.links.github && (
            <Link
              target="_blank"
              href={project.links.github}
              className="inline-flex items-center gap-2 text-sm font-medium md:px-4 px-2 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
            >
              <Github className="w-4 h-4" />
              View Source
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

