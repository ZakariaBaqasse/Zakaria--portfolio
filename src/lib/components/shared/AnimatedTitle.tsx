import { cn } from "@/lib/utils";
import React from "react";

const AnimatedTitle = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "text-2xl md:text-4xl lg:text-6xl font-bold leading-tight text-dark",
        className
      )}
    >
      {text}
    </h1>
  );
};

export default AnimatedTitle;
