import {
  GITHUB_LINK,
  LINKEDIN_LINK,
  TWITTER_LINK,
  MAIL_ADDRESS,
} from "@/lib/utils/const";
import { SocialLinkLocation } from "@/lib/utils/types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./social-links.module.css";

const Links = ({ location }: { location: SocialLinkLocation }) => {
  library.add(fab);
  return (
    <div
      className={`${
        location == SocialLinkLocation.INTRO
          ? "my-5 md:my-3 ml-12 md:ml-28"
          : ""
      }`}
    >
      <a
        href={GITHUB_LINK}
        target="_blank"
        className={`${classes["social-icons"]}`}
      >
        <FontAwesomeIcon icon={["fab", "github"]} />
      </a>
      <a
        href={LINKEDIN_LINK}
        target="_blank"
        className={`${classes["social-icons"]}`}
      >
        <FontAwesomeIcon icon={["fab", "linkedin"]} />
      </a>
      <a
        href={TWITTER_LINK}
        target="_blank"
        className={`${classes["social-icons"]}`}
      >
        <FontAwesomeIcon icon={["fab", "twitter"]} />
      </a>
      <a
        href={`mailto:${MAIL_ADDRESS}`}
        className={`${classes["social-icons"]}`}
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
    </div>
  );
};

export default Links;
