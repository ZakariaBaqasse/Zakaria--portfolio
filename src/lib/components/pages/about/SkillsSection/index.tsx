"use client";
import SkillCard from "./SkillCard";
import {
  ServerIcon,
  BrainIcon,
  Laptop,
  Container,
  Database,
} from "lucide-react";
import { motion } from "framer-motion";

export const SKILLS = {
  FRONTEND: {
    skills: [
      "HTML/CSS",
      "javascript",
      "typescript",
      "ecmascript",
      "react",
      "nextjs",
    ],
    icon: <Laptop className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  BACKEND: {
    skills: ["nodejs", "nestjs", "graphQL", "serverless stack", "python"],
    icon: <ServerIcon className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  AI: {
    skills: [
      "prompt engineering",
      "agentic AI",
      "langchain",
      "langgraph",
      "python",
    ],
    icon: <BrainIcon className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  DATABASE: {
    skills: ["postgresql", "redis"],
    icon: <Database className="lg:w-10 lg:h-10 w-8 h-8" />,
  },
  DEVOPS: {
    skills: ["docker"],
    icon: <Container className="lg:w-10 lg:h-10 w-8 h-8" />,
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
