import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import HomePageLayout from "@/lib/components/layout/home-page-layout";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-mont",
});

export const metadata: Metadata = {
  title: "Zakaria BAQASSE | Portfolio",
  description:
    "Highlighting expertise in AI engineering, intelligent agents, and full-stack development, this portfolio showcases innovative projects like Profundo, combining AI efficiency with reliable research, and demonstrates skills in building AI-driven solutions, LLM integration, and creating intelligent systems that solve complex problems.",
  keywords: [
    "AI engineering",
    "intelligent agents",
    "full-stack development",
    "AI-driven solutions",
    "LLM integration",
    "AI systems",
    "machine learning",
    "natural language processing",
    "web research platforms",
    "Profundo project",
    "AI applications",
    "portfolio projects",
    "developer portfolio",
    "AI expertise",
    "software engineering",
    "technical problem-solving",
    "innovative AI solutions",
    "AI research tools",
    "AI-powered platforms",
  ],
  openGraph: {
    title: "Zakaria BAQASSE | Portfolio",
    description:
      "Highlighting expertise in AI engineering, intelligent agents, and full-stack development, this portfolio showcases innovative projects like Profundo, combining AI efficiency with reliable research, and demonstrates skills in building AI-driven solutions, LLM integration, and creating intelligent systems that solve complex problems.",
    siteName: "Zakaria BAQASSE Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakaria BAQASSE | Portfolio",
    description:
      "Highlighting expertise in AI engineering, intelligent agents, and full-stack development, this portfolio showcases innovative projects like Profundo, combining AI efficiency with reliable research, and demonstrates skills in building AI-driven solutions, LLM integration, and creating intelligent systems that solve complex problems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} font-mont`}>
      <body className="bg-light w-full min-h-screen">
        <HomePageLayout>{children}</HomePageLayout>
        <div id="portal"></div>
      </body>
    </html>
  );
}
