import { IProject } from "../db/models/project.model";

export type Carrer = {
  start_date: string;
  end_date: string;
  title: string;
  institute: string;
  description: string;
  technologies?: string[];
};

export enum CarrerType {
  ACADEMIC = "ACADEMIC",
  PROFESSIONAL = "PROFESSIONAL",
}

export type CarrerCardProps = {
  carrer: Carrer;
};

export type NavigateButtonProps = {
  label: string;
  linkTo: string;
};

export type ModalProps = {
  project: IProject;
  isOpen: boolean;
  onClose: () => void;
};

export type StyledTitleProps = {
  word1: string;
  word2: string;
  textColor?: string;
};

export enum SocialLinkLocation {
  INTRO = "intro",
  FOOTER = "footer",
}
