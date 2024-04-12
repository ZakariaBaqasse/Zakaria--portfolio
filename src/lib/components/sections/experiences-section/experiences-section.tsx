import React from "react";
import StyledTitle from "../../shared/styled-title";
import { Experience } from "@/lib/db/models/experience.model";
import { getExperiences } from "@/lib/actions/get-experiences.action";
import ExperiencesList from "./experiences-list";

const Experiences = async () => {
  const totalExperiencesCount = await Experience.countDocuments();
  const initialExperiences = await getExperiences(0);
  return (
    <section id="Experiences" className="text-secondary section-sizing">
      <StyledTitle word1="My" word2="Experiences" />
      <ExperiencesList
        initialExperiences={initialExperiences}
        totalExperiencesCount={totalExperiencesCount}
      />
    </section>
  );
};

export default Experiences;
