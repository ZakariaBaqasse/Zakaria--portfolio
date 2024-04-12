import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zakaria BAQASSE | Portfolio",
  description:
    "Discover the portfolio of Zakaria BAQASSE, a web developer specializing in Node.js for backend development and React + Angular for frontend design. Explore Zakaria's projects, skills, and expertise in prompt engineering. Connect for collaborations and innovative solutions.",
  keywords: [
    "Web Development",
    "Node.js",
    "React",
    "Angular",
    "Frontend Development",
    "Backend Development",
    "Prompt Engineering",
    "Full Stack Development",
    "JavaScript",
    "HTML",
    "CSS",
    "Portfolio",
    "Projects",
    "Skills",
    "Collaborations",
    "Innovative Solutions",
    "Web Developer",
    "Software Engineer",
    "UI/UX Design",
    "Responsive Design",
    "Digital Portfolio",
    "Interactive Websites",
    "Creative Solutions",
    "Code Quality",
    "Performance Optimization",
    "API Development",
    "Database Management",
    "Professional Experience",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="portal"></div>
      </body>
    </html>
  );
}
