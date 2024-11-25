"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { animate, motion } from "framer-motion";

const AnimatedTitle = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  return (
    <motion.h1
      className={cn(
        "text-2xl md:text-4xl lg:text-6xl font-bold leading-tight text-dark",
        className
      )}
      variants={variants}
      initial="initial"
      animate="animate"
    >
      {text}
    </motion.h1>
  );
};

export default AnimatedTitle;
