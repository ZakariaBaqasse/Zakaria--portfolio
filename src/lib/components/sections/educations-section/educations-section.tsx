import { EDUCATIONS } from "@/lib/utils/const";
import StyledTitle from "../../shared/styled-title";
import Timeline from "../../shared/timeline";
import { CarrerType } from "@/lib/utils/types";

const Education = () => {
  return (
    <section id="Education" className="text-secondary section-sizing">
      <StyledTitle word1="My" word2="Education" />
      <div className="w-4/5 mx-auto mb-12">
        <Timeline carrers={EDUCATIONS} carrerType={CarrerType.ACADEMIC} />
      </div>
    </section>
  );
};

export default Education;
