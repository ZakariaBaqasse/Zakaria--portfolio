"use server";

import { Experience } from "../db/models/experience.model";
import { EXPERIENCES_PER_PAGE } from "../utils/const";

export const getExperiences = async (skip: number) => {
  try {
    return await Experience.find({})
      .skip(skip)
      .limit(EXPERIENCES_PER_PAGE)
      .sort({ created_at: -1 });
  } catch (error: any) {
    console.log(error.message);
    throw new Error("error in getProjects: ", error.message);
  }
};
