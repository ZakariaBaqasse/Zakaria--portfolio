import AnimatedTitle from "@/lib/components/shared/AnimatedTitle";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="mb-24 px-4 md:px-0">
      <AnimatedTitle
        text="Driven by Curiosity, Powered by Innovation!"
        className="font-bold tracking-tighter text-center mb-12"
      />
      <div className="space-y-6 flex flex-col items-center justify-center md:gap-12 lg:gap-24 md:flex-row">
        <div className="relative mx-auto h-max">
          <div className="rounded-lg border-4 border-gray-300 shadow-lg overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt="Portrait"
              width={1000}
              height={1332}
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-4 text-justify">
          <h2 className="text-2xl font-bold text-dark">About Me</h2>
          <p>
            Hi, I&apos;m <strong>Zakaria BAQASSE</strong>, a software and AI
            engineer with a knack for turning complex ideas into elegant,
            functional solutions. My work sits at the intersection of full-stack
            development and artificial intelligence, where I build systems that
            don&apos;t just solve problems—they think ahead.
          </p>
          <p>
            From creating dynamic web applications to designing AI agents that
            simplify workflows, I thrive on tackling challenges that push me to
            innovate. My approach is rooted in curiosity and a love for
            experimentation, always aiming to combine technical precision with
            meaningful impact.
          </p>
          <p>
            Outside of work, I’m usually exploring emerging technologies,
            sketching out SaaS ideas, or diving deep into niche areas like
            AI-driven automation. If you’re into crafting the future with code
            and intelligence, let’s build something incredible together.
          </p>
        </div>
      </div>
    </section>
  );
}
