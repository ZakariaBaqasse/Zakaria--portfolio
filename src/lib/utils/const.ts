import { Career } from "./types";

export const GITHUB_LINK = "https://github.com/ZakariaBaqasse";
export const LINKEDIN_LINK = "https://www.linkedin.com/in/zakaria-baqasse/";
export const TWITTER_LINK = "https://twitter.com/ZakariaCoder";
export const MAIL_ADDRESS = "z.baqasse.zakaria@gmail.com";

export const PROJECTS_PER_PAGE = 3;

export const EXPERIENCES_PER_PAGE = 4;

export enum ListType {
  PROJECTS = "PROJECTS",
  EXPERIENCES = "EXPERIENCES",
}

export const MY_SKILLS: string[] = [
  "javascript",
  "typescript",
  "ecmascript",
  "python",
  "react",
  "nextjs",
  "nodejs",
  "nestjs",
  "graphQL",
  "tailwindcss",
  "postgreSQL",
  "docker",
  "serverless stack",
  "prompt engineering",
  "agentic AI",
  "langchain",
  "langgraph",
];

export const EDUCATIONS: Career[] = [
  {
    id: 1,
    start_date: "September 2021",
    end_date: "June 2024",
    title: "Software Engineering degree",
    institute: "Faculty of Sciences and Technologies of Marrakesh",
    description:
      "I obtained a software engineering degree at the Faculty of Sciences and Techniques of Marrakesh - focused on designing, developing, and optimizing software systems, with a strong foundation in programming, algorithms, and software development methodologies.",
  },
  {
    id: 2,
    start_date: "September 2019",
    end_date: "June 2021",
    title: "DEUST degree",
    institute: "Faculty of Sciences and Techniques of Marrakesh",
    description:
      "I obtained a DEUST (Diploma of University Studies in Science and Technology) degree in mathematics,IT, physics and chemistry - a two-year undergraduate degree focused on foundational knowledge and practical skills in scientific and technical disciplines, at the Faculty of Sciences and Techniques of Marrakesh. ",
  },
  {
    id: 3,
    start_date: "September 2018",
    end_date: "June 2019",
    title: "Baccalaureate in Physical Sciences",
    institute: "Salah Eddine Al Ayoubi High School",
    description:
      "I obtained a baccalaureate degree in physical sciences at Salah Eddine Al Ayoubi High School.",
  },
];
