"use client";
import SkillCard from "./SkillCard";
import {
  ServerIcon,
  BrainIcon,
  Laptop,
  Container,
  Database,
  CloudCogIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export const SKILLS = {
  "AI & LLM Engineering": {
    skills: [
      "Agentic Systems",
      "LangGraph & LangChain",
      "RAG Pipelines",
      "Vector Databases",
      "Prompt Engineering",
    ],
    icon: <BrainIcon className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  "Backend & APIs": {
    skills: [
      "Python (Expert)",
      "FastAPI & Pydantic",
      "Celery & Redis",
      "RESTful APIs",
      "SQLAlchemy",
    ],
    icon: <ServerIcon className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  "Cloud & DevOps": {
    skills: [
      "AWS (ECS, Lambda, S3, ALB)",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Pulumi / Infrastructure as Code",
    ],
    icon: <CloudCogIcon className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  "Databases & Quality": {
    skills: [
      "PostgreSQL & pgvector",
      "Test-Driven Development (TDD)",
      "pytest & Unit Testing",
      "Observability (Langfuse, Sentry)",
    ],
    icon: <Database className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  "Frontend & Tooling": {
    skills: ["TypeScript", "React", "NextJS", "Tailwind CSS"],
    icon: <Laptop className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
};

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2 },
  }),
};

export default function SkillsSection() {
  return (
    <section className="mt-48 lg:mt-64">
      <h2 className="text-5xl font-bold text-center mb-12">Skills</h2>
      <div className="relative w-full min-h-screen flex items-stretch justify-start gap-4 flex-wrap rounded-full">
        {/* Skills */}
        {Object.entries(SKILLS).map(([key, skill], index) => (
          <motion.div
            key={index}
            custom={index}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex-grow flex-shrink-0 basis-1/4 flex items-stretch mb-12"
            variants={fadeInAnimationVariants}
          >
            <SkillCard category={key} skills={skill.skills}>
              {skill.icon}
            </SkillCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
