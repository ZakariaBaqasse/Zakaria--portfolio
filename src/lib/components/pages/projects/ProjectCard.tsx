"use client";

import { Project } from "@/lib/utils/types";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProjectModal from "./ProjectModal";
import TechChip from "./TechChip";
import { Badge } from "@/components/ui/badge";

export default function ProjectCard({
  project,
  className,
  isFeatured = false,
}: {
  project: Project;
  className?: string;
  isFeatured?: boolean;
}) {
  return (
    <Card
      className={`relative flex w-full items-center  justify-between overflow-hidden rounded-xl bg-light shadow flex-col lg:p-8 xs:p-4   ${className} ${
        isFeatured ? "col-span-12 lg:flex-row" : "col-span-12 md:col-span-6"
      }`}
    >
      <CardHeader
        className={`relative cursor-pointer overflow-hidden rounded-t-lg lg:rounded-lg w-full p-0`}
      >
        <Image
          src={project.image || "/images/coming-soon-placeholder.avif"}
          alt={project.title}
          width={800}
          height={400}
          className="w-full h-auto hover:scale-110 transition-all duration-300"
        />
      </CardHeader>
      <CardContent className={`p-4 `}>
        <h3 className="text-2xl font-bold mb-2 flex justify-start items-center gap-4">
          {project.title}{" "}
          {project.comingSoon && (
            <Badge
              className="text-lightBlue border-lightBlue"
              variant={"outline"}
            >
              Coming soon
            </Badge>
          )}{" "}
        </h3>
        <p className="text-gray-600 mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>
        {!project.comingSoon && <ProjectModal project={project} />}
      </CardContent>
    </Card>
  );
}
