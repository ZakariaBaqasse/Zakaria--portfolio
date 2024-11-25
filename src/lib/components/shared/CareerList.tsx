"use client";

import { Career } from "@/lib/utils/types";
import { motion, useScroll } from "framer-motion";
import CareerCard from "./CareerCard";
import { useRef } from "react";

export default function CareerList({
  careers,
  type,
}: {
  careers: Career[];
  type: "academic" | "professional";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="lg:w-[75%] w-full mx-auto relative">
      <motion.div
        ref={ref}
        className="absolute left-4 md:left-9 top-0 w-[4px] h-full bg-dark origin-top"
        style={{ scaleY: scrollYProgress }}
      />
      <ul className="w-full flex flex-col items-start justify-between md:ml-4 xs:ml-2">
        {careers.map((career) => (
          <CareerCard key={career.id} career={career} type={type} />
        ))}
      </ul>
    </div>
  );
}
