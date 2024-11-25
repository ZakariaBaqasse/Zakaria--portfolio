import { useScroll, motion } from "framer-motion";

const ListIcon = ({
  reference,
}: {
  reference: React.RefObject<HTMLLIElement>;
}) => {
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
    target: reference,
    offset: ["center end", "center center"],
  });
  return (
    <figure className="absolute md:left-0 -left-5 stroke-dark">
      <svg width="75" height="75" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="20"
          className="stroke-lightBlue stroke-1 fill-none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="20"
          className="stroke-[5px] fill-light"
          style={{
            pathLength: scrollYProgress,
          }}
        />
        <circle cx="50" cy="50" r="10" className="stroke-1 fill-lightBlue" />
      </svg>
    </figure>
  );
};

export default ListIcon;
