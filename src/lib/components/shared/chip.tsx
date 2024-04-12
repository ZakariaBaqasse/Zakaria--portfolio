import classes from "./chip.module.css";

export const TechStackChip = ({ tech }: { tech: string }) => {
  return <div className={classes["tech-chip"]}>{tech}</div>;
};
