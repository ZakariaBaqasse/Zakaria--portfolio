import { SocialLinkLocation } from "@/lib/utils/types";
import Links from "../shared/social-links";

const Footer = () => {
  return (
    <footer className="bg-secondary min-h-screen-1/3 md:grid md:grid-cols-3 gap-5 p-11 md:px-3 lg:p-0">
      <div className="col-span-1 m-auto md:m-auto w-fit mb-6">
        <h1 className="text-center text-2xl font-semibold text-white font-headings ">
          Zakaria BAQASSE
        </h1>
        <p className="text-gray-100 font-paragraphs font-thin mt-3 text-xs opacity-70">
          &copy; 2023, Made and designed by Zakaria BAQASSE
        </p>
      </div>
      <div className="col-span-1 text-gray-200 font-paragraphs font-light md:m-auto text-base opacity-70 mb-6">
        <p className="footer-paragraph text-center">
          Designed and built with passion by yours truly. Built with{" "}
          <span>Nextjs</span> and <span>TailwindCSS</span> on{" "}
          <span>Visual Studio Code</span>
        </p>
      </div>
      <div className="col-span-1 m-auto w-fit">
        <h1 className="text-white font-headings text-xl mb-3 text-center md:text-left">
          Get in touch:
        </h1>
        <Links location={SocialLinkLocation.FOOTER} />
      </div>
    </footer>
  );
};

export default Footer;
