import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { TechStackChip } from "./chip";
import { ModalProps } from "@/lib/utils/types";
import Image from "next/image";

const Modal = ({ project, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className=" w-11/12 md:w-3/4 h-5/6 bg-white rounded-md z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll">
        <div className="flex justify-between mx-4 my-3 md:my-5">
          <a
            href={
              project.project_url.startsWith("http")
                ? project.project_url
                : `https://${project.project_url}`
            }
            target="_blank"
          >
            <button className="rounded-md bg-white hover:bg-primary hover:text-white transition-all ease-out duration-300 px-2 py-1">
              Try it
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                className="ml-2 text-xl text-gray-500 hover:text-white"
              />
            </button>
          </a>
          <FontAwesomeIcon
            icon={faXmark}
            className="text-2xl text-secondary cursor-pointer"
            onClick={onClose}
          />
        </div>
        <h1 className=" font-headings font-semibold text-3xl text-center">
          {project.project_title}
        </h1>
        <h2 className="font-headings text-xl font-medium text-primary text-center my-3">
          {project.project_scope}
        </h2>
        <div className="lg:grid lg:grid-cols-3 mx-6 lg:gap-5">
          <div className="lg:col-span-2 flex flex-col items-center">
            <p className=" p-3 font-paragraphs text-sm md:text-base text-secondary inset-3 bg-gray-100 text-justify rounded-md">
              {project.project_description}
            </p>
            <Image
              className="rounded-md my-3 h-2/3"
              src={project.project_thumbnail}
              alt={project.project_title}
              width={700}
              height={500}
            />
          </div>
          <div className=" col-span-1 ">
            <h3 className="font-headings text-xl font-medium text-secondary text-center my-3">
              Tech Stack: ⚙
            </h3>
            <div className="flex flex-wrap lg:justify-start justify-evenly">
              {project.project_techstack.map((tech, index) => {
                return <TechStackChip key={`${tech}_${index}`} tech={tech} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default Modal;
