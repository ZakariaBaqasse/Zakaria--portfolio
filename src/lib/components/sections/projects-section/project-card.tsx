"use client";

import { useReducer } from "react";
import { IProject } from "@/lib/db/models/project.model";
import { TechStackChip } from "../../shared/chip";
import Image from "next/image";
import Modal from "../../shared/modal";
import classes from "./project.module.css";

enum ActionType {
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

const reducer = (state: { isOpen: boolean }, action: { type: ActionType }) => {
  switch (action.type) {
    case ActionType.OPEN:
      return { isOpen: true };
    case ActionType.CLOSE:
      return { isOpen: false };
    default:
      return state;
  }
};

export const ProjectCard = ({ project }: { project: IProject }) => {
  const [state, dispatch] = useReducer(reducer, { isOpen: false });
  const renderTechStack = () => {
    const techArray = project.project_techstack;
    if (techArray.length > 3) {
      return techArray.slice(0, 3).map((tech, index) => {
        return <TechStackChip key={`${tech}_${index}`} tech={tech} />;
      });
    }
    return techArray.map((tech, index) => {
      return <TechStackChip key={`${tech}_${index}`} tech={tech} />;
    });
  };
  return (
    <>
      <div className={classes["product-card"]}>
        <div className={classes["card-thumbnail"]}>
          <Image
            className="img-responsive"
            src={project.project_thumbnail}
            alt={project.project_title}
            width={700}
            height={500}
          />
        </div>
        <div className={classes["card-content"]}>
          <h1 className={classes["card-title"]}>{project.project_title}</h1>
          <h2 className={`${classes["card-sub-title"]} pb-5`}>
            {project.project_scope}
          </h2>
          <div className="flex justify-start flex-wrap">
            {renderTechStack()}
          </div>
        </div>
        <div className="m-auto w-fit absolute bottom-9 left-1/2 -translate-x-1/2">
          <button
            className="bg-primary text-white font-headings text-lg px-3 py-2 m-auto rounded-full"
            onClick={() => dispatch({ type: ActionType.OPEN })}
          >
            More Details
          </button>
        </div>
      </div>
      <Modal
        project={project}
        isOpen={state.isOpen}
        onClose={() => dispatch({ type: ActionType.CLOSE })}
      />
    </>
  );
};
