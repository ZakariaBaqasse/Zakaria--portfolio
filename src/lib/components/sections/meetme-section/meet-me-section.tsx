import Image from "next/image";
import { MY_SKILLS } from "@/lib/utils/const";
import StyledTitle from "../../shared/styled-title";
import { Roboto, Merriweather } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const MeetMe = () => {
  return (
    <section id="MeetMe" className="w-full section-sizing ">
      <StyledTitle word1="Meet" word2="Me" />
      <div className="md:grid md:grid-cols-3 md:gap-14 relative z-10 mx-3 lg:mx-32">
        <div className="flex items-center col-span-1 rounded-md overflow-hidden shadow-lg w-fit m-auto mb-7 md:m-0 h-fit">
          <Image
            src="/images/profile.jpg"
            alt="Zakaria BAQASSE photo"
            width={350}
            height={500}
          />
        </div>
        <div className="col-span-2 text-justify text-lg w-full lg:w-3/4">
          <ul className="flex flex-wrap md:justify-start justify-center">
            {MY_SKILLS.map((skill, index) => {
              return (
                <li
                  key={index}
                  className="bg-secondary text-gray-100 capitalize p-2 mr-2 mb-2"
                >
                  {skill}
                </li>
              );
            })}
          </ul>
          <div className=" md:mt-16 mt-8 mx-8 mb-8 md:mx-0">
            <h4 className={`text-xl font-semibold ${roboto.className}`}>
              I find joy in crafting and building projects that excite me 👨‍💻
            </h4>
            <p
              className={`mt-8 text-base md:text-lg ${merriweather.className}`}
            >
              As a software engineer, I immerse myself in the world of software
              development, constantly honing my skills and embarking on new
              projects. My passion for learning allows me to adapt quickly and
              tackle fresh challenges with enthusiasm. Embracing teamwork, I
              eagerly support my colleagues and embrace collaborative
              problem-solving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetMe;
