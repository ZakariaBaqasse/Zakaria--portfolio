import { SocialLinkLocation } from "@/lib/utils/types";
import ParticlesBackground from "../../particlests/particles-background";
import Links from "../../shared/social-links";
import { Merriweather } from "next/font/google";
import classes from "./hero-section.module.css";

const Intro = () => {
  return (
    <div className={`${classes["intro-heading"]}`}>
      <h1 className="inline-block mr-2">Hello,</h1>
      <h1 className="inline-block mr-2">I&#39;m</h1>
      <h1 className="inline-block mr-2">Zakaria</h1>
      <h1 className="inline-block mr-2">|</h1>
      <br />
      <h1 className="inline-block">Software Engineer</h1>
    </div>
  );
};

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const Hero = () => {
  return (
    <section id="hero-section" className="bg-secondary w-full section-sizing">
      <ParticlesBackground />
      <Intro />
      <Links location={SocialLinkLocation.INTRO} />
      <p
        className={`text-gray-300 text-justify ${classes["intro-paragraph"]} ${merriweather.className} font-light text-base pt-10 px-10 md:pl-20 pb-20 md:pb-28`}
      >
        I love challenging myself 💪, I embrace a growth mindset and actively
        seek new knowledge 👨‍🎓. And yeah I like anime 😻
      </p>
    </section>
  );
};

export default Hero;
