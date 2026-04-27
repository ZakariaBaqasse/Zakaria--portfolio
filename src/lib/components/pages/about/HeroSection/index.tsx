import AnimatedTitle from "@/lib/components/shared/AnimatedTitle";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="mb-24 px-4 md:px-0">
      <AnimatedTitle
        text="Engineering Reliable AI Systems & Scalable Backends"
        className="font-bold tracking-tighter text-center mb-12"
      />
      <div className="space-y-6 flex flex-col items-center justify-center md:gap-12 lg:gap-24 md:flex-row">
        <div className="relative mx-auto h-max w-[260px] md:w-[300px] lg:w-[360px] shrink-0">
          <div className="rounded-lg border-4 border-gray-300 shadow-lg overflow-hidden">
            <Image
              src="/images/profile.png"
              alt="Portrait"
              width={1000}
              height={1332}
              className="object-cover w-full"
              sizes="(min-width: 1024px) 360px, (min-width: 768px) 300px, 260px"
              priority
            />
          </div>
        </div>
        <div className="space-y-4 text-justify">
          <h2 className="text-2xl font-bold text-dark">About Me</h2>
          <p>
            Hi, I’m <strong>Zakaria BAQASSE</strong>. I specialize in bridging
            the gap between advanced artificial intelligence and reliable
            backend infrastructure. Instead of just writing prompts, I architect
            multi-agent systems and enterprise-grade RAG pipelines that automate
            complex workflows and drive real business value.
          </p>
          <p>
            My background in full-stack development means I don&apos;t build AI
            models in a vacuum; I integrate them into scalable, secure, and
            observable applications using Python, FastAPI, and LangGraph.
            Whether it&apos;s optimizing system latency or orchestrating
            autonomous agents, my focus is always on building resilient tools
            that perform in production. Let&apos;s connect if you&apos;re
            looking to turn experimental AI into a deployed reality.
          </p>
        </div>
      </div>
    </section>
  );
}
