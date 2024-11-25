import { drizzle } from "drizzle-orm/neon-http";
import { experiencesTable, projectsTable } from "./schema";
const db = drizzle(process.env.DATABASE_URL!);
export default db;
async function main() {
  await db.delete(experiencesTable);
  const experiences: (typeof experiencesTable.$inferInsert)[] = [
    {
      start_date: "15 June 2023",
      end_date: "31 August 2023",
      title: "Software engineer intern",
      institute: "Thinkable",
      description:
        "I contributed to the development of PetPortal, a generative AI web app that helps pet owners understand and care for their pets using advanced prompt engineering. Focused on ensuring reliability by designing and implementing unit tests with Jest.",
      institute_link: "https://thinkable.co",
      location: "Remote",
    },
    {
      start_date: "15 October 2023",
      end_date: "30 June 2024",
      title: "Software and AI engineer intern",
      institute: "Thinkable",
      description:
        "I led the development of Profundo v1 and took charge of v2, refining the platform’s capabilities for automated web research and business analysis. Acted as a key point of consultation for both new interns and senior team members joining the project, ensuring smooth onboarding and technical guidance.",
      institute_link: "https://thinkable.co",
      location: "Remote",
    },
    {
      start_date: "01 July 2024",
      end_date: "Present",
      title: "Software and AI engineer",
      institute: "Thinkable",
      description:
        "In my current role, I contribute to the development of Thinkable AI, an Agentic AI platform and enhance existing products like Profundo. Played a pivotal role in drafting the specification document and shaping the product’s roadmap to align with business needs and future scalability.",
      institute_link: "https://thinkable.co",
      location: "Remote",
    },
  ];
  for (const experience of experiences) {
    await db.insert(experiencesTable).values(experience);
    console.log("New experience created!", experience.title);
  }
}

// main();

async function main2() {
  await db.delete(projectsTable);
  const projects: (typeof projectsTable.$inferInsert)[] = [
    {
      title: "Portfolio website",
      shortDescription:
        "A modern and dynamic portfolio website showcasing my skills and projects, built with Next.js, Tailwind CSS, shadcn-ui, PostgreSQL, and enhanced with Framer Motion for smooth animations",
      longDescription: `
This portfolio website is a reflection of my skills and expertise, designed to provide an engaging and seamless user experience. Built with:

- **Next.js**: Ensuring a fast, responsive, and SEO-friendly platform
- **Tailwind CSS**: For highly customizable and clean design components
- **shadcn-ui**: Adding structured and reusable UI elements
- **PostgreSQL**: Managing project data efficiently
- **Framer Motion**: Bringing the site to life with smooth and interactive animations

The project emphasizes clean design, interactivity, and scalability, serving as a central hub to showcase my work and capabilities.`,
      links: {
        visit: "https://www.zakariabaqasse.info",
        github: "https://github.com/ZakariaBaqasse/Zakaria--portfolio.git",
      },
      technologies: [
        "Next.js",
        "Tailwind CSS",
        "shadcn-ui",
        "PostgreSQL",
        "Framer Motion",
      ],
      image: "https://i.ibb.co/HBGdLmB/Zakaria-BAQASSE-Portfolio.png",
    },
    {
      title: "Profundo",
      shortDescription:
        "Profundo redefines web research by merging AI-driven efficiency with reliable, up-to-date web-sourced information. It eliminates the hassle of manual searches while addressing AI limitations, offering users accurate, well-sourced insights for smarter decision-making",
      longDescription: `
At Thinkable, I contributed significantly to Profundo, a platform that enhances web research by combining AI efficiency with reliable, up-to-date information to generate in depth research reports and analysis.

**My Contributions**  
As part of the Profundo team, I made significant contributions, including:  

- Developed a robust citation system to ensure source accuracy and reliability.  
- Implemented a summary feature to gather, condense, and organize web data into research plans.  
- Resolved user-reported bugs to improve functionality and user experience.  
- Mentored new team members, providing onboarding support and answering technical queries.  

This project strengthened my skills in backend development and cloud services, particularly AWS Lambda and SST.`,
      links: {
        visit: "https://profundo.app",
      },
      technologies: [
        "AWS Lambda (SST)",
        "Next.js",
        "PostgreSQL",
        "Redis",
        "LangChain",
        "Tailwind",
        "SQS",
      ],
      image: "https://i.ibb.co/JsKTRFr/profundo.png",
    },
  ];
  for (const project of projects) {
    await db.insert(projectsTable).values(project);
    console.log("New project created!", project.title);
  }
}

// main2();
