"use client";

import { getExperiences } from "@/lib/actions/get-experiences.action";
import { IExperience } from "@/lib/db/models/experience.model";
import { EXPERIENCES_PER_PAGE } from "@/lib/utils/const";
import { useCallback, useState } from "react";
import Timeline from "../../shared/timeline";
import { CarrerType } from "@/lib/utils/types";
import ShowMoreButton from "../../shared/show-more.button";

const ExperiencesList = ({
  initialExperiences,
  totalExperiencesCount,
}: {
  initialExperiences: IExperience[];
  totalExperiencesCount: number;
}) => {
  const [allExperiences, setAllExperiences] =
    useState<IExperience[]>(initialExperiences);
  const [skip, setSkip] = useState<number>(EXPERIENCES_PER_PAGE);
  const [loading, setLoading] = useState<boolean>(false);
  const loadExperiences = useCallback(async () => {
    setLoading(true);
    const newExperiences = await getExperiences(skip);
    setLoading(false);
    setAllExperiences([...allExperiences, ...newExperiences]);
    setSkip(skip + EXPERIENCES_PER_PAGE);
  }, [skip, allExperiences]);
  return (
    <div className=" mx-28">
      <Timeline carrers={allExperiences} carrerType={CarrerType.PROFESSIONAL} />
      {totalExperiencesCount > EXPERIENCES_PER_PAGE &&
        skip < totalExperiencesCount && (
          <ShowMoreButton onClick={loadExperiences} />
        )}
    </div>
  );
};

export default ExperiencesList;
