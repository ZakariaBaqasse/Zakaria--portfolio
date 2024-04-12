"use server";

import { Project } from "../db/models/project.model";
import { PROJECTS_PER_PAGE } from "../utils/const";

export const getProjects = async (skip: number) => {
  try {
    return await Project.find({}).skip(skip).limit(PROJECTS_PER_PAGE);
  } catch (error: any) {
    console.log(error.message);
    throw new Error("error in getProjects: ", error.message);
  }
};
