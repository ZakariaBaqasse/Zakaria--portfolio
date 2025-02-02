export type Career = {
  id: number;
  start_date: string;
  end_date: string;
  title: string;
  institute: string;
  description: string;
  institute_link?: string;
  location?: string;
};

export type CareerCardProps = {
  career: Career;
  type: "academic" | "professional";
};

export type NavigateButtonProps = {
  label: string;
  linkTo: string;
};

export type Project = {
  title: string;
  shortDescription: string;
  longDescription: string | null;
  image: string | null;
  links: ProjectLinks;
  technologies: string[];
  comingSoon: boolean | null;
};

export type ProjectLinks = {
  visit: string;
  github?: string;
};
